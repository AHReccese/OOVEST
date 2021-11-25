/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import moment from "moment";
import { Queue, QueueScheduler, QueueEvents } from "bullmq";

export default class ParseJobScheduler {
  constructor({ JOB_QUEUE_NAME, connection }) {
    const opts = { connection, prefix: "yumq" };
    this.queueScheduler = new QueueScheduler(JOB_QUEUE_NAME, opts);
    this.queue = new Queue(JOB_QUEUE_NAME, opts);
  }

  async recreateScheduleForAllJobs() {
    if (!Parse.applicationId) {
      throw new Error("Parse is not initialized");
    }
    await this.queueScheduler.waitUntilReady();
    await this.queue.waitUntilReady();

    const query = new Parse.Query("_JobSchedule");
    const jobSchedules = await query.find({ useMasterKey: true });
    // remove old jobs
    await this.queue.drain();
    jobSchedules.forEach(async (jobSchedule) => {
      await this.destroyJob(jobSchedule);
      try {
        await this.createJob(jobSchedule);
      } catch (error) {
        console.log("schedule job err:", error, " job", jobSchedule);
      }
    });

    console.log(`All scheduled jobs are recreated.`);
  }

  daysOfWeekToCronString(daysOfWeek) {
    const daysNumbers = [];

    for (let i = 0; i < daysOfWeek.length; i++) {
      if (daysOfWeek[i]) {
        daysNumbers.push((i + 1) % 7);
      }
    }

    return daysNumbers.join(",");
  }

  countCronTime(jobSchedule) {
    const timeOfDay = moment(jobSchedule.get("timeOfDay"), "HH:mm:ss.Z").utc();
    const daysOfWeek = jobSchedule.get("daysOfWeek");
    const cronDoW = daysOfWeek ? this.daysOfWeekToCronString(daysOfWeek) : "*";

    const repeatMinutes = jobSchedule.get("repeatMinutes");
    const minutes = repeatMinutes % 60;
    const hours = Math.floor(repeatMinutes / 60);

    let cron = "0 ";
    // Minutes
    if (minutes) {
      cron += `${timeOfDay.minutes()}-59/${minutes} `;
    } else {
      cron += `0 `;
    }

    // Hours
    cron += `${timeOfDay.hours()}-23`;
    if (hours) {
      cron += `/${hours}`;
    }
    cron += " ";

    // Day of month
    cron += "* ";

    // Month
    cron += "* ";

    // Days of week
    cron += cronDoW;

    return cron;
  }

  async createJob(jobSchedule) {
    const startDate = new Date(jobSchedule.get("startAfter"));
    const repeatMinutes = jobSchedule.get("repeatMinutes");
    const jobName = jobSchedule.get("jobName");
    const params = jobSchedule.get("params");
    const description = jobSchedule.get("description");

    const data = { jobName, params };
    // job opts:
    // attempts?: number; The total number of attempts to try the job until it completes.
    //
    // removeOnComplete?: boolean | number;
    // If true, removes the job when it successfully completes
    // A number specify the max amount of jobs to keep.
    // Default behavior is to keep the job in the completed set.

    // Launch just once
    if (!repeatMinutes) {
      const diff = startDate.getTime() - Date.now();
      // todo is need to delete after completed?
      if (diff >= 0) {
        await this.queue.add(description, data, {
          delay: diff,
          jobId: jobSchedule.id,
          removeOnComplete: true,
        });
      }
      return;
    }
    // Periodic job. Create a cron to launch the periodic job a the start date.
    await this.queue.add(description, data, this.createRepeatOpts(jobSchedule));
  }

  createRepeatOpts(jobSchedule) {
    return {
      repeat: { cron: this.countCronTime(jobSchedule) },
      jobId: jobSchedule.id,
      removeOnComplete: true,
    };
  }

  async destroyJob(jobSchedule) {
    const repeatMinutes = jobSchedule.get("repeatMinutes");
    try {
      if (!repeatMinutes) {
        // todo remove
        // await this.queue.remove(jobSchedule.id);
      } else {
        const description = jobSchedule.get("description");
        await this.queue.removeRepeatable(
          description,
          this.createRepeatOpts(jobSchedule).repeat
        );
      }
    } catch (err) {
      console.error("err: ", err);
    }
  }

  async close() {
    await this.queueScheduler.close();
    await this.queue.close();
  }
}

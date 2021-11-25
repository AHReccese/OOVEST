import { ParseJobScheduler, ParseJobWorker } from "./parse-job-scheduler";

const redisConn = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

const addJobScheduler = () => {
  const opts = { connection: redisConn, JOB_QUEUE_NAME: "parse" };
  Parse.JobScheduler = {
    scheduler: new ParseJobScheduler(opts),
    worker: new ParseJobWorker(opts),
  };
  Parse.JobScheduler.worker.run();
};
// Parse job scheduler
addJobScheduler();
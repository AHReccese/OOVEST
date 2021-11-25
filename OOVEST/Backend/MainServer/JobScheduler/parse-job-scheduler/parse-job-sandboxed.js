/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 * 
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

// sandboxed run in separate process
var os = require("os");
const Parse = require("parse/node");
const dotenv = require("dotenv");
dotenv.config();
// refactor and centralize config

Parse.initialize(process.env.PARSE_APP_ID, 
	process.env.PARSE_JAVASCRIPT_KEY, 
	process.env.PARSE_MASTER_KEY
);
Parse.serverURL = process.env.PARSE_SERVER_URL;

module.exports = function(job) {
  // const parts = [os.hostname(), process.pid];
  const { jobName, params } = job.data;
  const data = JSON.parse(params);
  Parse.Cloud.startJob(jobName, data);
};

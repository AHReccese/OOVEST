//--------------------------------------------------------------
const updater = require('../dbUpdater/Updater.js');
const sparkLineUpdater = require('../charts/sparkLine');
//--------------------------------------------------------------

Parse.Cloud.job("NewsGetter", (request) => {
    const { params, headers, log, message } = request;
    message("start getting News");
    updater.newsUpdater();
    message("News Got");
});


//--------------------------------------------------------------
//getting bids & asks queues.
var timeLimit = 10 * 1000 // 6 req/minute 
// setTimeout(
//     function run() {
//         updater.updateOrderBook()
//         updater.updateCoinData()
//         setTimeout(run, timeLimit);

//     }, 5000);
//--------------------------------------------------------------


//--------------------------------------------------------------
// newsGetter.
var newsTimeLimit = 12 * 60 * 60 * 1000 // 2 req/day 

// setTimeout(
//     function run() {
//         updater.newsUpdater()
//         setTimeout(run, newsTimeLimit);
//     }, 1000);


//--------------------------------------------------------------
// sparkLineGetter.
const sparkLineTimeLimit = 24 * 60 * 60 * 1000 //1 req/day

// setTimeout(
//     function run() {
//         sparkLineUpdater.doJobServiceUpdate()
//         setTimeout(run, sparkLineTimeLimit);
//     }, (500));
//--------------------------------------------------------------



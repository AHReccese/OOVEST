var exchangeApi = require('../API/nobitex');
var news = require('../News/news.js');

module.exports = {

    updateOrderBook: function () {

        var srcs = ["BTC", "ETH"];
        for (let i = 0; i < srcs.length; i++) {
            var promise = exchangeApi.getOrderBook(srcs[i], "IRT");

            promise.then(response => response.text())
                .then(function (responseText) {

                    const answer = JSON.parse(responseText);
                    //console.log(answer)
                    if (answer.status == "ok") {

                        pumpOrdersIntoDB(answer, srcs[i] + "IRT");

                    } else {
                        console.log("failed response from Exchanger.")
                        return;
                    }

                })
                .catch(error => console.log('error happened updateOrderBookBTCIRT)', error));

        }

    },

    updateCoinData: function () {

        var srcs = ["btc", "eth"];
        for (let i = 0; i < srcs.length; i++) {
            var promise = exchangeApi.getMarketStatus(srcs[i], "rls");

            promise.then(response => response.text())
                .then(function (responseText) {

                    const answer = JSON.parse(responseText);
                    //console.log(answer)
                    if (answer.status == "ok") {

                        pumpTableDataIntoDB(answer, srcs[i] + "-" + "rls");

                    } else {
                        console.log("failed response from Exchanger.")
                        return;
                    }

                })
                .catch(error => console.log('error happened updateTableDataBTCIRT)', error));

        }

    },
    newsUpdater, pumpSignalsIntoDB, pumpSparkLinesIntoDB
}

async function pumpOrdersIntoDB(orders, market) {

    var asks = orders.asks
    var bids = orders.bids

    const OrderBook = Parse.Object.extend("OrderBook");
    const query = new Parse.Query(OrderBook);
    query.equalTo("market", market);
    const results = await query.find();
    //console.log("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    var orderBook = results[0]
    orderBook.set("bids", bids);
    orderBook.set("asks", asks);
    await orderBook.save()

}

async function pumpTableDataIntoDB(tableData, market) {

    const CoinTable = Parse.Object.extend("CoinTable");
    const query = new Parse.Query(CoinTable);
    query.equalTo("market", market);
    const results = await query.find();
    //console.log("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    var coinTableCell = results[0]
    //console.log(market)
    var status = tableData.stats[market]
    //console.log(status)
    coinTableCell.set("bestBuy", status["bestBuy"]);
    coinTableCell.set("bestSell", status["bestSell"]);
    coinTableCell.set("dayChange", status["dayChange"]);
    await coinTableCell.save()

}

function newsUpdater() {

    var cryptoCompareAPI = "cb4faa1b91bf335c168d1463bc7d7cf92347325a1a847b07d99d2cc6d232f4fc";
    var newsPromise = news.getNews(cryptoCompareAPI);
    newsPromise.then(function (response) {
        if (response.status / 100 != 2) {
            console.log("Error happened while getting news from provider");
            return;
        }
        response.text().then(async function (news) {
            const answer = JSON.parse(news);
            //console.log(answer);

            await cleanExpiredNews();

            for (let i = 0; i < answer.Data.length; i++) {
                pumpNewsIntoDB(answer.Data[i]);
            }
        })

    }).catch(error => console.log('news getter stuck into Error', error))

}

async function pumpNewsIntoDB(singleNews) {

    const News = Parse.Object.extend("News");
    const news = new News();

    news.set("url", singleNews.url);
    news.set("imageUrl", singleNews.imageurl);
    news.set("source", singleNews.source);
    news.set("title", singleNews.title);
    news.set("body", singleNews.body);
    news.set("tags", singleNews.tags);
    news.set("categories", singleNews.categories);

    await news.save();
}

async function cleanExpiredNews() {

    const News = Parse.Object.extend("News");
    const query = new Parse.Query(News);
    const results = await query.find();
    console.log("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values

    for (let i = 0; i < results.length; i++) {
        await results[i].destroy();
    }
}

async function pumpSignalsIntoDB(coin, signals, balance) {

    const Robot = Parse.Object.extend("Robot");
    const query = new Parse.Query(Robot);
    query.equalTo("coin", coin);
    query.limit(1);
    const results = await query.find();
    console.log("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    var dbCell = results[0];

    if (!(arraysEqual(dbCell.get("signals"), signals) && balance == dbCell.get("balance"))) {
        dbCell.set("signals", signals);
        dbCell.set("balance", balance);
        await dbCell.save()
        //return true;
    }

}

async function pumpSparkLinesIntoDB(coin, category, timeStamps, prices) {

    const SparkLineChart = Parse.Object.extend("SparkLineChart");
    const query = new Parse.Query(SparkLineChart);
    query.equalTo("category", category);
    query.equalTo("coin", coin);
    query.limit(1);
    const results = await query.find();

    if (results.length != 0) {
        let dbCell = results[0];

        if (!(arraysEqual(dbCell.get("timestamps"), timeStamps) && (arraysEqual(dbCell.get("prices"), prices)))) {
            dbCell.set("timestamps", timeStamps);
            dbCell.set("prices", prices);
            await dbCell.save()
            //return true;
        }
        return
    }

    let dbCell = new SparkLineChart();

    dbCell.set("coin", coin);
    dbCell.set("category", category);
    dbCell.set("prices", prices);
    dbCell.set("timestamps", timeStamps);
    await dbCell.save()

}

function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) == JSON.stringify(a2);
}
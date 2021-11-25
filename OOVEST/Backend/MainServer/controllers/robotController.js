//--------------------------------------------------------------------------------
var botHandler = require('../robot/botHandler');
var updater = require('../dbUpdater/Updater.js');
var botManager = require('../robot/botManager');
//--------------------------------------------------------------------------------


let ticker = (req, res) => {

    console.log("ticker called.");
    var coin = req.query.coin

    if (coin == undefined) {
        res.status(400);
        res.json({
            "message": "bad Request(No coin param)."
        });
        return;
    }

    botHandler.ticker(coin, res);

}

let getBackTestDataSet = (req, res) => {

    console.log("getBackTestDataSet")
    var coin = req.query.coin;
    var from = req.query.from;
    var to = req.query.to;
    var candleSize = req.query.candlesize;

    if (coin == undefined || candleSize == undefined || from == undefined || to == undefined) {
        res.status(400);
        res.json({
            "message": "bad Request."
        })
        return;
    }

    botHandler.getExchangeBackTest({
        "coin": coin, "from": from, "to": to, "candleSize": candleSize
    }, res);

}

let getOHLC = (req, res) => {

    console.log("getOHLC")
    //console.log(req.body);
    var coin = req.query.coin;
    var candleSize = req.query.candlesize;
    //console.log(candleSize)
    //console.log(coin)

    if (coin == undefined || candleSize == undefined) {
        res.status(400);
        res.json({
            "message": "bad Request."
        })
        return;
    }

    botHandler.getExchangeOHLC(coin, candleSize, res);

}

let getLastCandleVolume = (req, res) => {

    console.log(req.body);
    var coin = req.query.coin;
    if (coin == undefined) {
        res.status(400);
        res.json({
            "message": "bad Request."
        })
        return;
    }

    botHandler.getLastCandleVolume(coin, res);

}

let sendSignals = (req, res) => {

    //console.log(req.body);
    var body = req.body;
    var count = Object.keys(body).length;
    console.log(count);

    if (count == 3) {

        var coin = body.coin;
        var balance = body.balance;
        var signals = body.signals;

        if (balance == undefined || signals == undefined || coin == undefined) {
            res.status(400);
            res.json({
                "message": "invalid inputs."
            });
            return
        }

        var promise = updater.pumpSignalsIntoDB(coin, signals, '' + balance);
        promise.then(function (resutl) {
            res.status(200);
            res.json({
                "status": true
            });
        }).catch(function (error) {
            res.status(500);
            res.json({ "status": false })
        })

    } else {
        res.status(400);
        res.json({
            "message": "message length should be 3."
        });
        return
    }

}

let backtest = (req, res) => {

    var from = req.query.from; // 'YYYY-MM-DD'
    var to = req.query.to; // 'YYYY-MM-DD'
    var coin = req.query.coin;

    if (from == undefined || to == undefined || coin == undefined) {
        res.status(400);
        res.json({
            "message": "invalid inputs."
        });
        return
    }

    botManager.serveBackTestResult(from, to, coin, res);

}


//--------------------------------------------------------------------------------
module.exports = {
    ticker, getBackTestDataSet, getOHLC,
    getLastCandleVolume, sendSignals, backtest
}
//--------------------------------------------------------------------------------


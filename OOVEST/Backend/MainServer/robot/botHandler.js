var exchangeApi = require('../API/nobitex');

module.exports = {
    ticker, getExchangeOHLC, getLastCandleVolume, getExchangeBackTest
}

function ticker(coin, res) {

    coin = coin.toLowerCase()
    // if (!(coin == 'btc' || coin == 'eth')) {
    //     res.status(400);
    //     res.json({ "message": "bad Request(only btc & eth is supported." });
    //     return;
    // }

    var market = coin + '-rls'
    var promise = exchangeApi.getMarketStatus(coin, "rls");

    promise.then(response => response.text())
        .then(function (responseText) {

            const answer = JSON.parse(responseText);
            //console.log(answer)
            if (answer.status == "ok") {
                res.status(200);
                res.json({
                    "latest": answer.stats[market]["latest"]
                })

            } else {
                res.status(500)
                res.json({
                    "message": "Exchanger failed."
                })
                console.log("Exchanger failed(robot ticker).")
                return;
            }

        })
        .catch(function (error) {
            res.status(500);
            res.json({ "message": "Exchanger isn't responding." })
            console.log('error happened robot ticker.', error)
        });

}


function getExchangeOHLC(coin, candleSize, res) {

    coin = coin.toUpperCase()
    var validSizes = ['60', '180', '360', '720', 'D', '2D', '3D'];
    if (!validSizes.includes(candleSize)) {
        res.status(400);
        res.json({ "message": "bad Request(invalid candleSize)." });
        return;
    }

    // if (!(coin == 'BTC' || coin == 'ETH')) {
    //     res.status(400);
    //     res.json({ "message": "bad Request(only BTC & ETH is supported." });
    //     return;
    // }

    // todo get 60 candles.

    var to = new Date();
    var from = new Date(to)

    if (candleSize == 'D') {
        from.setDate(to.getDate() - 60)
    } else if (candleSize == '2D') {
        console.log("yes");
        from.setDate(to.getDate() - 120)
    } else if (candleSize == '3D') {
        from.setDate(to.getDate() - 180)
    } else if (candleSize == '720') {
        from.setDate(to.getDate() - 30)
    } else if (candleSize == '360') {
        from.setDate(to.getDate() - 15)
    } else if (candleSize == '180') { // 3H
        from.setDate(to.getDate() - 8)  // todo enhance.
    } else { // 1H 
        from.setDate(to.getDate() - 3) // todo enhance.
    }

    to = Math.floor(to.getTime() / 1000)
    from = Math.floor(from.getTime() / 1000)

    /*
    There is a problem ->
    1D -> 1D
    2D -> 1D
    3D -> 1D
    ,
    720 -> 1H
    360 -> 1H
    180 -> 1H
    60  -> 1H
    */

    //console.log(coin, "IRT", candleSize, from, to);

    var promise = exchangeApi.getOHLCNobitex(
        coin,
        "IRT",
        candleSize,
        from,
        to);

    promise.then(response => response.text())
        .then(function (responseText) {

            const answer = JSON.parse(responseText);
            //console.log(answer)
            //console.log(answer.o.length)

            if (answer.s == "ok") {
                res.status(200);
                res.json({
                    "time": answer.t, // []
                    "open": answer.o, // []
                    "close": answer.c, // []
                    "high": answer.h, // []
                    "low": answer.l, // []
                    "volume": answer.v // []
                })

            } else {
                res.status(500)
                res.json({
                    "message": "Exchanger failed."
                })
                console.log("Exchanger failed(robot OHLC Getter).")
                return;
            }

        })
        .catch(function (error) {
            res.status(500);
            res.json({ "message": "Exchanger isn't responding." })
            console.log('error happened robot OHLC Getter.', error)
        });

}


function getExchangeBackTest(setting, res) {

    var coin = setting.coin.toUpperCase();
    var candleSize = setting.candleSize

    var validSizes = ['60', '180', '360', '720', 'D', '2D', '3D'];
    if (!validSizes.includes(candleSize)) {
        console.log(candleSize)
        res.status(400);
        res.json({ "message": "bad Request(invalid candleSize)." });
        return;
    }

    // if (!(coin == 'BTC' || coin == 'ETH' || coin == 'XRP')) {
    //     res.status(400);
    //     res.json({ "message": "bad Request(only BTC & ETH is supported." });
    //     return;
    // }

    var to = new Date(setting.to);
    var from = new Date(setting.from)
    from.setDate(from.getDate() - 54)

    to = Math.floor(to.getTime() / 1000)
    from = Math.floor(from.getTime() / 1000)

    //console.log(coin, "IRT", candleSize, from, to);

    var promise = exchangeApi.getOHLCNobitex(
        coin,
        "IRT",
        candleSize,
        from,
        to);

    promise.then(response => response.text())
        .then(function (responseText) {

            const answer = JSON.parse(responseText);
            //console.log(answer)
            //console.log(answer.o.length)

            if (answer.s == "ok") {
                res.status(200);
                res.json({
                    "time": answer.t, // []
                    "open": answer.o, // []
                    "close": answer.c, // []
                    "high": answer.h, // []
                    "low": answer.l, // []
                    "volume": answer.v // []
                })

            } else {
                res.status(500)
                res.json({
                    "message": "Exchanger failed."
                })
                console.log("Exchanger failed(robot BackTest Getter).")
                return;
            }

        })
        .catch(function (error) {
            res.status(500);
            res.json({ "message": "Exchanger isn't responding." })
            console.log('error happened robot BackTest Getter.', error)
        });

}

// todo enhance
function getLastCandleVolume(coin, res) {

    // if (!(coin == 'BTC' || coin == 'ETH')) {
    //     res.status(400);
    //     res.json({ "message": "bad Request(only BTC & ETH is supported." });
    //     return;
    // }

    var to = new Date();
    var from = new Date(to)
    from.setDate(to.getDate() - 1)

    to = Math.floor(to.getTime() / 1000)
    from = Math.floor(from.getTime() / 1000)

    var candleSize = 'D'
    //console.log(coin, "IRT", candleSize, from, to);

    var promise = exchangeApi.getOHLCNobitex(
        coin,
        "IRT",
        candleSize,
        from,
        to);

    promise.then(response => response.text())
        .then(function (responseText) {

            const answer = JSON.parse(responseText);
            //console.log(answer)
            //console.log(answer.o.length)

            if (answer.s == "ok") {
                //console.log(answer.t)
                res.status(200);
                res.json({
                    // "time": answer.t[], // []
                    // "open": answer.o, // []
                    // "close": answer.c, // []
                    // "high": answer.h, // []
                    // "low": answer.l, // []
                    "volume": answer.v[0] // []
                })

            } else {
                res.status(500)
                res.json({
                    "message": "Exchanger failed."
                })
                console.log("Exchanger failed(robot lastCandle Getter).")
                return;
            }

        })
        .catch(function (error) {
            res.status(500);
            res.json({ "message": "Exchanger isn't responding." })
            console.log('error happened robot lastCandle Getter.', error)
        });


}
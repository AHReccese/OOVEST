var config = require('../configs')
// In a node.js environment
//const Parse = require('parse/node');

// To use the npm modules for a browser based application
const Parse = require('parse/node');

Parse.initialize(config.keys.appId);
Parse.serverURL = config.params['mainServerUrl'];

//--------------------------------------------------------------------------

async function table() {
    let query = new Parse.Query('CoinTable');
    let subscription = await query.subscribe();
    console.log("connected")
    subscription.on('update', (object) => {

        console.log(object);
        var dayChange = object.get("dayChange");
        var bestBuy = object.get("bestBuy");
        var bestSell = object.get("bestSell");

        if (object.get("market") == "btc-rls") {
            console.log("Bitcoin coinTable updated");
            console.log("dayChange", dayChange)
            console.log("bestBuy", bestBuy)
            console.log("bestSell", bestSell)
            // todo omid -> fetch to ui components for BTC.
        } else {
            console.log("Etherium coinTable updated");
            console.log("dayChange", dayChange)
            console.log("bestBuy", bestBuy)
            console.log("bestSell", bestSell)
            // todo omid -> fetch to ui components for ETH.
        }
    });
}

console.log("connecting")
table()
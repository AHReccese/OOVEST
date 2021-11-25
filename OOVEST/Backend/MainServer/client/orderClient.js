var config = require('../configs')
// In a node.js environment
//const Parse = require('parse/node');

// To use the npm modules for a browser based application
// const Parse = require('parse');
const Parse = require('parse/node');

Parse.initialize(config.keys.appId);
Parse.serverURL = config.params['mainServerUrl'];

//--------------------------------------------------------------------------

async function orders() {
    let query = new Parse.Query('OrderBook');
    let subscription = await query.subscribe();
    console.log("connected")

    // subscription.unsubscribe();
    // console.log("disconnect");

    subscription.on('update', (object) => {

        var bids = object.get("bids");
        var asks = object.get("asks");

        if (object.get("market") == "BTCIRT") {
            console.log("Bitcoin orders updated");
            console.log("bids", bids) // [[price,amount],[price,amount],[price,amount]]
            console.log("asks", asks) // [[price,amount],[price,amount],[price,amount]]
            // update UI components -> btc.
        } else {
            console.log("Etherium orders updated");
            console.log("bids", bids)
            console.log("asks", asks)
            // update UI components -> eth.
        }
    });
}

console.log("connecting")
orders()

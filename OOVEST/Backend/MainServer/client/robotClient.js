var config = require('../configs')
// In a node.js environment
//const Parse = require('parse/node');

// To use the npm/Yarn modules for a browser based application
const Parse = require('parse/node');

Parse.initialize(config.keys.appId);
Parse.serverURL = config.params['mainServerUrl'];

//--------------------------------------------------------------------------

async function robot() {
    let query = new Parse.Query('Robot');
    let subscription = await query.subscribe();
    console.log("connected")
    subscription.on('update', (object) => {

        var signals = object.get("signals");
        var balance = object.get("balance");

        if (object.get("coin") == "ETH") {

            console.log("ETH: balance", balance);
            console.log("ETH: signals", signals);
        } else {
            console.log("BTC: balance", balance);
            console.log("BTC: signals", signals);
        }


    });
}


console.log("connecting")
robot()
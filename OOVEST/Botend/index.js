//----------------------------Requiring ThirdParty Libraries----------------------------//
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');

var net = require('net');
//--------------------------------------------------------------------------------
const dotenv = require('dotenv')
const envAddedVars = dotenv.config()
console.log(envAddedVars)
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
var config = require('./configs')
//--------------------------------------------------------------------------------

//-------------------------------Configure Parse Server-------------------------------//
var api = new ParseServer({
    databaseURI: config.params['mainServerMongoUrl'], // Connection string for your MongoDB database
    cloud: './cloud/cloud.js', // Path to your Cloud Code
    appId: config.keys.appId,
    masterKey: config.keys.masterKey, // Keep this key secret!
    fileKey: config.keys.fileKey,
    serverURL: config.params['mainServerUrl'], // Don't forget to change to https if needed

    // cacheAdapter: redisCache,
    liveQuery: {
        classNames: ['SignalBlue', 'VIP']
    }

});
app.use("/parse", api);
//-------------------------------------------------------------------------------------//

//-------------------------------Configure Parse Dashboard-----------------------------//
var options = { allowInsecureHTTP: false };
var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": config.params['mainServerUrl'],
            "appId": config.keys.appId,
            "masterKey": config.keys.masterKey,
            "appName": config.keys.appName
        }
    ]
}, options);
app.use("/dashboard", dashboard);
//--------------------------------------------------------------------------------//

//------------------------------------Server Setup------------------------------------//
const PORT = process.env.PORT || 1337; // if undefined let it be 1337.
// choose one of below.
// 1.Without LiveQuery services.
// 2.With LiveQuery services.

// 1.Without LiveQuery services.
// app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

// 2.With LiveQuery services.
// Initialize a LiveQuery server instance, app is the express app of your Parse Server
let httpServer = require('http').createServer(app); // 
httpServer.listen(PORT, function () { });
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer);
//-------------------------------------------------------------------------------------


//-------------------------------Parse Server Endpoints-------------------------------//
app.post('/signup', (req, res) => {

    let telChatId = req.body.chatId;
    let telegramId = req.body.telId;
    let name = req.body.name;
    if (
        telChatId == undefined &&
        telegramId == undefined &&
        name == undefined) {
        res.status(400);
        res.json({
            "status": "invalid input parameters(bad request)."
        });
    } else {

        let result = signUp(telChatId, telegramId, name);
        result.then((client) => {
            res.status(200);
            res.json({
                "status": "User signup done successfully."
            });
        }).catch(((error) => {
            console.log(error);
            res.status(400);
            res.json({
                "status": "User signup failed."
            });
        }))
    }

});

function signUp(chatId, telId, name) {

    const Client = Parse.Object.extend("Client");
    const user = new Client();

    user.set("name", name);
    user.set("chatId", chatId);
    user.set("telegramId", telId);
    return user.save()

}

app.get('/register', (req, res) => {
    let type = req.query.type
    console.log(type)
    if (type == undefined || Object.keys(req.query).length != 1) {
        res.status(400);
        res.json({
            "status": "invalid query parameter."
        });
    }

    let chatId = req.get("chatId");
    let telId = req.get("telId");

    registerSignal(chatId, telId, type).then(value => {
        console.log(value);
        res.status(200);
        res.json({
            "status": "(register/deregister)ation done successfully."
        });
    }).catch(error => {
        console.log(error);
        res.status(400);
        res.json({
            "status": "(register/deregister)ation failed."
        })
    })

});

async function registerSignal(chatId, telId, type) {

    const Client = Parse.Object.extend("Client");
    const query = new Parse.Query(Client);
    query.equalTo("chatId", chatId);
    query.equalTo("telegramId", telId);
    const results = await query.find();
    console.log("Successfully retrieved " + results.length + " scores.");

    const user = results[0]
    console.log(user);
    console.log(typeof (type))

    switch (type) {

        case "1": // regiter VIP
            user.set("VIP", true);
            break;
        case "2": // register Signal.Blue
            user.set("signalBlue", true);
            break;

        case "3": // register AssetManagment
            user.set("riskManagment", true);
            break;

        case "-1": // deregister VIP
            user.set("VIP", false);
            break;

        case "-2": // deregister Signal.Blue
            user.set("signalBlue", false);
            break

        case "-3": // deregister AssetManagment
            user.set("riskManagment", false);
            break

        default:

    }

    return user.save()
}

app.get('/latest', (req, res) => {

    /*
    type should be SignalBlue or VIP. 
    */

    let signalType = req.query.type;
    if (signalType == undefined || !(signalType == "VIP" || signalType == "SignalBlue")) {
        res.status(400);
        res.json({
            "status": "invalid signalType(bad request)."
        });
        return;
    }

    let number = req.query.number;
    if (!isNumeric(number)) {
        res.status(400);
        res.json({
            "status": "number field should be an integer."
        });
        return
    }

    getLatestFiles(parseInt(number), signalType).then(result => {
        res.status(200);
        res.json({
            "stauts": "Signal's history retrieved successfully.",
            "data": result
        });
    }).catch(error => {
        console.log(error)
    });

});


async function getLatestFiles(number, signalClass) {

    const SignalType = Parse.Object.extend(signalClass);
    const query = new Parse.Query(SignalType);
    query.limit(number);
    query.descending("createdAt");
    const results = await query.find();

    let signalMessages = [];
    let signalFileUrls = [];
    let assetManagments = [];

    for (let i = 0; i < results.length; i++) {
        let currentSignal = results[i];
        signalMessages.push(currentSignal.get("signalMessage"));
        signalFileUrls.push(currentSignal.get("signalFile").url());
        assetManagments.push(currentSignal.get("riskManagment"))
    }

    if (signalClass == "VIP") {
        let signalPictures = [];
        for (let i = 0; i < results.length; i++) {
            let currentSignal = results[i];
            let signalPic = currentSignal.get("signalPicture")
            if (signalPicture == undefined) {
                signalPictures.push("")
            } else {
                signalPictures.push(signalPic.url())
            }
        }
        return {
            "signalMessages": signalMessages,
            "signalPictures": signalPictures,
            "signalFiles": signalFileUrls,
            "riskManagment": assetManagments
        }
    }

    return {
        "signalMessages": signalMessages,
        "signalFiles": signalFileUrls,
        "riskManagment": assetManagments
    }

}

app.get('/check', (req, res) => {

})


function workAroundWithToken() {

    Parse.User.enableUnsafeCurrentUser()
    let promise = Parse.User.become("r:b6f6a434cc7a7ff4b5a95f988fbb3cad");
    promise.then(function (user) {
        //console.log("USER")
        console.log(user);
        // The current user is now set to user.
    }, function (error) {
        //console.log("ERROR")
        //console.log(error);
        // The token could not be validated.
    });
}


function isNumeric(num) {
    return !isNaN(num)
}
//---------------------------------------------------------------------------------------//



//-------------------------------Configure Socket Server-------------------------------//
var net = require('net');
var SOCKET_SERVER_HOST = '127.0.0.1'; // parameterize the IP of the Listen
var SOCKET_SERVER_PORT = 6969; // TCP LISTEN port

let socket;

// Create an instance of the Server and waits for a conexão
net.createServer(function (sock) {

    // Receives a connection - a socket object is associated to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    socket = sock;

    // Add a 'data' - "event handler" in this socket instance
    sock.on('data', function (data) {
        console.log(data);
        // data was received in the socket 
    });

    // Add a 'close' - "event handler" in this socket instance
    sock.on('close', function (data) {
        // closed connection
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(SOCKET_SERVER_PORT, SOCKET_SERVER_HOST);

console.log('WebSocketServer listening on ' + SOCKET_SERVER_HOST + ':' + SOCKET_SERVER_PORT);

function notifyBotServer(data) {
    console.log(data);
    const jsonString = JSON.stringify(data);
    socket.write(jsonString.concat("\n"))
    console.log("Data sent.")
}

module.exports = {
    notifyBotServer
}


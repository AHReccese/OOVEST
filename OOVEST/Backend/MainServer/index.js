//----------------------------Requiring ThirdParty Libraries----------------------------//
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var RedisCacheAdapter = require('parse-server').RedisCacheAdapter;
var ParseDashboard = require('parse-dashboard');
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');

//--------------------------------------------------------------------------------
const dotenv = require('dotenv')
const envAddedVars = dotenv.config()
// console.log(envAddedVars)
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

//---------------------------------Requiring Routers---------------------------------//
const apiRouter = require("./routes/apiRouter");
//TODO: const authenRouter = require("./routes/authenRouter");
const robotRouter = require("./routes/robotRouter");

app.use("/api/", apiRouter);
//TODO: app.use("/authen/", authenRouter);
app.use("/robot/", robotRouter);
//--------------------------------------------------------------------------------

//---------------------------------Redis Configuration---------------------------------//
var redisOptions = { url: config.params.redisUrl }
var redisCache = new RedisCacheAdapter(redisOptions);
//--------------------------------------------------------------------------------

//-------------------------------Configure Parse Server-------------------------------//
var api = new ParseServer({
    databaseURI: config.params['mainServerMongoUrl'], // Connection string for your MongoDB database
    cloud: './cloud/cloud.js', // Path to your Cloud Code
    appId: config.keys.appId,
    masterKey: config.keys.masterKey, // Keep this key secret!
    fileKey: config.keys.fileKey,
    serverURL: config.params['mainServerUrl'], // Don't forget to change to https if needed
    cacheAdapter: redisCache,
    liveQuery: {
        classNames: ['OrderBook', 'CoinTable', 'Robot']
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
// App.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

// 2.With LiveQuery services.
// Initialize a LiveQuery server instance, app is the express app of your Parse Server
let httpServer = require('http').createServer(app); // 
httpServer.listen(PORT, function () { });
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer);
//-------------------------------------------------------------------------------------

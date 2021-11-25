var keys = {
    appId: 'myAppId',
    masterKey: 'myMasterKey',
    fileKey: 'optionalFileKey',
    appName: 'MyApp'
}

var configuration = {
    robotUrl: 'http://localhost:8081',
    mainServerUrl: 'http://localhost:1337/parse',
    mainServerMongoUrl: 'mongodb://localhost:27017/webProjectDB',
    redisUrl: '//127.0.0.1:6379'
}

var mailSetting = {
    EMAIL: 'amirhssin6rst@gmail.com',
    PASSWORD: 'gabneljsvvakkccr',
    MAIN_URL: "http://localhost:1337/"
}

module.exports = {
    mailSetting, params: configuration, keys
};

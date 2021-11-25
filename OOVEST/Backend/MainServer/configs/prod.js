var keys = {
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY,
    fileKey: process.env.FILE_KEY,
    appName: process.env.MY_APP_NAME
}

var configuration = {
    robotUrl: process.env.ROBOT_SERVER_URL,
    mainServerUrl: process.env.MAIN_SERVER_URL,
    mainServerMongoUrl: process.env.MAIN_SERVER_MONGODB_URL,
    redisUrl: process.env.REDIS_URL
}

var mailSetting = {
    EMAIL: process.env.PASSWORD,
    PASSWORD: process.env.EMAIL,
    MAIN_URL: process.env.MAIN_URL,
}

module.exports = {
    mailSetting, params: configuration, keys
};

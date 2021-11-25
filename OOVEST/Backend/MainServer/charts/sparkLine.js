const util = require('../utilities/util')
var nomicsApi = require('../API/nomics')

module.exports = { getSparkLine, doJobServiceUpdate }


async function doJobServiceUpdate() {
    let types = ['BTC', 'ETH', 'LTC', 'BCH', 'BNB', 'ETC', 'EOS', 'XLM', 'XRP', 'TRX', 'USDT', 'DOGE']
    for (let index = 0; index < types.length; index++) {
        iterateOverTypes(types[index])
        await util.sleep(16000) // avoid too many requests.
    }
}

async function iterateOverTypes(item) {
    let timeStamps = ['week', 'month', '3month', '6month', 'year']
    for (let index = 0; index < timeStamps.length; index++) {
        let setting = { "coin": item, "category": timeStamps[index] }
        nomicsApi.getSparkLineData(setting)
        await util.sleep(4000) // avoid too many requests.
    }
}

// "coin", "category"
function getSparkLine(setting, res) {
    var didCached = doesExistChartInDB(setting);
    didCached.then(function (didCached) {
        if (didCached.status) {
            res.status(200);
            res.json(didCached.data)
        } else {
            nomicsApi.getSparkLineData(setting, res)
        }
    })
}

async function doesExistChartInDB(setting) {

    const SparkLineChart = Parse.Object.extend("SparkLineChart");
    const query = new Parse.Query(SparkLineChart);
    query.equalTo("category", setting.category);
    query.equalTo("coin", setting.coin.toUpperCase());
    query.limit(1);
    const results = await query.find();
    if (results.length == 0 || results[0].get("prices").length == 0) {
        return { "status": false }
    }

    var dbCell = results[0];

    return {
        "status": true,
        "data": {
            "timestamps": dbCell.get("timestamps"),
            "prices": dbCell.get("prices")
        }
    }

}
const fetch = require('node-fetch');
const dbUpdater = require('../dbUpdater/Updater')

//------------------------------------------------------------------------------//
const nomicsUrl = 'https://api.nomics.com/v1/currencies/sparkline';
const nomicsAPIKey = '88cf084ea9536697404f5fa93755f5e9';
//------------------------------------------------------------------------------//


// todo add cache & DB

module.exports = { getSparkLineData }

function getSparkLineData(setting, res) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var categories = ["week", "month", "3month", "6month", "year"]
    if (!categories.includes(setting.category)) {

        if (res != undefined) {
            res.status(400);
            res.json({ "message": "Bad request." })
        }
        return

    }

    var to = new Date();
    var from = new Date(to);

    if (setting.category == "week") {
        from.setDate(from.getDate() - 7)
    } else if (setting.category == "month") {
        from.setDate(from.getDate() - 30)
    } else if (setting.category == "3month") {
        from.setDate(from.getDate() - 90)
    } else if (setting.category == "6month") {
        from.setDate(from.getDate() - 270)
    } else {
        from.setDate(from.getDate() - 365)
    }

    var from = from.toISOString();
    var to = to.toISOString();

    var path = nomicsUrl +
        `?key=${nomicsAPIKey}` +
        `&ids=${setting.coin.toUpperCase()}` +
        `&start=${from}&end=${to}`;

    console.log(path)

    var promise = fetch(path, requestOptions)

    promise.then(function (response) {

        if (response.status == 200) {

            response.text().then(async function (result) {
                result = result.substring(1, result.length - 2)
                //console.log(result)
                const answer = JSON.parse(result);

                if (res != undefined) {
                    res.status(200);
                    res.json({
                        "timestamps": answer.timestamps,
                        "prices": answer.prices
                    })
                }

                await dbUpdater.pumpSparkLinesIntoDB(
                    setting.coin,
                    setting.category,
                    answer.timestamps,
                    answer.prices);
                console.log(setting)



            })

        } else {
            console.log("failed")
            console.log(response)
            // response.status == 401
            // company's nomics API_KEY is expired.
            if (res != undefined) {
                console.log("failed")
                res.status(500);
                res.json({ "message": "This endpoint is currently under reconstruction." })
            }
        }
    }).catch(error => {
        console.log(error)
        if (res != undefined) {
            res.status(500);
            res.json({ "message": "This endpoint is currently under reconstruction." })
        }
    })

}
const fetch = require('node-fetch');
var config = require('../configs')

module.exports = {
    serveBackTestResult
}

function serveBackTestResult(from, to, coin, res) {

    console.log("from", from);
    console.log("to", to);
    console.log("coin", coin);

    var loginHeaders = new fetch.Headers();
    loginHeaders.append("Content-Type", "application/json");
    var body = JSON.stringify({
        "from": from,
        "to": to,
        "coin": coin
    });

    var requestOptions = {
        method: 'POST',
        headers: loginHeaders,
        body: body,
        redirect: 'follow'
    };

    fetch(config.params['robotUrl'] + '/getBackTestResult', requestOptions)
        .then(function (response) {
            if (response.status == 200) {
                response.text().then(function (result) {
                    const answer = JSON.parse(result);

                    if (answer.priceValue == 'failed') {
                        res.status(500);
                        res.json({
                            "message": "Exchanger doesn't respond."
                        })
                        return
                    }

                    res.status(200);
                    res.json({
                        "moneyVector": answer.priceValue
                    })
                })
            } else {
                res.status(500);
                res.json({
                    "message": "Robot Server Not Responding."
                })
            }
        })
        .catch(error => {
            res.status(500);
            res.json({
                "message": "Robot Server Not Responding."
            })
            console.log('error', error)
        });

}
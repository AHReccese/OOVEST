const fetch = require('node-fetch');

module.exports = {

    login: function (username, password, auth) {

        var loginHeaders = new fetch.Headers();
        loginHeaders.append("Content-Type", "application/json");

        console.log("tokenLogin", username, password, auth);
        // google Authen.
        if (auth != undefined) {
            loginHeaders.append("X-TOTP", auth);
        }

        var body = JSON.stringify({
            "username": username,
            "password": password,
            "captcha": "api",
            "remember": "Yes"
        });

        //{"status": "success", "key": "a44bd89718b5c1e0d00c4d284a4aabb81f8d888b", "device": "gfif6XUO"}

        var requestOptions = {
            method: 'POST',
            headers: loginHeaders,
            body: body,
            redirect: 'follow'
        };

        return fetch('https://api.nobitex.ir/auth/login/', requestOptions);

    },

    getProfileStatus: function (token) {

        var headers = new fetch.Headers();
        headers.append("Authorization", "Token " + token);

        var requestOptions = {
            method: 'POST',
            headers: headers,
            redirect: 'follow'
        };

        return fetch('https://api.nobitex.ir/users/profile', requestOptions)

    },

    //addCard(token,{"number":"1111222233334444","bank":"ملی"});
    addBankCard: function (token, card) {

        var headers = new fetch.Headers();
        headers.append("content-type", "application/json");
        headers.append("Authorization", "Token " + token);

        var body = JSON.stringify({ "number": card.number, "bank": card.bank });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };

        return fetch('https://api.nobitex.ir/users/cards-add', requestOptions)
    },

    //addBankAccount(token,bankAccount);
    addBankAccount: function (token, account) {

        var headers = new fetch.Headers();
        headers.append("content-type", "application/json");
        headers.append("Authorization", "Token " + token);

        var body = JSON.stringify({
            "number": account.number,
            "shaba": account.shaba,
            "bank": account.bank
        });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };

        return fetch('https://api.nobitex.ir/users/accounts-add', requestOptions)

    },

    //getOrder("BTC","IRT");
    getOrderBook: function (sourceCoin, destCoin) {

        var loginHeaders = new fetch.Headers();
        loginHeaders.append("Content-Type", "application/json");
        var body = JSON.stringify({
            "symbol": sourceCoin + destCoin,
        });

        var requestOptions = {
            method: 'POST',
            headers: loginHeaders,
            body: body,
            redirect: 'follow'
        };

        return fetch('https://api.nobitex.ir/v2/orderbook', requestOptions)
        // bid -> فروش , ask -> خرید
    },

    //getMarketStatus("BTC","IRT");
    // اطلاعات بایننس برای قیمت سکه ها + اطلاعاتی کلی راجع به بازار داخلی(تیتر بالای صفحه)
    getMarketStatus: function (sourceCoin, destCoin) {

        var loginHeaders = new fetch.Headers();
        loginHeaders.append("Content-Type", "application/json");
        var body = JSON.stringify({
            "srcCurrency": sourceCoin,
            "dstCurrency": destCoin
        });

        var requestOptions = {
            method: 'POST',
            headers: loginHeaders,
            body: body,
            redirect: 'follow'
        };

        return fetch('https://api.nobitex.ir/market/stats', requestOptions)
    },
    // setOrder(token,{
    //     "type":"buy",
    //     //"execution":"limit", -> default is limit.
    //     "src":"btc",
    //     "dst":"rls",
    //     "amount":"0.01",
    //     "price":7900000000});
    setOrder: function (token, order) {

        var headers = new fetch.Headers();
        headers.append("Authorization", "Token " + token);
        headers.append("content-type", "application/json");

        console.log(order);
        var body = JSON.stringify({
            "type": order.type,
            //"execution":order.exec,
            "srcCurrency": order.src,
            "dstCurrency": order.dst,
            "amount": order.amount,
            "price": order.price
        });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body, body,
            redirect: 'follow'
        };

        return fetch('https://api.nobitex.ir/market/orders/add', requestOptions)
    },
    getOrderState,
    getOrders,
    updateOrder,
    getWallets, getOHLCNobitex

};


/*
errors: for login
    1-invalid userPass
{"non_field_errors":["Unable to log in with provided credentials."]}
    2-ok
{"status": "success", "key": "a44bd89718b5c1e0d00c4d284a4aabb81f8d888b", "device": "9gO1DdUB"}
    3-invalid OTP
{"non_field_errors":["Invalid OTP"],"code":"InvalidOTP"}
*/

//getOrder("BTC","IRT");
function getOrder(sourceCoin, destCoin) {

    var loginHeaders = new fetch.Headers();
    loginHeaders.append("Content-Type", "application/json");
    var body = JSON.stringify({
        "symbol": sourceCoin + destCoin,
    });

    var requestOptions = {
        method: 'POST',
        headers: loginHeaders,
        body: body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/v2/orderbook', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    // bid -> فروش , ask -> خرید
}

//getTrades("BTC","IRT");
function getTrades(sourceCoin, destCoin) {

    var loginHeaders = new fetch.Headers();
    loginHeaders.append("Content-Type", "application/json");
    var body = JSON.stringify({
        "symbol": sourceCoin + destCoin,
    });

    var requestOptions = {
        method: 'POST',
        headers: loginHeaders,
        body: body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/v2/trades', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

//getMarketStatus("BTC","IRT");
// اطلاعات بایننس برای قیمت سکه ها + اطلاعاتی کلی راجع به بازار داخلی(تیتر بالای صفحه)
function getMarketStatus(sourceCoin, destCoin) {

    var loginHeaders = new fetch.Headers();
    loginHeaders.append("Content-Type", "application/json");
    var body = JSON.stringify({
        "srcCurrency": sourceCoin,
        "dstCurrency": destCoin
    });

    var requestOptions = {
        method: 'POST',
        headers: loginHeaders,
        body: body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/market/stats', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

//getOHLCNobitex("BTC","IRT","D","1562120967","1562230967");
function getOHLCNobitex(src, dest, resolution, from, to) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    //api-l.nobitex1.ir: internal nobitex api.
    var path = `https://api.nobitex.ir/market/udf/history?symbol=${src + dest}&resolution=${resolution}&from=${from}&to=${to}`;

    return fetch(path, requestOptions)
    // زمان بر حسب ثانیه است.
}

//getGlobalStatus();
function getGlobalStatus() {

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    var path = 'https://api.nobitex.ir/market/global-stats';

    fetch(path, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


    // قیمت ها در دو صرافی kraken و binance را می دهد.
    // قیمت فقط سکه های خود صرافی نوبیتکس را در آن ها می دهد.

}

//getLoginAttempts()
function getLoginAttempts(token) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);

    var requestOptions = {
        method: 'POST',
        headers: headers,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/users/login-attempts', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

//addCard(token,{"number":"1111222233334444","bank":"ملی"});
function addBankCard(token, card) {

    var headers = new fetch.Headers();
    headers.append("content-type", "application/json");
    headers.append("Authorization", "Token " + token);

    var body = JSON.stringify({ "number": card.number, "bank": card.bank });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/users/cards-add', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}


//addBankAccount(token,bankAccount);
function addBankAccount(token, account) {

    var headers = new fetch.Headers();
    headers.append("content-type", "application/json");
    headers.append("Authorization", "Token " + token);

    var body = JSON.stringify({
        "number": account.number,
        "shaba": account.shaba,
        "bank": account.bank
    });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/users/accounts-add', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}


//addBankAccount(token,bankAccount);
function getUserLimitations(token, account) {

    var headers = new fetch.Headers();
    headers.append("content-type", "application/json");
    headers.append("Authorization", "Token " + token);

    var requestOptions = {
        method: 'POST',
        headers: headers,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/users/limitations', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

//getUserLimitations(token);
function getUserLimitations(token) {

    var headers = new fetch.Headers();
    headers.append("content-type", "application/json");
    headers.append("Authorization", "Token " + token);

    var requestOptions = {
        method: 'POST',
        headers: headers,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/users/limitations', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

//getWallets(token);
function getWallets(token) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);

    var requestOptions = {
        method: 'POST',
        headers: headers,
        redirect: 'follow'
    };

    return fetch('https://api.nobitex.ir/users/wallets/list', requestOptions)

}

//getCardBalance(token,"btc");
function getCardBalance(token, coin) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);

    var body = JSON.stringify({ "currency": coin });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body, body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/users/wallets/balance', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

function getTransactions(token, cardId) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("content-type", "application/json");

    var body = JSON.stringify({ "wallet": cardId });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body, body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/users/wallets/transactions/list', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

function getDepositWithdraw(token, cardId) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("content-type", "application/json");

    var body = JSON.stringify({ "wallet": cardId });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body, body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/users/wallets/deposits/list', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

function getBlockchainAddress(token, cardId) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("content-type", "application/json");

    var body = JSON.stringify({ "wallet": cardId });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body, body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/users/wallets/generate-address', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

// setOrder(token,{
//     "type":"buy",
//     //"execution":"limit", -> default is limit.
//     "src":"btc",
//     "dst":"rls",
//     "amount":"0.01",
//     "price":7900000000});
function setOrder(token, order) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("content-type", "application/json");


    var body = JSON.stringify({
        "type": order.type,
        //"execution":order.exec,
        "srcCurrency": order.src,
        "dstCurrency": order.dst,
        "amount": order.amount,
        "price": order.price
    });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body, body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/market/orders/add', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

//getOrders(token,{"src":"btc","dst":"rls","accurancy":2})
function getOrders(token, setting) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("content-type", "application/json");

    var body = JSON.stringify({
        "srcCurrency": setting.src,
        "dstCurrency": setting.dst,
        "details": 2//setting.accurancy
    });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body, body,
        redirect: 'follow'
    };

    return fetch('https://api.nobitex.ir/market/orders/list', requestOptions)
}

//getOrderState(token,225182001);
function getOrderState(token, id) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("content-type", "application/json");

    var body = JSON.stringify({
        "id": id
    });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body, body,
        redirect: 'follow'
    };

    return fetch('https://api.nobitex.ir/market/orders/status', requestOptions)

}

//updateOrder(token,225182001,"canceled");
function updateOrder(token, orderId, status) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("content-type", "application/json");

    var body = JSON.stringify({
        "order": parseInt(orderId),
        "status": status,
    });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body, body,
        redirect: 'follow'
    };

    return fetch('https://api.nobitex.ir/market/orders/update-status', requestOptions)

}

// cancelOrder(token,{
//     "exec":"limit",
//     "src":"btc",
//     "dst":"rls",
//     "time":0.001
// });
function cancelOrder(token, setting) {

    var headers = new fetch.Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("content-type", "application/json");

    var body;
    if (setting.time == undefined) {
        body = JSON.stringify({
            "execution": setting.exec,
            "srcCurrency": setting.src,
            "dstCurrency": setting.dst,
        });
    } else {
        body = JSON.stringify({
            "execution": setting.exec,
            "srcCurrency": setting.src,
            "dstCurrency": setting.dst,
            "hours": setting.time
        });
    }

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body, body,
        redirect: 'follow'
    };

    fetch('https://api.nobitex.ir/market/orders/cancel-old', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    //سفارش های تا تایم ساعت قبل را لغو می کند
}



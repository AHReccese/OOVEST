const fetch = require('node-fetch');

function signup_test() {
    var loginHeaders = new fetch.Headers();
    loginHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify({
        "chatId": "some number",
        "telId": "AHReccese",
        "name": "AmirHosein Rostami",

    });

    var requestOptions = {
        method: 'POST',
        headers: loginHeaders,
        body: body,
        redirect: 'follow'
    };

    fetch('http://127.0.0.1:1337/signup', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

// ----------------------------------------------------------------------

function register_test() {

    var loginHeaders = new fetch.Headers();
    loginHeaders.append("Content-Type", "application/json");
    loginHeaders.append("chatId", "some number");
    loginHeaders.append("telId", "AHReccese");

    var requestOptions = {
        method: 'GET',
        headers: loginHeaders,
        redirect: 'follow'
    };

    fetch('http://127.0.0.1:1337/register?type=-1', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

register_test()
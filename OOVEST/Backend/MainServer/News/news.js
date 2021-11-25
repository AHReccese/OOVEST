const fetch = require('node-fetch');
const cryptocompareUrl = "https://min-api.cryptocompare.com/data/v2/news/"
module.exports = {
    getNews
}

function getNews(token) {

    var newsGetterHeader = new fetch.Headers();
    newsGetterHeader.append("Authorization", "Apikey " + token);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var path = cryptocompareUrl + '?lang=EN&categories=Blockchain';

    return fetch(path, requestOptions)
}
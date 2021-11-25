import React from 'react'
import { robotBaseURL } from '../IPAddresses/IPaddresses';

function backtest(date, coin, _callback) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    
    var status, statusNumber;
    fetch(robotBaseURL + 'backtest?from=' + date[0] + '&to=' + date[1] + '&coin=' + coin, requestOptions)
    .then(response => {
        status = response.statusText;
        statusNumber = response.status;
        console.log(response);
        console.log(status);
        return response;
        })  
    
    .then(response => response.json())
    .then( result => {
        console.log(status);
        console.log(result);
        
    
        if(status == "OK") {
            _callback(result.moneyVector);
            return;
        } else if(statusNumber == 500) {
            alert(result.message);
        }
    
        console.log(result.message);
        return;
    })
    .catch(error => {
        console.log('error', error)
        return; 
    });
}

export default backtest;
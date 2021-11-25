import React from 'react'
import { apiBaseURL } from '../IPAddresses/IPaddresses';

function getSparkLine(category, coin, _callback) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    
    var status;
    fetch(apiBaseURL + 'getSparkLine?coin=' + coin + '&category=' + category, requestOptions)
    .then(response => {
        status = response.statusText;
        console.log(response);
        console.log(status);
        return response;
        })  
    
    .then(response => response.json())
    .then( result => {
        console.log(status);
        console.log(result);
        
    
        if(status == "OK") {
            _callback(result);
            return;
        }
    
        console.log(result.message);
        return;
    })
    .catch(error => {
        console.log('error', error)
        return; 
    });
}

export default getSparkLine;
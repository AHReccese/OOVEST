import React, { useState, useEffect } from 'react'
import Avatar from '../../assets/images/user/avatar-2.jpg'
import Card from "../../App/components/MainCard";

import { getCookie } from '../../networkF/cookieF';
import { apiBaseURL } from '../../IPAddresses/IPaddresses';
import { checkToken } from '../../networkF/tokenF';

function NobitexAccountInfo() {
    const [data, setdata] = useState({});  

    function checkNobitexState() {
    var token = getCookie("token");

    if(token == null) {
        return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append('Authorization', 'Barear ' +token);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };

    var status, statusText;
    fetch(apiBaseURL + 'getExchangeProfile', requestOptions)
    .then(response => {
        status = response.status;
        statusText = response.statusText;
        console.log(response);
        console.log(status);
        return response;
        })  

    .then(response => response.json())
    .then( result => {
        console.log(status);
        console.log(result);

        if(statusText == "OK") {
            setdata (result);
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

    useEffect(() => { 
    checkToken(checkNobitexState);
    }, {});

    return (
        <>
            <Card title="Profile">
                <div class="text-center">
                    <img class="card-img-top rounded" style={{width: '100px', height: '100px'}} src={Avatar} alt="Profile Image"/>
                </div>
                <br/>
                <h5 class="card-title text-center">Nobitex Account Information</h5>
                <div class="card-body text-center">
                    <div class="row text-center mx-auto" style={{maxWidth: '500px', marginBottom: '5px'}}>
                        <div class="col rounded-left p-2" style={{backgroundColor: '#1A2A38', color: '#fff'}} >
                            Name 
                        </div>
                        <div class="col rounded-right p-2" style={{backgroundColor: '#8888', color: '#1A2A38'}}>
                            {data.firstName}
                        </div>
                    </div>
                    <div class="row text-center mx-auto" style={{maxWidth: '500px', marginBottom: '5px'}}>
                        <div class="col rounded-left p-2" style={{backgroundColor: '#1A2A38', color: '#fff'}} >
                            Family Name 
                        </div>
                        <div class="col rounded-right p-2" style={{backgroundColor: '#8888', color: '#1A2A38'}}>
                            {data.lastName}
                        </div>
                    </div>
                    <div class="row text-center mx-auto" style={{maxWidth: '500px'}}>
                        <div class="col rounded-left p-2" style={{backgroundColor: '#1A2A38', color: '#fff'}} >
                            Phone Number
                        </div>
                        <div class="col rounded-right p-2" style={{backgroundColor: '#8888', color: '#1A2A38'}}>
                            {data.mobile}
                        </div>
                    </div>
                </div> 
            </Card>
        </>
    )
}

export default NobitexAccountInfo;
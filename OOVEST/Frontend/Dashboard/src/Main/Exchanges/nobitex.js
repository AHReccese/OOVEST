import React, { useState, useEffect } from 'react'  
import {
  Row,
  Col,
} from 'react-bootstrap';
import NobitexSignIn from './NobitexSignIn'
import NobitexSettings from './NobitexSettings'
import { checkToken } from '../../networkF/tokenF';
import { getCookie } from '../../networkF/cookieF';
import { apiBaseURL } from '../../IPAddresses/IPaddresses';

function Nobitex() {

  const [signedIn, setsignedIn] = useState(false);  

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
            setsignedIn (true);
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
  }, false);

  
  return (
    <>
      <Row>
        <Col>
          {(signedIn) ? 
            <NobitexSettings/>
          :
            <NobitexSignIn/>
          }   
        </Col>
      </Row> 
    </> 
  );

};

export default Nobitex;
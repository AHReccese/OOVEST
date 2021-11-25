import React from 'react';
import Card from "../../App/components/MainCard";
import * as FaIcons from 'react-icons/fa';

import {
    signInURL,
    apiBaseURL,
    dashboardURL
} from '../../IPAddresses/IPaddresses'
import {getCookie} from '../../networkF/cookieF'
import { checkToken } from '../../networkF/tokenF';


function addBankCard() {

    function onAddBankCardSubmit() {
        //event.preventDefualt();
        var bankName = document.getElementById("RCBankNameID").value;
        var bankCardNumber = document.getElementById("RCCardNumberID").value;
        document.getElementById("RASubmitId").disabled = true;

        checkToken(() => {addBankCard(bankName, bankCardNumber)})
    }

    function addBankCard(bankName, bankCardNumber) {
        var token = getCookie("token");
        console.log(token);
        
        if(token == null) {
            window.location.href = signInURL;
            return;
        }
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append('Authorization', 'Barear ' +token);
    
        var urlencoded = new URLSearchParams();
        urlencoded.append("bank", bankName);
        urlencoded.append("number", bankCardNumber);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
        
        var status;
        fetch(apiBaseURL + 'addBankCard', requestOptions)
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
                console.log('OK!!');
                window.location.href = dashboardURL + '/exchange/nobitex';
                return;
            }
        
            console.log(result.message);
            document.getElementById("card-error-text-area").innerHTML = result.message;
            document.getElementById("card-error-text-area").style.display = "block";
            document.getElementById("RCSubmitId").disabled = false;

            return;
        
        })
        .catch(error => {
            console.log('error', error)
            return; 
        });
    }

    return (
        <>
            <Card title="Add New Bank Card">
                <div className="card-body text-center">
                        <div className="mb-4">
                            <FaIcons.FaCreditCard size={70}/>
                        </div>
                        <form>
                            <div class="row">
                            <div className="mb-3 col-12 col-md-6">
                                <input type="text" id={"RCBankNameID"} className="form-control" placeholder="Bank Name" style={{textAlign: 'center'}} required/>
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <input type="text" id={"RCCardNumberID"} className="form-control" placeholder="Card Number" minLength="16" maxLength="16" style={{textAlign: 'center'}} required/>
                            </div>  
                            </div>    
                            <p className="mb-3" style={{color: 'red', display: 'none'}} id={"card-error-text-area"}>your email address should be more than 3</p>
                            <button onClick={onAddBankCardSubmit} id={"RCSubmitId"} className="btn btn-primary shadow-2 mb-4">Card Submition</button>
                        </form>                         
                </div>
            </Card>
        </>
    )
}

export default addBankCard;
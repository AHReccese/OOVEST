import React from 'react';
import Card from "../../App/components/MainCard";
import * as FaIcons from 'react-icons/fa';

import {
    signInURL,
    apiBaseURL,
    dashboardURL
} from '../../IPAddresses/IPaddresses'
import {getCookie} from '../../networkF/cookieF'


function addBankAccount() {

    function onAddBankAccountSubmit() {
        //event.preventDefualt();
        var token = getCookie("token");
        console.log(token);
        
        if(token == null) {
            window.location.href = signInURL;
            return;
        }
        
        var bankName = document.getElementById("RABankNameID").value;
        var bankCardNumber = document.getElementById("RACardNumberID").value;
        var bankShebaNumber = document.getElementById("RAShebaNumberID").value;
        document.getElementById("RASubmitId").disabled = true;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append('Authorization', 'Barear ' +token);
    
        var urlencoded = new URLSearchParams();
        urlencoded.append("bank", bankName);
        urlencoded.append("number", bankCardNumber);
        urlencoded.append("shaba", bankShebaNumber);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
        
        var status;
        fetch(apiBaseURL + 'addBankAccount', requestOptions)
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
            document.getElementById("account-error-text-area").innerHTML = result.message;
            document.getElementById("account-error-text-area").style.display = "block";
            document.getElementById("RASubmitId").disabled = false;

            return;
        
        })
        .catch(error => {
            console.log('error', error)
            return; 
        });
    }

    return (
        <>
            <Card title="Add New Bank Account">
                <div className="card-body text-center">
                <div className="mb-4">
                    <FaIcons.FaFileInvoiceDollar size={70}/>
                </div>
                <form action="#">
                    <div class="row" >
                    <div className="mb-3 col-12 col-md-6">
                        <input type="text" id={"RABankNameID"} className="form-control" placeholder="Bank Name" style={{direction: 'rtl', textAlign: 'center'}} required/>
                    </div>
                    <div className="mb-3 col-12 col-md-6">
                        <input type="text" id={"RACardNumberID"} className="form-control" placeholder="Card Number" minLength="16" maxLength="16" style={{textAlign: 'center'}} required/>
                    </div> 
                    <div className="mb-3 col-12 col-md-12">
                        <input type="text" id={"RAShebaNumberID"} className="form-control" placeholder="Sheba Number" minLength="26" maxLength="26" style={{textAlign: 'center'}} required/>
                    </div>  
                    </div>    
                    <p className="mb-3" style={{color: 'red', display: 'none'}} id={"account-error-text-area"}>your email address should be more than 3</p>
                    <button onClick={onAddBankAccountSubmit} id={"RASubmitId"} className="btn btn-primary shadow-2 mb-4">Submit Account</button>
                </form>                         
                </div>
            </Card>
        </>
    )
}

export default addBankAccount;
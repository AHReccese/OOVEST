import React from 'react';
import Card from "../../App/components/MainCard";
import * as FaIcons from 'react-icons/fa';
import { checkToken } from '../../networkF/tokenF';
import { getCookie } from '../../networkF/cookieF';
import { apiBaseURL, dashboardURL, signInURL } from '../../IPAddresses/IPaddresses';

function NobitexSignIn() {

    function nobitexSignIn(username, password) {
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
        urlencoded.append("user", username);
        urlencoded.append("pass", password);
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
        
        var status;
        fetch(apiBaseURL + 'setup', requestOptions)
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
            }
        
            console.log(result.message);
            document.getElementById("nobitex-error-text-area").innerHTML = result.message;
            document.getElementById("nobitex-error-text-area").style.display = "block";
            document.getElementById("NobitexSubmitID").disabled = false;
            return;
        
        })
        .catch(error => {
            console.log('error', error)
        });
    }

    function OnSubmitNobitexSignIn (event) {
        event.preventDefault();
        console.log("Submit1!");
        var username = document.getElementById("NobitexUsernameID").value;
        var password = document.getElementById("NobitexPasswordID").value;
        console.log(username);
        console.log(password);
        document.getElementById("NobitexSubmitID").disabled = true;
        checkToken(() => {nobitexSignIn(username, password);});
      }

    return (
        <Card title="Nobitex Setting Account">
            <div className="card-body text-center">
              <div className="mb-4">
                <FaIcons.FaUniversity size={70}/>
              </div>
              <form onSubmit={OnSubmitNobitexSignIn}>
                <div class="row">
                  <div className="mb-3 col-12 col-md-6">
                      <input type="text" id={"NobitexUsernameID"} className="form-control" placeholder="Nobitx username" style={{textAlign: 'center'}} required/>
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                      <input type="password" id={"NobitexPasswordID"} className="form-control" placeholder="Nobitex password" style={{textAlign: 'center'}} required/>
                  </div> 
                </div>    
                  <p className="mb-3" style={{color: 'red', display: 'none'}} id={"nobitex-error-text-area"}>your email address should be more than 3</p>
                  <button type="submit" id={"NobitexSubmitID"} className="btn btn-primary shadow-2 mb-4">Submit Information</button>
              </form>                         
            </div>
        </Card>
    )   
}

export default NobitexSignIn;
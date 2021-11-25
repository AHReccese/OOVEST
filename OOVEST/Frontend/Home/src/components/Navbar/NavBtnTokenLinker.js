import React from 'react'
import {
  NavBtn,
  NavBtnLink,
  PairedButtonBox
} from './NavbarElements';

import {
    apiBaseURL,
    dashboardURL,
    signInURL,
    signUpURL
} from '../../IPAddresses/IPaddresses';

function NavBtnTokenLinker() {

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
      
    function checkToken () {
    
        var token = getCookie("token");
        console.log(token);
        
        if(token == null) {
            return;
        }
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append('Authorization', 'Barear ' +token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        
        var status;
        fetch(apiBaseURL + 'getProfile', requestOptions)
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
                document.getElementById("button-login").style.display = "none";
                document.getElementById("button-signup").style.display = "none";
        
                document.getElementById("button-name").innerHTML = result.username;
                document.getElementById("button-name").style.display = "flex";
                return;
            }
        
            console.log(result.message);
            return;
        
        })
        .catch(error => console.log('error', error));
    }
    
    checkToken();
    return (
    <>
        <PairedButtonBox>
            <NavBtn>
                <NavBtnLink id={"button-login"} to={{pathname : signInURL}} target="_blank">Sign In</NavBtnLink>
            </NavBtn>
            <NavBtn>
                <NavBtnLink id={"button-signup"} to={{pathname : signUpURL}} target="_blank">Sign Up</NavBtnLink>
            </NavBtn>
            <NavBtn>
                <NavBtnLink id={"button-name"} to={{pathname : dashboardURL}} target="_blank" style={{display: 'none'}} >Guest</NavBtnLink>
            </NavBtn>
        </PairedButtonBox>
    </>
    );
}

export default NavBtnTokenLinker;
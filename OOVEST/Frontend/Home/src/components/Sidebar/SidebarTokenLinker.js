import React, { useEffect, useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import { apiBaseURL, dashboardURL, signInURL, signUpURL } from '../../IPAddresses/IPaddresses';
import { SidebarLabel, SidebarLink } from './Elements';

function SidebarTokenLinker() {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [username, setUsername] = useState("Guest");

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
      
    function checkToken (_callback) {
    
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
                _callback(true, result.username);
            }
        
            console.log(result.message);
            return;
        
        })
        .catch(error => console.log('error', error));
    }
    
    useEffect(() => {
        checkToken((state, username) => {setIsSignedIn(state); setUsername(username);})
    }, []);

    return (
        <>
           {isSignedIn? 
                <>
                    <SidebarLink to={{pathname : dashboardURL}} target="_blank">
                    <div>
                        <FaIcons.FaUser/>
                        <SidebarLabel>{username}</SidebarLabel>
                    </div>
                    </SidebarLink>
                </>
                :
                <>
                    <SidebarLink to={{pathname : signInURL}} target="_blank">
                    <div>
                        <FaIcons.FaSignInAlt/>
                        <SidebarLabel>Sign In</SidebarLabel>
                    </div>
                    </SidebarLink>
                    <SidebarLink to={{pathname : signUpURL}} target="_blank">
                    <div>
                        <FaIcons.FaUserPlus/>
                        <SidebarLabel>Sign Up</SidebarLabel>
                    </div>
                    </SidebarLink>
                </>
            }    
        </>
    )
}

export default SidebarTokenLinker;
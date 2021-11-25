import {getCookie} from '../cookieF';
import {
    apiBaseURL, 
    signInURL,
    dashboardURL
} from '../../IPAddresses/IPaddresses'

function NobitexSignIn(username, password) {
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
            //window.location.href = dashboardURL + '/nobitex';
        }
    
        console.log(result.message);
        return result.message;
    
    })
    .catch(error => {
        console.log('error', error)
        return "Network connection Error!"; 
    });
}

export default NobitexSignIn;
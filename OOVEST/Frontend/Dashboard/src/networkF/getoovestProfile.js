import {getCookie} from './cookieF'
import {
    apiBaseURL,
    signInURL,
} from '../IPAddresses/IPaddresses'

function getoovestProfile (_callback) {
    
    var token = getCookie("token");
    console.log(token);
    
    if(token == null) {
        window.location.href = signInURL;
        return null;
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
            _callback(result)
            return;
        }
    
        console.log(result.message);
        window.location.href = signInURL;
        return null;
    })
    .catch(error => {
        console.log('error', error)
        return null; 
    });
}

export default getoovestProfile;
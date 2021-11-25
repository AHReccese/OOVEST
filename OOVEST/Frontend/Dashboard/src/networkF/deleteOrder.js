import { apiBaseURL, signInURL } from "../IPAddresses/IPaddresses";
import { getCookie } from "./cookieF";

function deleteOrder(src, _callback) {
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
        urlencoded.append("order", src);
        urlencoded.append("status", 'canceled');

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
        
        console.log(apiBaseURL + 'setOrder');
        var status;
        fetch(apiBaseURL + 'cancelOrder', requestOptions)
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
                console.log('Order Set is OK!');
                _callback(result.orders);
                return;
            }
        
            _callback(result.message);
            return;
        
        })
        .catch(error => {
            console.log('error', error)
            return; 
        });
}

export default deleteOrder;
import { apiBaseURL, signInURL } from "../IPAddresses/IPaddresses";
import { getCookie } from "./cookieF";

function setOrder(type, src, dst, amount, price, _callback) {
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
        urlencoded.append("type", type);
        urlencoded.append("src", src);
        urlencoded.append("dst", dst);
        urlencoded.append("amount", amount);
        urlencoded.append("price", price);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
        
        console.log(apiBaseURL + 'setOrder');
        var status;
        fetch(apiBaseURL + 'setOrder', requestOptions)
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
                _callback('Order Set is OK!');
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

export default setOrder;
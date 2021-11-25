import React, { useState, useEffect } from 'react'  
import {getCookie} from '../../networkF/cookieF'
import {apiBaseURL} from '../../IPAddresses/IPaddresses'

function BankCards () {

    const [data, setData] = useState([]);  

    useEffect(() => { 
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
        fetch(apiBaseURL + 'getBankCards', requestOptions)
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
                console.log("OK!! GOT BANK CARDS");
                console.log(result);
                setData(result.bankCards);
                return;
            }
        
            console.log(result.message);
            return;
        
        })
        .catch(error => {
            console.log('error', error)
            return; 
        });
    }, []);

    return (
        <>
            {data.map((item, index) => {  
                return <tr key={index}>  
                    <th scope="row">{index+1}</th>
                    <td>{item.bank}</td>  
                    <td>{item.number}</td>  
                </tr>  
            })}
        </>
    )

}

export default BankCards;
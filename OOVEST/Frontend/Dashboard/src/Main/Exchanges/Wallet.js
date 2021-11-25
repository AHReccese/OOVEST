import React, { useEffect, useState } from 'react'
import { apiBaseURL, coinSVGBaseURL } from '../../IPAddresses/IPaddresses';
import { getCookie } from '../../networkF/cookieF';
import { checkToken } from '../../networkF/tokenF';
import * as FaIcons from 'react-icons/fa';

function Wallet() {

    const [wallets, setwallets] = useState([]);
    const [isReady, setIsReady] = useState(false);

    function getWallets() {
        var token = getCookie("token");
        console.log(token);
        
        if(token == null) {
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append('Authorization', 'Barear ' +token);
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };
        
        var status, statusNumber;
        fetch(apiBaseURL + 'getWallets', requestOptions)
        .then(response => {
            status = response.statusText;
            statusNumber = response.status;
            return response;
            })  
        
        .then(response => response.json())
        .then( result => {
            console.log(status);
            console.log(result);
            
            if(status == "OK") {
                setwallets(result.wallets);
                setIsReady(true);
                return;
            } else if(result.message == "invalid token") {
                setIsReady(true);
                return;
            } else if(statusNumber== 404) {
                setIsReady(true);
                return;
            } else {
                getWallets();
                return;
            }
        })
        .catch(error => {
            console.log('error', error)
            return; 
        });

    }

    useEffect(() => {        
        checkToken(getWallets);
    }, []);

    return (
        <>
            {isReady ? 
            wallets.map((item, index) => {  
            return <tr key={index}> 
                <th scope="row">
                    <div class="row align-items-center">
                        <div class="col text-right">
                        <img style={{width: "40px", height: "40px"}} src={coinSVGBaseURL + item.currency + '.svg'}></img> 
                        </div>
                        <div class="col text-left ">
                        {item.currency}
                        </div>
                    </div>

                </th>
                <td style={{verticalAlign: "middle"}}>{item.balance}</td>  
                <td style={{verticalAlign: "middle"}}>{item.rialBalance}</td>  
            </tr>  
            })
            :
            <tr> 
                <th scope="row"><FaIcons.FaCog icon="spinner" className="spinner"/></th>
                <td style={{verticalAlign: "middle"}}><FaIcons.FaCog icon="spinner" className="spinner"/></td>  
                <td style={{verticalAlign: "middle"}}><FaIcons.FaCog icon="spinner" className="spinner"/></td>  
            </tr> 
            }
        </>
    );
}

export default Wallet;
import React from 'react'
import Signal1 from '../../images/SignalBot.png'
import { dashboardURL } from '../../IPAddresses/IPaddresses';

function Baner1() {

    return (
        <>
        <br/>
        <div class="row">
            <div class="col-12 col-md-6">
                <img src={Signal1} class="img-fluid" alt="Img" style={{height:'100%', width:'100%'}}/>
            </div>
            <div class="col-12 col-md-6" style={{color: '#222A37'}}>
                <br/>
                <br/>
                <h2>&emsp;Signal Bots!</h2>
                <p>&emsp;Listen to song of the robots...</p> 
                <br/>
                <div class="d-flex flex-row justify-content-center" >
                    <div class="p-5">
                    <a class="animated-btn text-white" style={{textAlign:'center'}} href={dashboardURL + '/tools/robots/signalbot/bitcoin'}>Bitcoin</a>
                    </div>
                    <div class="p-5">
                    <a class="animated-btn text-white" style={{textAlign:'center'}} href={dashboardURL + '/tools/robots/signalbot/ethereum'}>Ethereum</a>
                    </div>
                </div>
            </div>
        </div>
        <br/>
    </>

    )
}

export default Baner1;
import React from 'react'
import ChartGif from '../../images/chartGif.jpg'
import * as FaIcons from 'react-icons/fa';
import { dashboardURL } from '../../IPAddresses/IPaddresses';

function Baner2() {

    return (
        <>
        <br/>
        <div class="row" style={{backgroundColor: '#1C1A1A'}}>
            <div class="col-12 col-md-6" style={{color: '#DE6759'}}>
                <br/>
                <br/>
                <h2>&emsp;Live Robot BackTest</h2>
                <p>&emsp;Select your time period and entrust to our robots...</p> 
                <br/>
                <div class="d-flex flex-row justify-content-center" >
                    <div class="p-5">
                        <button class='btn btn-danger' style={{padding:'10px', display:'flex', alignItems:'center'}}><a class="text-white" href={dashboardURL + '/tools/robots/botprofittest'}>
                        <FaIcons.FaCog icon="spinner" className="spinner" size={30} style={{verticalAlign:'middle'}}/> &emsp; Live Robot BackTest</a></button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <img src={ChartGif} class="img-fluid" alt="Img" style={{height:'100%', width:'100%'}}/>
            </div>
        </div>
        <br/>
    </>

    )
}

export default Baner2;
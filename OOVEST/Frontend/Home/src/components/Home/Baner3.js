import React from 'react'
import Sevice from '../../images/service.png'
import * as FaIcons from 'react-icons/fa';
import { dashboardURL } from '../../IPAddresses/IPaddresses';

function Baner3() {

    return (
        <>
        <br/>
        <div class="row">
            <div class="col-12 col-md-6">
                <img src={Sevice} class="img-fluid" alt="Img" style={{height:'100%', width:'100%'}}/>
            </div>
            <div class="col-12 col-md-6" style={{color: '#222A37'}}>
                <br/>
                <br/>
                <h2>&emsp;Enjoy Integrity!</h2>
                <p>&emsp;OOvest will be available both on Web and Android platform.</p> 
                <br/>
                <div class="d-flex flex-row justify-content-center" >
                    <div class="p-5">
                    <a class="animated-btn text-white" style={{textAlign:'center'}} href={dashboardURL + '/home/news'}>News</a>
                    </div>
                    <div class="p-5">
                    <a class="animated-btn text-white" style={{textAlign:'center'}} href={dashboardURL + '/tools/coincharts'}>CPV</a>
                    </div>
                </div>
            </div>
        </div>
        <br/>
    </>

    )
}

export default Baner3;
import React from 'react'
import 'bootstrap'
import { dashboardURL, homeURL } from '../IPAddresses/IPaddresses';

const linkStyle = {
    color: "#529AA3"
} 

function Footer() {

    return (
        <>
            <footer class="page-footer font-small pt-4" style={{backgroundImage: "linear-gradient(#2D3A4E, #222A37)", textDecoration: 'none !important'}} >

            <div class="container-fluid text-center text-md-left">
                <div class="row">
                <div class="col-md-6 mt-md-0 mt-3" style={{color: "white"}}>
                    <h5 class="text-uppercase">OOVEST</h5>
                    <p class='text-muted'>Place for cryptocurrency traders and bots.</p>

                </div>
                <div class="col-md-3 mb-md-0 mb-3">
                    <h5 class="text-uppercase" style={{color: "white", fontSize: "14px"}} >Links</h5>

                    <ul class="list-unstyled">
                    <li>
                        <a style={linkStyle} href={homeURL}>Home</a>
                    </li>
                    <li>
                        <a style={linkStyle} href={homeURL + '/usage-help'}>Use Help</a>
                    </li>
                    <li>
                        <a style={linkStyle} href={homeURL + '/services'}>Services</a>
                    </li>
                    <li>
                        <a style={linkStyle} href={homeURL + '/questions'}>Questions</a>
                    </li>
                    <li>
                        <a style={linkStyle} href={homeURL + '/about'}>About Us</a>
                    </li>

                    </ul>

                </div>

                <div class="col-md-3 mb-md-0 mb-3">

                    <h5 class="text-uppercase" style={{color: "white", fontSize: "14px"}} >Dashboard Demo</h5>

                    <ul class="list-unstyled">

                    <li>
                        <a style={linkStyle} href={dashboardURL + '/tools/robots/signalbot/bitcoin'}>Bitcoin Signals</a>
                    </li>
                    <li>
                        <a style={linkStyle} href={dashboardURL + '/tools/robots/signalbot/ethereum'}>Ethereum Signals  </a>
                    </li>
                    <li>
                        <a style={linkStyle} href={dashboardURL + '/tools/robots/botprofittest'}>Robot Back Test</a>
                    </li>
                    <li>
                        <a style={linkStyle} href={dashboardURL + '/tools/coincharts'}>Coin Price Viewer</a>
                    </li>

                    </ul>

                </div>
                </div>
            </div>

            <div class="footer-copyright text-center py-3" style={{color: "white"}} >© 2020 Copyright:
                <a style={linkStyle} href={homeURL}> OOVEST</a>
            </div>

            </footer>
        </>
    )
}

export default Footer;
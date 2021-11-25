import React from 'react'
import * as FaIcons from 'react-icons/fa';
import { signInURL } from '../../IPAddresses/IPaddresses';

function Baner4() {

    return (
        <div class="text-center" style={{backgroundImage: "linear-gradient(#43506A, #2F384A)"}} >
                <br/>
                <br/>
                <h2 class="text-white">Start trading with OOvest for free!</h2>
                <h5 class="text-white">Free to use - no credit card required</h5>
                <br/>
                <div class="d-flex flex-row justify-content-center">
                <button class='btn btn-danger' style={{padding:'10px', paddingLeft:'80px', paddingRight:'50px', display:'flex', alignItems:'center'}}><a class="text-white" href={signInURL}>
                        START NOW &emsp; <FaIcons.FaChevronRight class="animate-flicker" size={30} style={{verticalAlign:'middle'}}/></a></button>
                </div>
                <br/>
                <br/>
                <br/>
                <hr style={{backgroundColor:"black", padding:'0px', margin:'0px'}}/>

        </div>
    )
}

export default Baner4;
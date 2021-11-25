import React from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  PairedButtonBox
} from './NavbarElements';
import logo from "../../images/oovest_logo_75.png"
import {
    apiBaseURL,
    homeURL,
    dashboardURL,
    signInURL,
    signUpURL
} from '../../IPAddresses/IPaddresses';
import NavBtnTokenLinker from "./NavBtnTokenLinker"  

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to='/'>
                    <img src={logo} alt="Logo" />
                </NavLink>          
                <NavMenu>
                <NavLink to='/usage-help'>
                    Use Help
                </NavLink>
                <NavLink to='/services'>
                    Services
                </NavLink>
                <NavLink to='/questions'>
                    Questions
                </NavLink>
                <NavLink to='/about'>
                    About us
                </NavLink>
                {/* Second Nav */}
                {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtnTokenLinker/>  
            </Nav>
        </>
    )
}

export default Navbar

import React, { Component, useEffect, useState } from 'react';
import {Dropdown} from 'react-bootstrap';

import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import { dashboardURL, signInURL } from '../../../../../IPAddresses/IPaddresses';
import { getCookie } from '../../../../../networkF/cookieF';
import getoovestProfile from '../../../../../networkF/getoovestProfile';
import UserName from './UserName';

class NavRight extends Component {
    state = {
        listOpen: false
    };

    render() {

        return (
            <>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar2} className="img-radius" alt="User Profile"/>
                                    <UserName/>
                                    <a href={dashboardURL + '/signout'} className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li>
                                        <a href={dashboardURL + '/profile'} className="dropdown-item">
                                            <i className="feather icon-user" />
                                            Profile
                                        </a>
                                    </li>                                
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </>
        );
    }
}

export default NavRight;

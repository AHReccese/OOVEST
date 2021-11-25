import React from 'react';
import DEMO  from '../../../../../store/constant';
import Aux from "../../../../../hoc/_Aux";
import LOGO from "../../../../../assets/images/oovest_logo_icon.png";
import { homeURL } from '../../../../../IPAddresses/IPaddresses';

const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <Aux>
            <div className="navbar-brand header-logo">
                 <a href={homeURL} className="b-brand" src>
                    <div className="navbar-brand">
                        <img className="feather" src={LOGO} style={{zIndex:10}} />
                    </div>
                    <span className="b-title">OOVEST</span>
                 </a>
                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </Aux>
    );
};

export default navLogo;

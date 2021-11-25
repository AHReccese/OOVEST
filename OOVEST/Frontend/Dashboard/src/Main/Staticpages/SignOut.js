import React from 'react';
import {eraseCookie} from '../../networkF/cookieF'
import {homeURL} from '../../IPAddresses/IPaddresses'
const SignOut = () => {

    eraseCookie("token");
    window.location.href = homeURL;

  return (
    <div style={{textAlign: 'center'}}>
      <h3>You are getting signed out ...</h3>
    </div>
  );
};

export default SignOut;
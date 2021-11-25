import React, { useEffect, useState } from 'react'
import { getCookie } from '../../../../../networkF/cookieF';
import getoovestProfile from '../../../../../networkF/getoovestProfile';

function UserName() {

    const [profiledata, setprofiledata] = useState({});  
    
    useEffect(() => { 

    var token = getCookie("token");
    var username = "";
    
    if(token == null) {
        setprofiledata({username: "Guest"})
    } else {
        getoovestProfile((result) => setprofiledata(result));
    }}, {});

    return (
        <span>{profiledata.username}</span>
    )
}

export default UserName;
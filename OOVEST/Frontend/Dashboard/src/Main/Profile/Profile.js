import React, { useState, useEffect } from 'react'
import getoovestProfile from '../../networkF/getoovestProfile';
import Card from "../../App/components/MainCard";
import Avatar from '../../assets/images/user/avatar-2.jpg'

function Profile() {
    const [profiledata, setprofiledata] = useState({});  

    useEffect(() => { 
        getoovestProfile((result) => setprofiledata(result));
    }, {});

    return (
        <>
            <Card title="Profile">
                <div class="text-center">
                    <img class="card-img-top rounded" style={{width: '100px', height: '100px'}} src={Avatar} alt="Profile Img"/>
                </div>
                <br/>
                <h5 class="card-title text-center">OOvest Profile Info</h5>
                <div class="card-body text-center">
                    <div class="row text-center mx-auto" style={{maxWidth: '500px', marginBottom: '5px'}}>
                    <div class="col rounded-left p-2" style={{backgroundColor: '#1A2A38', color: '#fff'}} >
                            Username 
                        </div>
                        <div class="col rounded-right p-2" style={{backgroundColor: '#8888', color: '#1A2A38'}}>
                            {profiledata.username}
                        </div>
                    </div>
                    <div class="row text-center mx-auto" style={{maxWidth: '500px'}}>
                    <div class="col rounded-left p-2" style={{backgroundColor: '#1A2A38', color: '#fff'}} >
                            Email
                        </div>
                        <div class="col rounded-right p-2" style={{backgroundColor: '#8888', color: '#1A2A38'}}>
                            {profiledata.email}
                        </div>
                    </div>
                </div> 
            </Card>
        </>
    )
}

export default Profile;
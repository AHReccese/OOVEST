import React from 'react';
import {NavLink} from 'react-router-dom';
import './assets/scss/style.scss';
import * as FaIcons from 'react-icons/fa';
import {
    apiBaseURL,
    homeURL,
    dashboardURL,
    signInURL
} from './assets/IPAddresses/IPaddresses'

function App() {

    function setCookie(name,value,hours) {
        var expires = "";
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime() + (hours*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        console.log(name + "=" + (value || "")  + expires + "; path=/");
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    
    function eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    
    function signIn (email, password) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        var status;
        fetch(apiBaseURL + 'signin', requestOptions)
          .then(response => {
            status = response.statusText;
            return response;
            })
    
          .then(response => response.json())
          .then( result => {
              console.log(status);
              console.log(result);
              
              if(status == "OK") {
                var token = result.message.token;
                token = token.slice(7);
    
                eraseCookie("token");
                setCookie("token", token, 0.5);
                console.log(token);
    
                window.location.href = dashboardURL;
                return;
              }
    
            })
          .catch(error => console.log('error', error));
    }

    function signUp (email, password, username) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);
        urlencoded.append("username", username);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
    
        var status;
        fetch(apiBaseURL + 'signup', requestOptions)
        .then(response => {
            status = response.statusText;
            return response;
            })  
    
        .then(response => response.json())
        .then( result => {
            console.log(status);
            console.log(result);
            
            if(status == "Created") {
                signIn(email, password);
                return;
            }
    
            document.getElementById("error-text-area").innerHTML = result.message;
            document.getElementById("error-text-area").style.display = "block";
            document.getElementById("submitId").disabled = false;
            return;
    
        })
        .catch(error => console.log('error', error));
    }
    
    
    function submitSignUp (event) {
        event.preventDefault();
        console.log("Submited!");
        var email = document.getElementById("emailId").value;
        var password = document.getElementById("passwordId").value;
        var username = document.getElementById("usernameId").value;

        document.getElementById("submitId").disabled = true;
        console.log(email);
        console.log(password);
        console.log(username);
        signUp(email, password, username);
    }

    return(
        <>      
        <div style={{backgroundColor:'#1A2A38'}}>
            <div className="auth-wrapper" >
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r"/>
                        <span className="r s" style={{background:'#319CA4'}}/>
                        <span className="r s" style={{background:'#64D1D2'}}/>
                        <span className="r" style={{background:'linear-gradient(-135deg, #314CA9, rgb(156, 156, 156) 29.83%, #144064)'}}/>
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <FaIcons.FaAddressCard size={70}/>
                            </div>
                            <h3 className="mb-4">Sign Up</h3>
                            <form onSubmit={submitSignUp}>
                                <div className="input-group mb-3">
                                    <input type="text" id={"usernameId"} className="form-control" placeholder="Username" required/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" id={"passwordId"} className="form-control" placeholder="Password" minLength="5" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" id={"emailId"} className="form-control" placeholder="Email" required/>
                                </div>        
                                <p className="mb-3" style={{color: 'red', display: 'none'}} id={"error-text-area"}>your email address should be more than 3</p>
                                <button type="submit" id={"submitId"} className="btn btn-primary shadow-2 mb-4">Sign Up</button>
                            </form>                         
                            <p className="mb-0 text-muted">Have an account? <a href={signInURL}>SignIn</a></p>
                            <p className="mb-2 text-muted"><a href={homeURL}>Home</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default App;

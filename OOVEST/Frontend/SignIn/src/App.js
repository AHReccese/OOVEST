import React from 'react';
import './assets/scss/style.scss';
import * as FaIcons from 'react-icons/fa';
import {
  apiBaseURL,
  homeURL,
  dashboardURL,
  signUpURL
} from '../src/assets/IPAddresses/IPaddresses'

var recoveryMode = 0;

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

          document.getElementById("error-text-area").innerHTML = result.message;
          document.getElementById("error-text-area").style.display = "block";
          document.getElementById("submitId").disabled = false;
          document.getElementById("passwordId").value = "";
          return;

        })
      .catch(error => console.log('error', error));
  }

  function recoverPass (email) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    var status;
    fetch(apiBaseURL + 'passwordRetrieval?email=' + email, requestOptions)
      .then(response => {
        status = response.statusText;
        return response;
        })

      .then(response => response.json())
      .then( result => {
          console.log(status);
          console.log(result);
          
          if(status == "OK") {
            alert("Recovery Email has been sent!")
            window.location.href = homeURL;
            return;
          }

          document.getElementById("error-text-area").innerHTML = result.message;
          document.getElementById("error-text-area").style.display = "block";
          document.getElementById("submitId").disabled = false;
          document.getElementById("passwordId").value = "";
          return;

        })
      .catch(error => console.log('error', error));
  }

  function submitSignIn (event) {
    event.preventDefault();
    console.log("Submited!");
    var email = document.getElementById("emailId").value;

    if(recoveryMode) {
      console.log('Recovery');
      recoverPass(email);
      return;
    }
    var password = document.getElementById("passwordId").value;
    console.log(email);
    console.log(password);
    document.getElementById("submitId").disabled = true;
    signIn(email, password);
  }

  function recoverOnClick (event) {
    event.preventDefault();
    console.log("Recovery");
    recoveryMode = 1;
    document.getElementById("passwordId").style.display = "none";
    document.getElementById("passwordId").required = false;
    document.getElementById("recovery-link").style.display = "none";
    document.getElementById("submitId").innerHTML = "Recover";

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
                              <FaIcons.FaUserLock size={70}/>
                          </div>
                          <h3 className="mb-4">Sign In</h3>
                          <form onSubmit={submitSignIn}>
                            <div className="input-group mb-3">
                                <input id={"emailId"} type="email" className="form-control" placeholder="Email" required/>
                            </div>
                            <div className="input-group mb-4">
                                <input id={"passwordId"} type="password" className="form-control" placeholder="Password" required/>
                            </div>
                            <p className="mb-4" style={{color: 'red', display: 'none'}} id={"error-text-area"}>your email address should be more than 3</p>
                            <button id={"submitId"} type="submit" className="btn btn-primary shadow-2 mb-4">Sign In</button>
                          </form>    
                            <p className="mb-3 text-muted" id="recovery-link">Forget Password? <a href='#' onClick={recoverOnClick}>Recover</a></p>                     
                            <p className="mb-0 text-muted">New User? <a href={signUpURL}>Sign Up</a></p>
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

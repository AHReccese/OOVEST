import React from 'react';
import Footer from '../components/Footer';
import UHelp1 from '../images/UHelp/UHelp1.png';
import UHelp2 from '../images/UHelp/UHelp2.png';
import UHelp3 from '../images/UHelp/UHelp3.png';
import UHelp4 from '../images/UHelp/UHelp4.png';

const UsageHelp = () => {
  return (
    <>
    <div class="row d-flex justify-content-center">
      <div class="col-11 col-md-10 col-xl-8"> 
        <br/>
        <h1 class="text-muted">Step1</h1>
        <br/>
        <img src={UHelp1} class="img-fluid" alt="Img"/>
        
        <p>
        <br/>
          First by your email you should register on the platform.
        </p>

        <br/>
        <h1 class="text-muted">Step2</h1>
        <br/>
        <img src={UHelp2} class="img-fluid" alt="Img"/>
        
        <p>
        <br/>
          Then after going to register page and rfinilize your registeration, you will be redirected to dashboard page that you can see your OOvest account info like image above. At this step you can do and manage different things with this account.
        </p>

        <br/>
        <h1 class="text-muted">Step3</h1>
        <br/>
        <img src={UHelp3} class="img-fluid" alt="Img"/>
        
        <p>
        <br/>
          Now you should go through the Nobitex tab in dashboard and set your Nobitex exchange account. After successful setup you should see your Nobitex account info in this tab like the page.
        </p>


        <br/>
        <h1 class="text-muted">Step4</h1>
        <br/>
        <img src={UHelp4} class="img-fluid" alt="Img"/>
        
        <p>
        <br/>
          You can now enjoy our platform and start trading based on our signals. In the near feature you can also connect our autotrading bot to your exchange account!
        </p>

        <br/>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default UsageHelp;  
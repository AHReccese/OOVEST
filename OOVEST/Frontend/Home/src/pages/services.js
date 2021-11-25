import React from 'react';
import Footer from '../components/Footer';
import Service1 from  '../images/Services/Service1.png'
import Service2 from  '../images/Services/Service2.png'
import Service3 from  '../images/Services/Service3.png'
import Service4 from  '../images/Services/Service4.png'

const Services = () => {
  return (
    <>
    <div class="row d-flex justify-content-center">
      <div class="col-11 col-md-10 col-xl-8"> 
        <br/>
        <h1 class="text-muted">News</h1>
        <br/>
        <img src={Service1} class="img-fluid" alt="Img"/>
        
        <p>
        <br/>
          You can access news related to cryptocurrencies. 
        </p>

        <br/>
        <h1 class="text-muted">Price Viewer Tool</h1>
        <br/>
        <img src={Service2} class="img-fluid" alt="Img"/>
        
        <p>
        <br/>
          You have coin price viewer tool so you can monitor a coin price in different steps.
        </p>

        <br/>
        <h1 class="text-muted">Robots Signals</h1>
        <br/>
        <img src={Service3} class="img-fluid" alt="Img"/>
        
        <p>
        <br/>
          Here we have bots signal gauges. You can use them to trade more professionally. Here your have 8 indicators signals and one custem Advanced Robot Strategy (ARS).
        </p>


        <br/>
        <h1 class="text-muted">Robot Back Test</h1>
        <br/>
        <img src={Service4} class="img-fluid" alt="Img"/>
        
        <p>
        <br/>
          You can also back test our robot so you can monitor their profitibility.
        </p>

        <br/>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Services;
import React from 'react';
import AboutImg1 from '../images/oovest_rocket_2.png'
import Amiri from '../images/amiri.png'
import Omidi from '../images/omidi.png'
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <div class="row d-flex justify-content-center">
        <div class="col-11 col-md-10 col-lg-9"> 
          <br/>
          <br/>
          <br/>

          

          <div class="row"style={{alignItems: 'center'}}>
              <div class="col-md-7 col-lg-8 col-xl-10">
              <h5 class='text-muted '>About Us</h5>
              <br/>
                <p>
                We analyze statistical properties of the largest cryptocurrencies (determined by market capitalization), of which Bitcoin is the most prominent example.
                <br/>
                <br/>
                We characterize their exchange rates versus the U.S. Dollar by fitting parametric distributions to them. It is shown that returns are clearly non-normal, however, no single distribution fits well jointly to all the cryptocurrencies analysed.
                <br/>
                <br/>
                We find that for the most popular currencies, such as Bitcoin and Litecoin, the generalized hyperbolic distribution gives the best fit, while for the smaller cryptocurrencies the normal inverse Gaussian distribution, generalized t distribution, and Laplace distribution give good fits. The results are important for investment and risk management purposes.
                </p>
              </div>
              <div class="col-md-5 col-lg-4 col-xl-2">
                <img src={AboutImg1} class="img-fluid" alt="Img" style={{height:'100%', width:'100%'}}/>
              </div>
          </div> 

          <div class="row"style={{alignItems: 'center'}}>
              <div class="col">
              <br/>
              <br/>
              <h5 class='text-muted '>Contact Information</h5>
              <br/>
                <div class="row">
                <b>Telephone: &nbsp;</b> <p class='text-muted '>+021 88691234</p>
                </div>
                <div class="row">
                <b>Address: &nbsp;</b> <p class='text-muted '>Unit8, 4th Fl., No.32, Maryam Bldg., Mirdamad Blvd., Tehran</p>
                </div>
              </div>
          </div>

          <br/>

        </div>
        

      </div>

      <Footer/>
    </>
  );
};

export default About;

/*
<div class="row" style={{width:"100%"}}>

          <div class="card">
            <h5 class="card-header">Our Team</h5>
            <div class="card-body">

            <div class="row">

            <div class="col">

              <div class="card" style={{width: '18rem'}}>
                <img class="card-img-top" src={Amiri} alt="Card image cap"/>
                <div class="card-body">
                  <h5 class="card-title">Amirhossien Rostami</h5>
                  <h6 class="card-subtitle mb-2 text-muted">OOvest developer</h6>
                  <p class="card-text">Two year experience in the other startups.</p>
                </div>
              </div>

              </div>

              <div class="col">
                <div class="card" style={{width: '18rem'}}>
                  <img class="card-img-top" src={Omidi} alt="Card image cap" style={{height:'180px'}}/>
                  <div class="card-body">
                    <h5 class="card-title">Omid Sharafi</h5>
                    <h6 class="card-subtitle mb-2 text-muted">OOvest developer</h6>
                    <p class="card-text">One year experience in the other startups.</p>
                  </div>
                </div>
              </div>
              <br/>
            </div>

            </div>
          </div>

          </div>

        </div>

        <div class="row" style={{width:"100%", margin:"30px"}}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.9192378661755!2d51.34934231461422!3d35.70360498018911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00a8bc1a7e63%3A0x61a5a909b878501!2sSharif%20University%20of%20Technology!5e0!3m2!1sen!2s!4v1613564338855!5m2!1sen!2s" stlyle={{width: '1000px'}} allowfullscreen="true" aria-hidden="false" tabindex="0"></iframe>
        </div>

        */
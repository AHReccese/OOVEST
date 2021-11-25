import React from 'react';
import Footer from '../components/Footer';

import questions from '../contents/questions'

const Questions = () => {

  console.log(questions);
  return (
    <>
    <div class="rgba-black-strong py-5 px-4"></div>
        <div class="row d-flex justify-content-center">
            <div class="col-11 col-md-10 col-xl-8"> 

            <div id="accordionEx5" >
            
            {questions.map((item, index) => {           
              return (
                <div class="card mb-4">

                  <div class="card-header p-0 z-depth-1" role="tab" id={'heading' + index} >
                      <h6 class="white-text mb-0 py-3 mt-1">
                      <button class="btn btn-link"  data-toggle="collapse" data-target={'#collapse' + index} aria-expanded={index? 'false':'ture'}
                      aria-controls={'collapse' + index}  style={{color: '#1D2A37'}}>
                      {item.question}
                      </button>
                      </h6>

                  </div>

                  <div id={'collapse' + index} class={index? 'collapse':'collapse show'} aria-labelledby={'heading' + index}
                      data-parent="#accordionEx5">
                      <div class="card-body rgba-black-light white-text z-depth-1">
                          <p>{item.answer}</p>
                      </div>
                  </div>
                
                </div>
              )
            })}


              </div>    
              <br/>
              <br/>
            </div>


        </div>

        <Footer/>
      </>

  );
};

export default Questions;
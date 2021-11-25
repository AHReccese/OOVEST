import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { apiBaseURL } from '../../IPAddresses/IPaddresses';
import AltImg from '../../assets/images/oovest_logo.png'
function News() {

    const [news, setnews] = useState([]);
    useEffect(() => {        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        
        var status;
        fetch(apiBaseURL + 'getNews?count=10', requestOptions)
        .then(response => {
            status = response.statusText;
            return response;
            })  
        
        .then(response => response.json())
        .then( result => {
            console.log(status);
            console.log(result);
            
            if(status == "OK") {
                setnews(result.news);
                return;
            }

            return;
        })
        .catch(error => {
            console.log('error', error)
            return; 
        });
    }, []);

    return (
        <>
            <Row>
                <Col>
                    {news.map((item, index) => {  
                        return<Card mb={3} onClick={()=>{window.open(item.url);}}>
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src={item.imageurl} alt={item.title} class="img-fluid" style={{width: '100%',height: '100%'}}/>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                        <h5 class="card-title">{item.title}</h5>
                                        <p class="card-text">
                                            {item.body}
                                        </p>
                                        <p class="card-text" style={{color: 'red'}}>
                                            {item.categories}
                                        </p>
                                        <p class="card-text"style={{color: '#1D2A37'}}>
                                            Source: {item.source}
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>    
                    })}
                </Col>
            </Row>

        </>
    );
}

export default News;
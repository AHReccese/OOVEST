import React from 'react'
import { Col, Card } from 'react-bootstrap';
import setOrder from '../../networkF/setOrder';

function SetOrders(props) {

    function onBuySubmit(event){
        event.preventDefault();
        var src = props.coin;
        var dst = 'rls'; 
        var amount = document.getElementById("BuyAmountID").value;
        var price = document.getElementById("BuyPriceID").value;
        console.log(src);
        console.log(dst);
        console.log(amount);
        console.log(price);

        setOrder('buy', src, dst, amount, price, (msg) => {
            document.getElementById("buy-error-text-area").innerHTML = msg;
            document.getElementById("buy-error-text-area").style.display = "block";
        });
        console.log("Buy");
    }

    function onSellSubmitty(){
        console.log("Sell");
        var src = props.coin;
        var dst = 'rls';
        var amount = document.getElementById("SellAmountIDF").value;
        var price = document.getElementById("SellPriceIDF").value;
        console.log(src);
        console.log(dst);
        console.log(amount);
        console.log(price);

        setOrder('sell', src, dst, amount, price, (msg) => {
            document.getElementById("sell-error-text-area").innerHTML = msg;
            document.getElementById("sell-error-text-area").style.display = "block";
        });
        console.log("Sell");
        return false;
    }

    return (
        <>
            <Col xs={12} lg={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Buy {props.englishname} </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <form id={"form_buyyy"}>
                                <div class="row">
                                <div className="mb-3 col-12 col-md-6">
                                    <input type="text" id={"BuyAmountID"} className="form-control" placeholder={'Amount (' + props.coin + ')'} style={{textAlign: 'center'}}/>
                                </div>
                                <div className="mb-3 col-12 col-md-6">
                                    <input type="text" id={"BuyPriceID"} className="form-control" placeholder="Unit Price (rials)" style={{textAlign: 'center'}}/>
                                </div>  
                                </div>    
                                <p className="mb-3" style={{color: 'red', display: 'none'}} id={"buy-error-text-area"}>your email address should be more than 3</p>
                                <button onClick={onBuySubmit} id={"BuySubmitId"} className="btn btn-success shadow-2 mb-4">Buy</button>
                            </form>
                        </Card.Body>
                    </Card>
            </Col>
            <Col xs={12} lg={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Sell {props.englishname} </Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <form id={"form_selly"}>
                                <div class="row">
                                <div className="mb-3 col-12 col-md-6">
                                    <input type="text" id={"SellAmountIDF"} className="form-control" placeholder={'Amount (' + props.coin + ')'} style={{textAlign: 'center'}}/>
                                </div>
                                <div className="mb-3 col-12 col-md-6">
                                    <input type="text" id={"SellPriceIDF"} className="form-control" placeholder="Unit Price (rials)" style={{textAlign: 'center'}}/>
                                </div>  
                                </div>    
                                <p className="mb-3" style={{color: 'red', display: 'none'}} id={"sell-error-text-area"}>your email address should be more than 3</p>
                            </form>
                            <button onClick={onSellSubmitty} id={"SellSubmitIdsd"} className="btn btn-danger shadow-2 mb-4">Sell</button>

                        </Card.Body>
                    </Card>
            </Col>
        </>
    )
}

export default SetOrders;
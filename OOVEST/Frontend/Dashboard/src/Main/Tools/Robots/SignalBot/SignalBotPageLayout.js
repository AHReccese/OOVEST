import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { serverURL } from '../../../../IPAddresses/IPaddresses';
import SignalMeterLayout from './SignalMeterLayout';

const Parse = require('parse');

const IndicatorsNames = ['Advanced Robot Strategy', 'AO Indicator', 'IchImokU Indicator', 'CMF Indicator', 'MacD Indicator', 'MFI Indicator', 'RSI Indicator', 'Stochastic Indicator', 'SMA Indicator'];

Parse.initialize('myAppID');
Parse.serverURL = serverURL;

function SignalBotPageLayout(props) {

    const [blance, setBlance] = useState(null);
    const [signals, setSignals] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [funSignals, setFunSignals] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    async function robot() {
        let query = new Parse.Query('Robot');
        let subscription = await query.subscribe();

        console.log("Bot Signal : ", props.coin);
        subscription.on('update', (object) => {

            var _signals = object.get("signals");
            var _balance = object.get("balance");

            if (object.get("coin") == props.coin) {
                console.log('balance',_balance);
                console.log('signals',_signals);

                setBlance(_balance);
                setSignals(_signals);
                setFunySignal();
            }


        });
    } 

    function setFunySignal() {
        var ans = [];
        for(var i=0; i<signals.length; i++) {
            ans.push((parseInt(signals[i]) + (Math.random() - 0.5)/4))
        }
        console.log(ans);
        setFunSignals(ans);
    }

    setTimeout(
        function run() {
            setFunySignal();
            setTimeout(run, 5000);
    
        }, 1000);

    useEffect(() => {
        robot();
    });


    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">{props.englishname} Signals</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {funSignals.map((item, index) => {

                                    if(index == 0) {
                                        return <Col xs={12}>
                                            <div class="d-flex justify-content-center">
                                                <SignalMeterLayout signal={(item)} strategy={IndicatorsNames[index]} width={500} textColor={'#A5EB24'}/>
                                            </div>
                                            <br/>
                                        </Col>
                                    } else {
                                        return <Col xs={12} xl={6}>
                                            <div class="d-flex justify-content-center">
                                                <SignalMeterLayout signal={(item)} strategy={IndicatorsNames[index]} width={450} textColor={'#1A2A38'} />
                                            </div>
                                        </Col>
                                    }
                                })}

                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SignalBotPageLayout;
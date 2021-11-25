import React, { useEffect, useState } from 'react'
import {Row, Col, Card, Table} from 'react-bootstrap';
import { serverURL } from '../../IPAddresses/IPaddresses';
import * as FaIcons from 'react-icons/fa';

const Parse = require('parse');

Parse.initialize('myAppID');
Parse.serverURL = serverURL;


function OrdersTable(props) {

    const [bidsArr, setbidsArr] = useState([]);
    const [asksArr, setasksArr] = useState([]);
    const [isReady, setIsReady] = useState(false);
    
    async function getorders() {
        let query = new Parse.Query('OrderBook');
        let subscription = await query.subscribe();

        subscription.on('update', (object) => {
            var bids = object.get("bids");
            var asks = object.get("asks");

            console.log("Order Live", props.market);
            if (object.get("market") == "BTCIRT" && props.market == "BTCIRT") {
                console.log("bids", bids);
                console.log("asks", asks);
                setbidsArr(bids);
                setasksArr(asks);
                setIsReady(true);
            } else if(object.get("market") == "ETHIRT" && props.market == "ETHIRT") {
                console.log("bids", bids);
                console.log("asks", asks);
                setbidsArr(bids);
                setasksArr(asks);
                setIsReady(true);
            }

        });
    } 

    useEffect(() => {
        getorders();
    });

    return (
        <>
            <Col xs={12} lg={6} style={{ maxHeight: '500px', overflow: 'auto', display:'block', position: 'relative'}}>
                <Card>
                    <Table responsive hover style={{textAlign: 'center', maxHeight: '100px', color: 'green'}}>
                        <thead style={{color: '#1D2A37'}}> 
                        <tr>
                            <th>Buy Price</th>
                            <th>Buy Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                            {isReady?
                            asksArr.map((item, index) => {  
                                return <tr key={index}>  
                                    <td>{item[0]}</td>  
                                    <td>{item[1]}</td>  
                                </tr>  
                            })
                            :
                                <>
                                    <tr>  
                                    <td><FaIcons.FaCog icon="spinner" className="spinner"/></td>  
                                    <td><FaIcons.FaCog icon="spinner" className="spinner"/></td>  
                                    </tr>
                                </>  
                            }   
                        </tbody>
                    </Table>
                </Card>
            </Col>

            <Col xs={12} lg={6} style={{ maxHeight: '500px', overflow: 'auto', display:'block', position: 'relative'}}>
                <Card>
                    <Table responsive hover style={{textAlign: 'center', maxHeight: '100px', color: 'red'}}>
                        <thead style={{color: '#1D2A37'}}>
                        <tr>
                            <th>Sell Price</th>
                            <th>Sell Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                            {isReady?
                            bidsArr.map((item, index) => {  
                                return <tr key={index}>  
                                    <td>{item[0]}</td>  
                                    <td>{item[1]}</td>  
                                </tr>  
                            })
                            :
                                <>
                                    <tr>  
                                    <td><FaIcons.FaCog icon="spinner" className="spinner"/></td>  
                                    <td><FaIcons.FaCog icon="spinner" className="spinner"/></td>  
                                    </tr>
                                </>  
                            }  
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </>
    )
}

export default OrdersTable;
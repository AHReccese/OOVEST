import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Table } from 'react-bootstrap';
import { coinChartBaseURL, coinSVGBaseURL, serverURL } from '../../IPAddresses/IPaddresses';
import * as FaIcons from 'react-icons/fa';

const Parse = require('parse');

Parse.initialize('myAppID');
Parse.serverURL = serverURL;

function CoinTable() {

    const [btcData, setbtcData] = useState([]);
    const [ethData, setethData] = useState([]);
    const [isReady, setIsReady] = useState(false);

    async function table() {
        let query = new Parse.Query('CoinTable');
        let subscription = await query.subscribe();

        subscription.on('update', (object) => {

            var dayChange = object.get("dayChange");
            var bestBuy = object.get("bestBuy");
            var bestSell = object.get("bestSell");

            console.log("New DATA!");
            console.log("dayChange", dayChange);
            console.log("bestBuy", bestBuy);
            console.log("bestSell", bestSell);

            if (object.get("market") == "btc-rls") {
                setbtcData([{ "dayChange": dayChange, "bestBuy": bestBuy, "bestSell": bestSell }]);
                setIsReady(true);
            } else {
                setethData([{ "dayChange": dayChange, "bestBuy": bestBuy, "bestSell": bestSell }]);
                setIsReady(true);
            }

        });
    }

    useEffect(() => {
        table();
    });

    return (
        <>
            <div class="container">
                <Row>
                    <Col>
                        <br />
                        <Card>
                            <Table responsive hover style={{ textAlign: 'center', width: '100%' }}>
                                <thead style={{ color: '#1D2A37' }}>
                                    <tr>
                                        <th></th>
                                        <th>Coin</th>
                                        <th>Daily Change</th>
                                        <th>Best Buy</th>
                                        <th>Best Sell</th>
                                        <th>Chart</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {isReady ?
                                        <>
                                            {btcData.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <img style={{ width: "40px", height: "40px" }} src={coinSVGBaseURL + 'btc' + '.svg'}></img>
                                                    </td>
                                                    <td>Bitcoin</td>
                                                    <td>{item.dayChange}</td>
                                                    <td>{item.bestBuy}</td>
                                                    <td>{item.bestSell}</td>
                                                    <td><img src={coinChartBaseURL + 'btc' + '.png'}></img>
                                                    </td>
                                                    <td>{ }</td>
                                                </tr>
                                            })}

                                            {ethData.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <img style={{ width: "40px", height: "40px" }} src={coinSVGBaseURL + 'eth' + '.svg'}></img>
                                                    </td>
                                                    <td>Ethereum</td>
                                                    <td>{item.dayChange}</td>
                                                    <td>{item.bestBuy}</td>
                                                    <td>{item.bestSell}</td>
                                                    <td><img src={coinChartBaseURL + 'eth' + '.png'}></img>
                                                    </td>
                                                </tr>
                                            })}
                                        </>
                                        :
                                        <tr>
                                            <td><FaIcons.FaSync icon="spinner" className="spinner" /></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    }

                                </tbody>
                            </Table>
                        </Card>
                        <br />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CoinTable;
import React, { useEffect, useState } from 'react'
import { Card, Col, Table } from 'react-bootstrap';
import deleteOrder from '../../networkF/deleteOrder';
import getMyOrders from '../../networkF/getMyOrders';
import * as FaIcons from 'react-icons/fa';

function MyOrdersTable(props) {
    const [orders, setOrders] = useState([]);  
    const [isReady, setIsReady] = useState(false);  

    useEffect(() => {
        var src = props.coin;
        var dst = 'usdt';
        console.log(src);
        getMyOrders(src, dst, (v) => {
            setOrders(v);
            setIsReady(true);
        })
    }, []);

    return (
        <>
            <Col xs={12} style={{ maxHeight: '500px', overflow: 'auto', display:'block', position: 'relative'}}>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">{'Orders from ' + props.srcenglishname + ' to ' + props.distenglishname}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Table responsive hover style={{textAlign: 'center'}}>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Progress</th>
                            <th>Cancle Order</th>
                        </tr>
                        </thead>
                        <tbody>
                            {isReady?
                            
                                orders.map((item, index) => {
                                return <tr key={index}> 
                                <th scope="row">
                                    {item.type}
                                </th>
                                <td style={{verticalAlign: "middle"}}>{item.price}</td>  
                                <td style={{verticalAlign: "middle"}}>{item.amount}</td>  
                                <td style={{verticalAlign: "middle"}}>{item.matchedAmount}</td>  
                                <td style={{verticalAlign: "middle"}} onClick={deleteOrder(item.id, (v) => {})}><FaIcons.FaTrash/></td>  
                                </tr>  
                                })            
                            :
                            <> 
                                <th scope="row">
                                <FaIcons.FaCog icon="spinner" className="spinner"/>
                                </th>
                                <td style={{verticalAlign: "middle"}}><FaIcons.FaCog icon="spinner" className="spinner"/></td>  
                                <td style={{verticalAlign: "middle"}}><FaIcons.FaCog icon="spinner" className="spinner"/></td>  
                                <td style={{verticalAlign: "middle"}}><FaIcons.FaCog icon="spinner" className="spinner"/></td>  
                                <td style={{verticalAlign: "middle"}}><FaIcons.FaCog icon="spinner" className="spinner"/></td>  
                            </>
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            </Col>
        </>
    )
}

export default MyOrdersTable;
import React from 'react'
import {Row, Col, Card} from 'react-bootstrap';
import CoinChart from './CoinChart';
import MyOrdersTable from './MyOrdersTable';
import OrdersTable from './OrdersTable';
import SetOrders from './SetOrders';

function CoinPageLayout(props) {
    /*return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">نمودار قیمت {props.persianname}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <CoinChart/>
                        </Card.Body>
                    </Card>
                </Col>

                <OrdersTable market={props.market} />
                <SetOrders coin={props.coin} persianname={props.persianname} />
                <MyOrdersTable coin={props.coin} src={props.coin} srcpersianname={props.persianname} dist={"rls"} distpersianname={"ریال"} />
            </Row>   
        </>
    )*/
    return (
        <>
            <Row>
                <OrdersTable market={props.market} />
                <SetOrders coin={props.coin} persianname={props.persianname} englishname={props.englishname} />
                <MyOrdersTable coin={props.coin} src={props.coin} srcpersianname={props.persianname} srcenglishname={props.englishname} dist={"rls"} distpersianname={"ریال"} distenglishname={"Rial"}/>
            </Row>   
        </>
    )
}

export default CoinPageLayout;
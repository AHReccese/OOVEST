import React, { useState } from 'react'
import { DatePicker, Select } from 'antd';
import { Col, Row } from 'react-bootstrap';
import 'antd/dist/antd.css';
import moment from 'moment';
import CoinChart from './CoinChart';

const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
const { Option } = Select;
const TestCoins = ['BTC', 'ETH', 'LTC', 'BCH', 'ETC', 'BNB', 'EOS', 'XLM', 'XRP', 'TRX', 'USDT', 'DOGE'];
const TimeCategory = ['week', 'month', '3month', '6month', 'year'];

function RobotProfitTestLayout() {

    const [selectedCategory, setSelectedCategory] = useState('month');
    const [selectedCoin, setSelectedCoin] = useState('BTC');

    function handleChangeTime(value) {
        console.log(`selected ${value}`);
        setSelectedCategory(value);
    }

    function handleChangeCoin(value) {
        console.log(`selected ${value}`);
        setSelectedCoin(value);
    }
      
    return(
        <Row>

            <Col xs={12}>
                <div class="d-flex justify-content-center">
                    <CoinChart date={selectedCategory} coin={selectedCoin} />
                </div>
            </Col>

            <Col xs={6}>
                <div class="d-flex justify-content-center">
                    <Select defaultValue="month" style={{ width: 120 }} onChange={handleChangeTime} id = {'coinSelect'}>
                        {TimeCategory.map((item, index) => {
                            return <Option value={item}>{item}</Option>
                        })}
                    </Select>
                </div>
            </Col>
            
            <Col xs={6}>
                <div class="d-flex justify-content-center">
                    <Select defaultValue="BTC" style={{ width: 120 }} onChange={handleChangeCoin} id = {'coinSelect'}>
                        {TestCoins.map((item, index) => {
                            return <Option value={item}>{item}</Option>
                        })}
                    </Select>
                </div>
            </Col>

        </Row>
    )
}

export default RobotProfitTestLayout;
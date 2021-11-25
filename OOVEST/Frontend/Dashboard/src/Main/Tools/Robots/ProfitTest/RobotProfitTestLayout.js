import React, { useState } from 'react'
import { DatePicker, Select } from 'antd';
import { Col, Row } from 'react-bootstrap';
import 'antd/dist/antd.css';
import moment from 'moment';
import CoinProfitChart from './CoinProfitChart';

const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
const { Option } = Select;
const BackTestCoins = ['BTC', 'ETH', 'LTC', 'BCH', 'ETC', 'BNB', 'EOS', 'XLM', 'XRP', 'TRX', 'USDT', 'DOGE'];

function RobotProfitTestLayout() {

    const [selectedDate, setSelectedDate] = useState(["2020-01-01", "2021-01-01"]);
    const [selectedCoin, setSelectedCoin] = useState("BTC");

    function onChange(value, dateString) {
        console.log('Formatted Selected Time: ', dateString);
        setSelectedDate(dateString);
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
        setSelectedCoin(value);
    }
      
    return(
        <Row>

            <Col xs={12}>
                <div class="d-flex justify-content-center">
                    <CoinProfitChart date={selectedDate} coin={selectedCoin} />
                </div>
            </Col>

            <Col xs={12}>
                <div class="d-flex justify-content-center">
                    <RangePicker 
                        id = {'rangePiker'}
                        defaultValue={[moment('2020/01/01', dateFormat), moment('2021/01/01', dateFormat)]}
                        format="YYYY-MM-DD"
                        onChange={onChange}
                    />
                </div>
                <br/>
            </Col>
            
            <Col xs={12}>
                <div class="d-flex justify-content-center">
                    <Select defaultValue="BTC" style={{ width: 120 }} onChange={handleChange} id = {'coinSelect'}>
                        {BackTestCoins.map((item, index) => {
                            return <Option value={item}>{item}</Option>
                        })}
                    </Select>
                </div>
                <br/>
            </Col>

        </Row>
    )
}

export default RobotProfitTestLayout;
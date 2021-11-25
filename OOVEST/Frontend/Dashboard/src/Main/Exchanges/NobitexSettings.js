import React, { useState, useEffect } from 'react'

import {
  Row,
  Col,
  Badge,
  Button,
  Tabs, 
  Tab, 
  Nav,
  Table
} from 'react-bootstrap';
import Card from "../../App/components/MainCard";
import BankCards from './BankCards'
import BankAccounts from './BankAccounts';
import AddBankAccount from './AddBankAccount';
import AddBankCard from './AddBankCard';
import NobitexAccountInfo from './NobitexAccountInfo';


function NobitexSettings() {

    return (
        <>
        <Tabs variant="pills" defaultActiveKey="home" className="mb-3">
            <Tab eventKey="home" title="Profile">
                <NobitexAccountInfo/>
            </Tab>
            <Tab eventKey="profile" title="Bank Cards">
            <Card title="Bank Cards">
                    <Table responsive hover style={{textAlign: 'center'}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Bank Name</th>
                            <th>Card Number</th>
                        </tr>
                        </thead>
                        <tbody>
                            <BankCards/>
                        </tbody>
                    </Table>
            </Card>

            <AddBankCard/>

            </Tab>
            
            <Tab eventKey="contact" title="Bank Accounts">
            <Card title="Bank Accounts">
                <Table responsive hover style={{textAlign: 'center'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Bank Name</th>
                        <th>Bank Number</th>
                        <th>Sheba Number</th>
                    </tr>
                    </thead>
                    <tbody>
                        <BankAccounts/>
                    </tbody>
                </Table>
            </Card>

            <AddBankAccount/>

            </Tab>
        </Tabs>
        </>
    )
}
export default NobitexSettings;

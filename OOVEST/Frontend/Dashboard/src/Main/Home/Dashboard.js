import React from 'react';
import { Table } from 'react-bootstrap';
import Card from "../../App/components/MainCard";
import Wallet from '../Exchanges/Wallet';

function Dashboard () {
   
    return (
        <Card title="Total Finance">
        <Table responsive hover style={{textAlign: 'center'}}>
            <thead>
            <tr>
                <th>Wallet</th>
                <th>Amount</th>
                <th>Estimated in Rial</th>
            </tr>
            </thead>
            <tbody>
                <Wallet/>
            </tbody>
        </Table>
    </Card>

    );
};

export default Dashboard;
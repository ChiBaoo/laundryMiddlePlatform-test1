import React, { Component } from 'react'
import { Col, Row, Button, Table } from 'antd';
import { AlertOutlined, ShoppingCartOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Service Name',
        dataIndex: 'serviceName',
        key: 'serviceName',
    },
    {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
        render: (_, record) => (
            <div>
              {record.weight} kg
            </div>
        )
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (_, record) => (
            <div>
              {record.price} VND
            </div>
        )
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (_, record) => (
            <div>
              {record.price} VND
            </div>
        )
    },

];

const DeliveryData = [
    { serviceName: 'Service name', weight: 10, price: 10000, total: 100000 },
    { serviceName: 'Service name', weight: 10, price: 10000, total: 100000 },
    { serviceName: 'Service name', weight: 10, price: 10000, total: 100000 },
    { serviceName: 'Service name', weight: 10, price: 10000, total: 100000 },
    { serviceName: 'Service name', weight: 10, price: 10000, total: 100000 },

]
export default class CheckOut extends Component {
    render() {
        return (
            <div className='Check-Out'>
                <h1>Payment</h1>
                <p>Delivery Address: Customer Name - Customer phone number - Customer Address <Link to='/user-profile' style={{ color: '#5AF0FA' }}>Change</Link></p>
                <Table
                    columns={columns}
                    dataSource={DeliveryData}
                    pagination={false}
                />
                <div className='sub-total'>
                    <p>Shipping fee: 30000 VND</p>
                    <p>Promotion: None</p>
                    <p>Total: 530000 VND</p>
                <Button type='primary'>Make a payment</Button>
                </div>
            </div>
        )
    }
}

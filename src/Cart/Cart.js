import React, { Component } from 'react'
import Navigation from '../Navigate/Navigation'
import { Table, Button, Pagination } from 'antd';
import { CheckOutlined } from '@ant-design/icons';


const columns = [
    {
        title: 'Service Name',
        dataIndex: 'serviceName',
        key: 'serviceName',
    },
    {
        title: 'Service Description',
        dataIndex: 'servicDescription',
        key: 'servicDescription',
    },
    {
        title: 'Unit Price',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
    },
    {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <Button type="primary" style={{ backgroundColor: 'red'}}>Delete</Button>,
    },
];
const data = [
    {
        key: 1,
        serviceName: 'Service name 1',
        servicDescription: 'Service Description 1',
        unitPrice: 10.000,
        weight: 5,
    },
    {
        key: 2,
        serviceName: 'Service name 1',
        servicDescription: 'Service Description 1',
        unitPrice: 10.000,
        weight: 5,
    },
    {
        key: 3,
        serviceName: 'Service name 1',
        servicDescription: 'Service Description 1',
        unitPrice: 10.000,
        weight: 5,
    },
    {
        key: 4,
        serviceName: 'Service name 1',
        servicDescription: 'Service Description 1',
        unitPrice: 10.000,
        weight: 5,
    },
];
export default class Cart extends Component {
    render() {
        return (
            <div className='Cart'>
                <Navigation />
                <div className='sub-cart'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                    <Button type="primary" style={{ backgroundColor: '#43D636', margin: '2% 0% 0% 86%' }} icon={<CheckOutlined />}>
                        Make a payment
                    </Button>
                </div>

            </div>
        )
    }
}

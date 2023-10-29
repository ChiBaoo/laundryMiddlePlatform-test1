import React, { Component } from 'react'
import Navigation from '../Navigate/Navigation'
import { Col, Row, Table, Input, Checkbox, Button } from 'antd'
import { OrderData } from './OrderData'
import { ShopOutlined, AlertOutlined, FilterOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, ':', value);

const columns = [
    {
        title: 'Service',
        dataIndex: 'service',
        key: 'service',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
    },
    {
        title: 'Order At',
        dataIndex: 'orderAt',
        key: 'orderAt',
    },
    {
        title: 'Status',
        // dataIndex: 'status',
        // key: 'status',
        render: (_, record) => (
            <div>
                <Button style={{ backgroundColor: record.status === 'New Order' ? '#FFB74A' : record.status === 'Accept' ? '#43D636' : record.status === 'Finish' ? '#FF6A6A' : record.status === 'Processing' ? '#6AB8FF' : '#FF4444', color: 'white' }}>
                    {record.status}
                </Button>

            </div>
        ),
    },
    {
        title: 'Next Status',
        dataIndex: 'nextStatus',
        key: 'nextStatus',
        render: (_, record) => (
            <div>
                <Button style={{ backgroundColor: record.nextStatus === 'New Order' ? '#FFB74A' : record.nextStatus === 'Accept' ? '#43D636' : record.nextStatus === 'Finish' ? '#FF6A6A' : record.nextStatus === 'Processing' ? '#6AB8FF' : '#FF4444', color: 'white' }}>
                    {record.nextStatus}
                </Button>
                {/* <Button danger>
                            Cancel
                        </Button> */}
            </div>
        ),
    },
];



export default class StoreOrder extends React.Component {
    state = {
        startTime: '',
        endTime: ''
    }
    handleOnChangeStartTime = (event) => {
        this.setState({
            startTime: event.target.value
        })
    }
    handleOnChangeEndTime = (event) => {
        this.setState({
            endTime: event.target.value
        })
    }
    render() {
        return (
            <div className='Store-Order'>
                <Row>
                    <Col span={4}>
                        <div className='service-and-order'>
                            <Link to='/store-order'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> Order</Link> <br />
                            <Link to='/store-service'><ShopOutlined style={{ fontSize: '30px', margin: '5%', }} /> Service</Link> <br />
                            <Link to='/store-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Profile</Link> <br />
                            <div className='filter'>
                                <FilterOutlined style={{ fontSize: '23px' }} /> <h3>Filter</h3>
                            </div>
                            <div className='sub-filter'>
                                <h3 style={{ color: '#FF6A6A' }}>Service</h3>
                                <div className='option'>
                                    <Checkbox>Service 1</Checkbox><br />
                                    <Checkbox>Service 2</Checkbox><br />
                                    <Checkbox>Service 3</Checkbox><br />
                                    <Checkbox>Service 4</Checkbox><br />
                                </div>
                                <h3 style={{ color: '#FF6A6A' }}>Status</h3>
                                <div className='option'>
                                    <Checkbox>New order</Checkbox><br />
                                    <Checkbox>Processing</Checkbox><br />
                                    <Checkbox>Finish</Checkbox><br />
                                    <Checkbox>Cancel</Checkbox><br />
                                </div>
                                <h3 style={{ color: '#FF6A6A' }}>Time</h3>
                                <div className='option' style={{ margin: '5%' }}>
                                    <h4 style={{ color: '#767575' }}>From</h4><input min={6} max={22} type='number' value={this.state.startTime} onChange={(event) => this.handleOnChangeStartTime(event)}></input>
                                    <h4 style={{ color: '#767575' }}>To</h4><input min={6} max={22} type='number' value={this.state.endTime} onChange={(event) => this.handleOnChangeEndTime(event)}></input>
                                </div>
                                <Button type='primary' style={{ backgroundColor: '#FF6A6A', margin: '10%', marginLeft: '20%' }}>Filter</Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={20}>
                        <div className='order'>
                            <div className='search'>
                                <Search placeholder="Search a user by name or phone or email" onSearch={onSearch} enterButton />
                            </div>
                            <Table
                                columns={columns}
                                dataSource={OrderData}
                                expandable={{
                                    expandedRowRender: (record) => (
                                        <p
                                            style={{
                                                marginLeft: '5%',
                                            }}
                                        >
                                            {record.service + ' - Order at: ' + record.orderAt + ' and Finish at: ' + record.finishAt}
                                            <br />
                                        </p>
                                    )
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

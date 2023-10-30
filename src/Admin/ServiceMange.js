import React, { Component } from 'react'
import { Col, Row, Table, Input, Modal, Button } from 'antd'
import AdminNav from './AdminNav';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, ':', value);
const Service =[
    {key: 1, name: 'service name', description: 'service description', maxWeight: 10, price: 10000},
    {key: 2, name: 'service name', description: 'service description', maxWeight: 10, price: 10000},
    {key: 3, name: 'service name', description: 'service description', maxWeight: 10, price: 10000},
    {key: 4, name: 'service name', description: 'service description', maxWeight: 10, price: 10000},
    {key: 5, name: 'service name', description: 'service description', maxWeight: 10, price: 10000},
    {key: 6, name: 'service name', description: 'service description', maxWeight: 10, price: 10000},
    {key: 7, name: 'service name', description: 'service description', maxWeight: 10, price: 10000},
    {key: 8, name: 'service name', description: 'service description', maxWeight: 10, price: 10000},
    

];
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Price (vnd)',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Max Weight (kg)',
        dataIndex: 'maxWeight',
        key: 'maxWeight',
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <div>
        <Button type='primary' style={{marginRight:'2%' }}>Update</Button>
        <Button type='primary'style={{marginLeft:'2%' }} danger>Delete</Button>
      </div>,
    },
];
export default class ServiceManage extends Component {
    state = {
        isModalOpen: false
    }
    showModal = () => {
        this.setState({
            isModalOpen: true
        })
    };
    handleOk = () => {
        this.setState({
            isModalOpen: false
        })
    };
    handleCancel = () => {
        this.setState({
            isModalOpen: false
        })
    };
    render() {
        return (
            <div className='Account-Manage'>
                <Row>
                    <Col span={4}>
                        <AdminNav />
                    </Col>
                    <Col span={20}>
                        <div className='Shipper'>
                            <h3>Service Manage</h3>
                            <div className='search'>
                                <Row>
                                    <Col span={10}>
                                        <Button type="primary" onClick={this.showModal} style={{ backgroundColor: '#6AB8FF' }}>
                                            Add a service
                                        </Button>
                                        <Modal title="Basic Modal" open={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}
                                            footer={[
                                                <Button type="primary" onClick={this.handleOk}>
                                                    Submit
                                                </Button>,
                                            ]}>
                                            <p>Name</p><Input type='text' name='name' />
                                            <p>Description</p><Input type='text' name='phone' />
                                            <p>Price</p><Input type='text' name='email' />
                                            <p>Max weight</p><Input type='text' name='maxWeight' />
                                        </Modal>
                                    </Col>
                                    <Col span={14}>
                                        <div className='search-bar'>
                                            <Search placeholder="Search a service by name" onSearch={onSearch} enterButton />
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                            <Table
                                columns={columns}
                                dataSource={Service}
                                expandable={{
                                    expandedRowRender: (record) => (
                                        <p
                                            style={{
                                                marginLeft: '5%',
                                            }}
                                        >
                                            {record.name + ': ' + record.description }
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

import React, { Component } from 'react'
import { Col, Row, Table, Input, Modal, Button } from 'antd'
import AdminNav from './AdminNav';

export const Account =[
    {key: 1, name: 'Store name', email: 'storeEmail@gmai.com', phone:'0123456789', status: 'active'},
    {key: 2, name: 'Store name', email: 'storeEmail@gmai.com', phone:'0123456789', status: 'active'},
    {key: 3, name: 'Store name', email: 'storeEmail@gmai.com', phone:'0123456789', status: 'active'},
    {key: 4, name: 'Store name', email: 'storeEmail@gmai.com', phone:'0123456789', status: 'active'},
    {key: 5, name: 'Store name', email: 'storeEmail@gmai.com', phone:'0123456789', status: 'active'},
    {key: 6, name: 'Store name', email: 'storeEmail@gmai.com', phone:'0123456789', status: 'active'},
    {key: 7, name: 'Store name', email: 'storeEmail@gmai.com', phone:'0123456789', status: 'active'},
    {key: 8, name: 'Store name', email: 'storeEmail@gmai.com', phone:'0123456789', status: 'active'},
];
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, ':', value);
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
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
export default class StoreManage extends Component {
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
                        <div className='Store-Manage'>
                            <h3>Store Manage</h3>
                            <div className='search'>
                                <Row>
                                    <Col span={10}>
                                        <Button type="primary" onClick={this.showModal} style={{ backgroundColor: '#6AB8FF' }}>
                                            Add a store
                                        </Button>
                                        <Modal title="Basic Modal" open={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}
                                            footer={[
                                                <Button type="primary" onClick={this.handleOk}>
                                                    Submit
                                                </Button>,
                                            ]}>
                                            <p>Name</p><Input type='text' name='name' />
                                            <p>Phone Number</p><Input type='text' name='phone' />
                                            <p>Email</p><Input type='text' name='email' />
                                            <p>Password</p><Input type='password' name='password' />
                                            <p>Address</p><Input type='text' name='address' />

                                        </Modal>
                                    </Col>
                                    <Col span={14}>
                                        <div className='search-bar'>
                                            <Search placeholder="Search a store by name or phone or email" onSearch={onSearch} enterButton />
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                            <Table
                                columns={columns}
                                dataSource={Account}
                                expandable={{
                                    expandedRowRender: (record) => (
                                        <p
                                            style={{
                                                marginLeft: '5%',
                                            }}
                                        >
                                            {record.name + ', ' + record.phone}
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

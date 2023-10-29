import React, { Component } from 'react'
import { Col, Row, Table, Input, Modal, Button } from 'antd'
import { Account } from './AccountData'
import AdminNav from './AdminNav';

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
        render: () => <a href='aaaa.html'>Delete</a>,
    },
];
export default class Shipper extends Component {
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
                            <h3>Shipper Manage</h3>
                            <div className='search'>
                                <Row>
                                    <Col span={10}>
                                        <Button type="primary" onClick={this.showModal} style={{ backgroundColor: '#6AB8FF' }}>
                                            Add a shipper
                                        </Button>
                                        <Modal title="Basic Modal" open={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}
                                            footer={[
                                                <Button key="back" onClick={this.handleCancel}>
                                                    Cancel
                                                </Button>,
                                                <Button type="primary" onClick={this.handleOk}>
                                                    Submit
                                                </Button>,
                                            ]}>
                                            <p>Name</p><Input type='text' name='name' />
                                            <p>Phone Number</p><Input type='text' name='phone' />
                                            <p>Email</p><Input type='text' name='email' />
                                            <p>Password</p><Input type='password' name='password' />
                                        </Modal>
                                    </Col>
                                    <Col span={14}>
                                        <div className='search-bar'>
                                            <Search placeholder="Search a shipper by name or phone or email" onSearch={onSearch} enterButton />
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

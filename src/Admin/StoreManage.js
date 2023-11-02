import React, { Component, useState } from 'react'
import { Col, Row, Table, Input, Modal, Button } from 'antd'
import AdminNav from './AdminNav';

export const Account = [
    { id: 1, name: 'Store name', description: 'Store Description', email: 'storeEmail@gmai.com', phone: '0123456789', status: 'active', },
    { id: 2, name: 'Store name', description: 'Store Description', email: 'storeEmail@gmai.com', phone: '0123456789', status: 'active', },
    { id: 3, name: 'Store name', description: 'Store Description', email: 'storeEmail@gmai.com', phone: '0123456789', status: 'active', },
    { id: 4, name: 'Store name', description: 'Store Description', email: 'storeEmail@gmai.com', phone: '0123456789', status: 'active', },
    { id: 5, name: 'Store name', description: 'Store Description', email: 'storeEmail@gmai.com', phone: '0123456789', status: 'active', },
    { id: 6, name: 'Store name', description: 'Store Description', email: 'storeEmail@gmai.com', phone: '0123456789', status: 'active', },
    { id: 8, name: 'Store name', description: 'Store Description', email: 'storeEmail@gmai.com', phone: '0123456789', status: 'active', },
    { id: 9, name: 'Store name', description: 'Store Description', email: 'storeEmail@gmai.com', phone: '0123456789', status: 'active', },
    { id: 10, name: 'Store name', description: 'Store Description', email: 'storeEmail@gmai.com', phone: '0123456789', status: 'active', },

];
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, ':', value);

const getId = (id) => {
    console.log('check:',  id)
}
// const handleDelete = (id) => {
//     const newData = dataSource.filter((item) => item.key !== key);
//     setDataSource(newData);
//   };
export default function StoreManage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [storeId, setStoreId] = useState()
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
        key: 'id',
        render: (record) => <div>
            <Button type='primary' style={{ marginRight: '2%' }} onClick={() => { onDeleteStudent(record);      }} >Update {record.id}</Button>
        </div>,
        
    },
];
const onDeleteStudent = (record) =>{
    // setStoreId([record.id])
    console.log(record.id)
    // console.log(storeId)
}
    const showModal = () => {
        setIsModalOpen(true)
    };
    const handleOk = () => {
        setIsModalOpen(false)
      };
    const handleCancel = () => {
        setIsModalOpen(false)
    };

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
                                        <Button type="primary" onClick={showModal} style={{ backgroundColor: '#6AB8FF' }}>
                                            Add a store
                                        </Button>
                                        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                            footer={[
                                                <Button type="primary" onClick={handleOk}>
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

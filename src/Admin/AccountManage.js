import React, { Component } from 'react'
import { Col, Row, Table, Input,Button } from 'antd'
import { Account } from './AccountData'
import AdminNav from './AdminNav';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source,':', value);
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
        render: () =><div>
        <Button type='primary' style={{marginRight:'2%' }}>Update</Button>
        <Button type='primary'style={{marginLeft:'2%' }} danger>Delete</Button>
      </div>,
    },
];
export default class AccountManage extends Component {
    render() {
        return (
            <div className='Account-Manage'>
                <Row>
                    <Col span={4}>
                        <AdminNav/>
                    </Col>
                    <Col span={20}>
                        <div className='account'>
                        <div className='search'>
                        <Search placeholder="Search a user by name or phone or email" onSearch={onSearch} enterButton />
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

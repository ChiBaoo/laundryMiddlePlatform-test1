import React, { useState, useEffect } from 'react'
import { Col, Row, Table, Input, Button } from 'antd'
import AdminNav from './AdminNav';
import axios from 'axios';


const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, ':', value);

const columns = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
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
            <Button type='primary' style={{ marginRight: '2%' }}>Update</Button>
            <Button type='primary' style={{ marginLeft: '2%' }} danger>Delete</Button>
        </div>,
    },
];
export default function AccountManage() {
    const [accountData, setAccountData] = useState([])

   

    const bearer_token = `Bearer ${localStorage.getItem('Token')}`;
    useEffect(() => {
        setAccountData(getUser)
        console.log('data', accountData)
    }, []);

    const getUser = () => {
        const headers = {
           Authorization: bearer_token
        };
        // Make the GET request.
        axios
            .get('https://localhost:7195/api/User', { headers })
            .then((response) => {
                // Handle the response.
                console.log('data', response.data)
                setAccountData(response.data)
                
            })
            .catch((error) => {
                console.log("local", localStorage.getItem("Token"))
                // console.log("local 1", token)
                // Handle the error.
            });
    }
    return (
        <div className='Account-Manage'>
            <Row>
                <Col span={4}>
                    <AdminNav />
                </Col>
                <Col span={20}>
                    <div className='account'>
                        <div className='search'>
                            <Search placeholder="Search a user by name or phone or email" onSearch={onSearch} enterButton />
                        </div>
                        <Table
                            columns={columns}
                            dataSource={accountData}
                        // expandable={{
                        //     expandedRowRender: (record) => (
                        //         <p
                        //             style={{
                        //                 marginLeft: '5%',
                        //             }}
                        //         >
                        //             {record.name + ', ' + record.phone}
                        //         </p>
                        //     )
                        // }}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

import React, {  useState } from 'react'
import { Col, Row, Table, Input, Modal, Button, Select, Space, message } from 'antd'
import AdminNav from './AdminNav';
import { useEffect } from 'react';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


export default function ShipperManage() {
    const [userData, setUserData] = useState(null)
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, seteditingUser] = useState(null);
    const [search, setSearch] = useState()
    const [messageApi, contextHolder] = message.useMessage();
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
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (record) => <div>
                <EditOutlined
                    onClick={() => { editUserModal(record); }}
                />
                <DeleteOutlined
                    onClick={() => {
                        DeleteService(record);
                    }}
                    style={{ color: "red", marginLeft: 12 }}
                />
                {/* <Button type='primary' style={{ marginLeft: '2%' }} danger>Delete</Button> */}
            </div>,
        },
        {
            title: '',
            dataIndex: 'password',
            key: 'password',
            render: () => <div hidden>

            </div>
        },
        
    ];
    useEffect(() => {
        setUserData(getUserData)
    }, []);

    const getUserData = () => {
        // Make the GET request.
        axios
            .get('https://localhost:7195/api/User?$filter=RoleId eq 4')
            .then((response) => {
                // Handle the response.
                setUserData(response.data)
            })

            .catch((error) => {
                console.log("local", localStorage.getItem("Token"))

            });

    }
    //UPDATE
    const editUserModal = (record) => {
        console.log(record.userId)
        setIsEditing(true);
        seteditingUser({ ...record })
    }
    const resetEditing = () => {
        setIsEditing(false);
        seteditingUser(null);
    };
    //DELETE
    const DeleteService = (record) => {
        console.log('record:', record)
        Modal.confirm({
            title: "Are you sure, you want to delete this service record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                const deleteId = record.serviceId
                console.log('deleteId', deleteId)
                axios.delete(`https://localhost:7195/api/Service/deleteservice/${deleteId}`)
                    .then((response) => {
                        // Handle the response.
                        console.log(response)
                    })
                    .catch((error) => {
                        console.log("err", error)
                        console.log('record', record.serviceId)
                    });
            },
        });
    };
    //DETAIL

    const editUser = () => {
        console.log('edit data: ', editingUser)
        axios.put(`https://localhost:7195/api/User/${editingUser.userId}`, editingUser)
            .then(response => {
                // Handle the successful response
                successNofi('Update successfully')
                getUserData()
                console.log(response.data);
            }
            )
            .catch(error => {
                // Handle the error
                console.log(error);
                failNofi('Something was wrong, please try again')
            });
    };

    const handleChangeUpdate = (value) => {
        seteditingUser((pre) => {
            return { ...pre, gender: value };
        });
        console.log(`selected ${value}`);
    };
    const searchByName = () => {
        // Make the GET request.
        axios
            .get(`https://localhost:7195/api/User?$filter=RoleId eq 2 contains(email, '${search}')`)
            .then((response) => {
                // Handle the response.
                console.log(response.data)

            })
            .catch((error) => {
                console.log("local", localStorage.getItem("Token"))

            });
    }
    const successNofi = (message) =>{
        messageApi.open({
            type: 'success',
            content: message,
            style: {
                marginLeft: '80%',
                marginTop: '5%',
              },
          })
    }
    const failNofi = (message) =>{
        messageApi.open({
            type: 'error',
            content: message,
            style: {
                width: '100%', 
                marginLeft: '38%',
                marginTop: '5%',
              },
          })
    }
    return (
        <div className='Account-Manage'>
            <Row>
                <Col span={4}>
                    <AdminNav />
                </Col>
                <Col span={20}>
                    <div className='Shipper'>
                        <h3>User Manage</h3>
                        {contextHolder}
                        <div className='search'>
                            <Row>
                                <Col span={10}>
                                    
                                </Col>
                                <Col span={14}>
                                    <div className='search-bar'>
                                        <Space>
                                            <Space.Compact
                                                style={{
                                                    width: '200%',
                                                }}
                                            >
                                                <Input placeholder="Search a service by name" value={search} onChange={(e) => setSearch(e.target.value)} />
                                                <Button type="primary" onClick={searchByName}>Search</Button>
                                            </Space.Compact></Space>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                        <Table
                            columns={columns}
                            dataSource={userData}
                        />
                        <Modal
                            title="Edit User"
                            visible={isEditing}
                            okText="Save"
                            onCancel={() => {
                                resetEditing();
                            }}
                            onOk={() => {
                                editUser();
                                resetEditing();
                                console.log(editingUser)
                            }}
                        >
                            <p>First Name</p>
                            <Input
                                value={editingUser?.firstName}
                                onChange={(e) => {
                                    seteditingUser((pre) => {
                                        return { ...pre, firstName: e.target.value };
                                    });
                                }}
                            />
                            <p>Last Name</p>
                            <Input
                                value={editingUser?.lastName}
                                onChange={(e) => {
                                    seteditingUser((pre) => {
                                        return { ...pre, lastName: e.target.value };
                                    });
                                }}
                            />
                            <p>Phone Number</p>
                            <Input
                                value={editingUser?.phoneNumber}
                                onChange={(e) => {
                                    seteditingUser((pre) => {
                                        return { ...pre, phoneNumber: e.target.value };
                                    });
                                }}
                            />
                            {/* <p>Clother Type</p>
                            <Select
                                defaultValue={editingUser?.clothesTypeId}
                                style={{
                                    width: 300,
                                }}
                                onChange={handleChangeUpdate}
                                options={[
                                    {
                                        value: '1',
                                        label: '1 - T-Shirt',
                                    },
                                    {
                                        value: '2',
                                        label: '2 - Normal Shirt',
                                    }
                                ]}
                            /> */}
                            <p>Address</p>
                            <Input
                                value={editingUser?.address}
                                onChange={(e) => {
                                    seteditingUser((pre) => {
                                        return { ...pre, address: e.target.value };
                                    });
                                }}
                            />
                            <p>Gender</p>
                            <Select
                                defaultValue={editingUser?.gender}
                                style={{
                                    width: 300,
                                }}
                                onChange={handleChangeUpdate}
                                options={[
                                    {
                                        value: 'Male',
                                        label: 'Male',
                                    },
                                    {
                                        value: 'Female',
                                        label: 'Female',
                                    },
                                    {
                                        value: 'Other',
                                        label: 'Other',
                                    }
                                ]}
                            />
                            <p>Password</p>
                            <Input type='password'
                                value={editingUser?.password}
                                onChange={(e) => {
                                    seteditingUser((pre) => {
                                        return { ...pre, password: e.target.value };
                                    });
                                }}
                            />
                        </Modal>
                    </div>
                </Col>
            </Row>
        </div>
    )

}

import React, { Component, useState } from 'react'
import { Col, Row, Table, Input, Modal, Button, Select, Space, DatePicker } from 'antd'
import AdminNav from './AdminNav';
import { useEffect } from 'react';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

const { Search } = Input;
// const onSearch = (value, _e, info) => console.log(info?.source, ':', value);

export default function ShipperManage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [clothesTypeId, setClothesTypeId] = useState(1)
    const [storeData, setStoreData] = useState(null)
    const [isEditing, setIsEditing] = useState(false);
    const [editingStore, setEditingStore] = useState(null);
    const [search, setSearch] = useState()
    const [addStoreData, setAddStoreData] = useState()
    const bearer_token = ''
    // `Bearer ${localStorage.getItem('Token')}`;
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
                    onClick={() => { editStoreModal(record); }}
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
        setStoreData(getStoreData)
    }, []);

    const getStoreData = () => {
        // Make the GET request.
        axios
            .get('https://localhost:7195/api/User?$filter=RoleId eq 2')
            .then((response) => {
                // Handle the response.
                // console.log(response.data)
                setStoreData(response.data)
            })

            .catch((error) => {
                console.log("local", localStorage.getItem("Token"))

            });

    }
    //UPDATE

    const editStoreModal = (record) => {
        // setStoreId([record.id])
        console.log(record.userId)
        // console.log(storeId)
        setIsEditing(true);
        setEditingStore({ ...record })
    }
    const resetEditing = () => {
        setIsEditing(false);
        setEditingStore(null);
    };
    //DELETE
    const DeleteService = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this service record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                const headers = {
                    Authorization: bearer_token
                };
                const deleteId = record.serviceId
                console.log('deleteId', deleteId)
                axios.delete(`https://localhost:7195/api/Service/deleteservice/${deleteId}`, { headers })
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
    const showModal = () => {
        setIsModalOpen(true)
    };
    const handleOk = () => {

        setAddStoreData((prevState) => ({
            ...prevState,
            status: 'active'
        }));
        console.log('add data: ', addStoreData)
        axios.post('https://localhost:7195/api/Store/createforowner', addStoreData, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                Authorization: bearer_token
            },
        })
            .then(response => {
                // Handle the successful response
                console.log(response.data);
                console.log('store data', addStoreData)
                alert('Add a new store successful')

                getStoreData()
            }
            )
            .catch(error => {
                // Handle the error
                console.log(error)
                alert('Some field were wrong, please try again')

            });
        setIsModalOpen(false)
    };

    const editStore = () => {

        const data = {
            "userId": 14,
            "firstName": "string",
            "lastName": "string",
            "phoneNumber": "string",
            "password": "string",
            "address": "string",
            "gender": "string",
            // "birthday": "2023-11-05T07:31:32.534Z"
        }
        console.log('edit data: ', editingStore)
        axios.put(`https://localhost:7195/api/User/${editingStore.userId}`, editingStore, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                Authorization: bearer_token
            },
        })
            .then(response => {
                // Handle the successful response
                getStoreData()
                console.log(response.data);
                // setServiceData(getService)

            }
            )
            .catch(error => {
                // Handle the error
                console.log(error);
            });
    };
    const handleCancel = () => {
        setIsModalOpen(false)
    };
    const handleChange = (value) => {
        setAddStoreData((pre) => {
            return { ...pre, gender: value };
        });
        console.log(`selected ${value}`, addStoreData);
    };
    const handleChangeUpdate = (value) => {
        setEditingStore((pre) => {
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
    const onChangeDate = (date, dateString) => {
        setAddStoreData((pre) => {
            return { ...pre, birthday: dateString };
        });
    };
    return (
        <div className='Account-Manage'>
            <Row>
                <Col span={4}>
                    <AdminNav />
                </Col>
                <Col span={20}>
                    <div className='Shipper'>
                        <h3>Store Manage</h3>
                        <div className='search'>
                            <Row>
                                <Col span={10}>
                                    <Button type="primary" onClick={showModal} style={{ backgroundColor: '#6AB8FF' }}>
                                        Add a Store
                                    </Button>
                                    <Modal title="Create a store" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                        footer={[
                                            <Button type="primary" onClick={handleOk}>
                                                Submit
                                            </Button>,
                                        ]}>
                                        <p>First Name</p>
                                        <Input type='text'
                                            value={addStoreData?.firstName}
                                            onChange={(e) => {
                                                setAddStoreData((pre) => {
                                                    return { ...pre, firstName: e.target.value };
                                                });
                                            }} />
                                        <p>Last Name</p>
                                        <Input type='text'
                                            value={addStoreData?.lastName}
                                            onChange={(e) => {
                                                setAddStoreData((pre) => {
                                                    return { ...pre, lastName: e.target.value };
                                                });
                                            }} />


                                        <p>Phone Number</p>
                                        <Input type='text'
                                            value={addStoreData?.phoneNumber}
                                            onChange={(e) => {
                                                setAddStoreData((pre) => {
                                                    return { ...pre, phoneNumber: e.target.value };
                                                });
                                            }} />
                                        <p>Email</p>
                                        <Input type='text'
                                            value={addStoreData?.email}
                                            onChange={(e) => {
                                                setAddStoreData((pre) => {
                                                    return { ...pre, email: e.target.value };
                                                });
                                            }} />
                                        <p>Password</p>
                                        <Input type='password'
                                            value={addStoreData?.password}
                                            onChange={(e) => {
                                                setAddStoreData((pre) => {
                                                    return { ...pre, password: e.target.value };
                                                });
                                            }} />
                                        <p>Address</p>
                                        <Input type='text'
                                            value={addStoreData?.address}
                                            onChange={(e) => {
                                                setAddStoreData((pre) => {
                                                    return { ...pre, address: e.target.value };
                                                });
                                            }} />
                                        <p>Gender</p>
                                        <Select
                                            defaultValue={addStoreData?.gender}
                                            style={{
                                                width: 300,
                                            }}
                                            onChange={handleChange}
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
                                        <p>Birthday</p>
                                        <DatePicker style={{ margin: '10px', fontSize: '16px' }} value={dayjs(addStoreData?.birthday)} onChange={onChangeDate} /> <br />
                                    </Modal>
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
                            dataSource={storeData}
                        />
                        <Modal
                            title="Edit Shipper"
                            visible={isEditing}
                            okText="Save"
                            onCancel={() => {
                                resetEditing();
                            }}
                            onOk={() => {
                                editStore();
                                resetEditing();
                                console.log(editingStore)
                            }}
                        >
                            <p>First Name</p>
                            <Input
                                value={editingStore?.firstName}
                                onChange={(e) => {
                                    setEditingStore((pre) => {
                                        return { ...pre, firstName: e.target.value };
                                    });
                                }}
                            />
                            <p>Last Name</p>
                            <Input
                                value={editingStore?.lastName}
                                onChange={(e) => {
                                    setEditingStore((pre) => {
                                        return { ...pre, lastName: e.target.value };
                                    });
                                }}
                            />
                            <p>Phone Number</p>
                            <Input
                                value={editingStore?.phoneNumber}
                                onChange={(e) => {
                                    setEditingStore((pre) => {
                                        return { ...pre, phoneNumber: e.target.value };
                                    });
                                }}
                            />
                            {/* <p>Clother Type</p>
                            <Select
                                defaultValue={editingStore?.clothesTypeId}
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
                                value={editingStore?.address}
                                onChange={(e) => {
                                    setEditingStore((pre) => {
                                        return { ...pre, address: e.target.value };
                                    });
                                }}
                            />
                            <p>Gender</p>
                            <Select
                                defaultValue={editingStore?.gender}
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
                                value={editingStore?.password}
                                onChange={(e) => {
                                    setEditingStore((pre) => {
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

import React, { Component, useState } from 'react'
import { Col, Row, Table, Input, Modal, Button, Select, Space, DatePicker, message } from 'antd'
import AdminNav from './AdminNav';
import { useEffect } from 'react';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

const TOKEN = localStorage.getItem("Token")

const { Search } = Input;
// const onSearch = (value, _e, info) => console.log(info?.source, ':', value);



export default function ShipperManage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [clothesTypeId, setClothesTypeId] = useState(1)
    const [shipperData, setShipperData] = useState(null)
    const [isEditing, setIsEditing] = useState(false);
    const [edittingShipper, setedittingShipper] = useState(null);
    const [search, setSearch] = useState()
    const [addShipperData, setAddShipperData] = useState()
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
                    onClick={() => { editShipperModal(record); }}
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
        setShipperData(getShipperData)
    }, []);

    const getShipperData = () => {
        const headers = {
            // Authorization: bearer_token
        };
        // Make the GET request.
        axios
            .get('https://localhost:7195/api/User?$filter=RoleId eq 3', { headers })
            .then((response) => {
                // Handle the response.
                // console.log(response.data)
                setShipperData(response.data)
            })

            .catch((error) => {
                console.log("local", localStorage.getItem("Token"))

            });

    }
    //UPDATE

    const editShipperModal = (record) => {
        console.log(record.userId)
        setIsEditing(true);
        setedittingShipper({ ...record })
    }
    const resetEditing = () => {
        setIsEditing(false);
        setedittingShipper(null);
    };
    //DELETE
    const DeleteService = (record) => {
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
    const showModal = () => {
        setIsModalOpen(true)
    };
    const handleOk = () => {

        setAddShipperData((prevState) => ({
            ...prevState,
            status: 'active'
        }));
        console.log('add data: ', addShipperData)
        axios.post('https://localhost:7195/api/User/createshipper', addShipperData)
            .then(response => {
                // Handle the successful response
                successNofi('Add a new shipper successful')
                getShipperData()
            }
            )
            .catch(error => {
                // Handle the error
                console.log(error)
                failNofi('Some field were wrong, please try again')

            });
        setIsModalOpen(false)
    };

    const editShipper = () => {

        // const data = {
        //     "userId": 14,
        //     "firstName": "string",
        //     "lastName": "string",
        //     "phoneNumber": "string",
        //     "password": "string",
        //     "address": "string",
        //     "gender": "string",
        //     // "birthday": "2023-11-05T07:31:32.534Z"
        // }
        console.log('edit data: ', edittingShipper)
        axios.put(`https://localhost:7195/api/User/${edittingShipper.userId}`, edittingShipper)
            .then(response => {
                // Handle the successful response
                getShipperData()
                console.log(response.data);
                successNofi('Update shipper successfully')
                // setServiceData(getService)

            }
            )
            .catch(error => {
                // Handle the error
                console.log(error);
                failNofi('Something was wrong, please try again')
            });
    };
    const handleCancel = () => {
        setIsModalOpen(false)
    };
    const handleChange = (value) => {
        setAddShipperData((pre) => {
            return { ...pre, gender: value };
        });
        console.log(`selected ${value}`, addShipperData);
    };
    const handleChangeUpdate = (value) => {
        setedittingShipper((pre) => {
            return { ...pre, gender: value };
        });
        console.log(`selected ${value}`);
    };
    const searchByName = () => {
        // Make the GET request.
        axios
            .get(`https://localhost:7195/api/service?$filter=contains(ServiceName, '${search}')`)
            .then((response) => {
                // Handle the response.
                // setServiceData(response.data)
                console.log(response.data)

            })
            .catch((error) => {
                console.log("local", localStorage.getItem("Token"))

            });
    }
    const onChangeDate = (date, dateString) => {
        setAddShipperData((pre) => {
            return { ...pre, birthday: dateString };
        });
    };
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
                        <h3>Shipper Manage</h3>
                        {contextHolder}
                        <div className='search'>
                            <Row>
                                <Col span={10}>
                                    <Button type="primary" onClick={showModal} style={{ backgroundColor: '#6AB8FF' }}>
                                        Add a shipper
                                    </Button>
                                    <Modal title="Create a shipper" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                        footer={[
                                            <Button type="primary" onClick={handleOk}>
                                                Submit
                                            </Button>,
                                        ]}>
                                        <p>First Name</p>
                                        <Input type='text'
                                            value={addShipperData?.firstName}
                                            onChange={(e) => {
                                                setAddShipperData((pre) => {
                                                    return { ...pre, firstName: e.target.value };
                                                });
                                            }} />
                                        <p>Last Name</p>
                                        <Input type='text'
                                            value={addShipperData?.lastName}
                                            onChange={(e) => {
                                                setAddShipperData((pre) => {
                                                    return { ...pre, lastName: e.target.value };
                                                });
                                            }} />


                                        <p>Phone Number</p>
                                        <Input type='text'
                                            value={addShipperData?.phoneNumber}
                                            onChange={(e) => {
                                                setAddShipperData((pre) => {
                                                    return { ...pre, phoneNumber: e.target.value };
                                                });
                                            }} />
                                        <p>Email</p>
                                        <Input type='text'
                                            value={addShipperData?.email}
                                            onChange={(e) => {
                                                setAddShipperData((pre) => {
                                                    return { ...pre, email: e.target.value };
                                                });
                                            }} />
                                        <p>Password</p>
                                        <Input type='password'
                                            value={addShipperData?.password}
                                            onChange={(e) => {
                                                setAddShipperData((pre) => {
                                                    return { ...pre, password: e.target.value };
                                                });
                                            }} />
                                        <p>Address</p>
                                        <Input type='text'
                                            value={addShipperData?.address}
                                            onChange={(e) => {
                                                setAddShipperData((pre) => {
                                                    return { ...pre, address: e.target.value };
                                                });
                                            }} />
                                        <p>Gender</p>
                                        <Select
                                            defaultValue={addShipperData?.gender}
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
                                        <DatePicker style={{ margin: '10px', fontSize: '16px' }} value={dayjs(addShipperData?.birthday)} onChange={onChangeDate} /> <br />
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
                            dataSource={shipperData}
                        />
                        <Modal
                            title="Edit Shipper"
                            visible={isEditing}
                            okText="Save"
                            onCancel={() => {
                                resetEditing();
                            }}
                            onOk={() => {
                                editShipper();
                                resetEditing();
                                console.log(edittingShipper)
                            }}
                        >
                            <p>First Name</p>
                            <Input
                                value={edittingShipper?.firstName}
                                onChange={(e) => {
                                    setedittingShipper((pre) => {
                                        return { ...pre, firstName: e.target.value };
                                    });
                                }}
                            />
                            <p>Last Name</p>
                            <Input
                                value={edittingShipper?.lastName}
                                onChange={(e) => {
                                    setedittingShipper((pre) => {
                                        return { ...pre, lastName: e.target.value };
                                    });
                                }}
                            />
                            <p>Phone Number</p>
                            <Input
                                value={edittingShipper?.phoneNumber}
                                onChange={(e) => {
                                    setedittingShipper((pre) => {
                                        return { ...pre, phoneNumber: e.target.value };
                                    });
                                }}
                            />
                            {/* <p>Clother Type</p>
                            <Select
                                defaultValue={edittingShipper?.clothesTypeId}
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
                                value={edittingShipper?.address}
                                onChange={(e) => {
                                    setedittingShipper((pre) => {
                                        return { ...pre, address: e.target.value };
                                    });
                                }}
                            />
                            <p>Gender</p>
                            <Select
                                defaultValue={edittingShipper?.gender}
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
                                value={edittingShipper?.password}
                                onChange={(e) => {
                                    setedittingShipper((pre) => {
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

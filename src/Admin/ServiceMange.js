import React, { Component, useState } from 'react'
import { Col, Row, Table, Input, Modal, Button, Select, Space } from 'antd'
import AdminNav from './AdminNav';
import { useEffect } from 'react';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TOKEN = localStorage.getItem("Token")

const { Search } = Input;
// const onSearch = (value, _e, info) => console.log(info?.source, ':', value);



export default function ServiceManage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [serviceData, setServiceData] = useState([])
    const [serviceId, setServiceId] = useState()
    const [serviceName, setServiceName] = useState()
    const [description, setDescription] = useState()
    const [feePerUnitKg, setFeePerUnitKg] = useState()
    const [clothesTypeId, setClothesTypeId] = useState(1)
    const [image, setImage] = useState()
    const [isEditing, setIsEditing] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [search, setSearch] = useState()

    const bearer_token = `Bearer ${localStorage.getItem('Token')}`;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price (vnd)',
            dataIndex: 'feePerUnitKg',
            key: 'feePerUnitKg',
        },
        {
            title: 'Clothes Type',
            dataIndex: 'clothesTypeName',
            key: 'clothesTypeName',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (record) => <div>
                <EditOutlined
                    onClick={() => { editServiceModal(record); }}
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
    ];
    useEffect(() => {
        setServiceData(getService)
    }, []);

    const getService = () => {
        const headers = {
            Authorization: bearer_token
        };
        // Make the GET request.
        axios
            .get('https://localhost:7195/api/Service', { headers })
            .then((response) => {
                // Handle the response.
                setServiceData(response.data)
                console.log(response.data)

            })
            .catch((error) => {
                console.log("local", localStorage.getItem("Token"))

            });
    }
    //UPDATE

    const editServiceModal = (record) => {
        // setStoreId([record.id])
        console.log(record.serviceId)
        // console.log(storeId)
        setIsEditing(true);
        setEditingService({ ...record })
    }
    const resetEditing = () => {
        setIsEditing(false);
        setEditingService(null);
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

        const data = {
            "serviceName": serviceName,
            "description": description,
            "feePerUnitKg": feePerUnitKg,
            "clothesTypeId": clothesTypeId,
            "status": "",
            "image": image
        }
        // };
        // const headers = {
        //     Authorization: bearer_token
        // };
        // console.log("headed", headers)
        // console.log("check token: ", bearer_token)
        // axios.post('https://localhost:7195/api/Service/createservice', { headers,'Content-Type': 'application/json',
        // 'accept': '*/*' }, { data })
        //     .then((response) => {
        //         // Handle the response.
        //         // setServiceData(response.data)
        //         console.log(response.data)

        //     })
        //     .catch((error) => {
        //         console.log("local", error)
        //         console.log("local", bearer_token)



        //     });
        axios.post('https://localhost:7195/api/Service/createservice', data, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                Authorization: bearer_token
            },
        })
            .then(response => {
                // Handle the successful response
                console.log(response.data);
                // setServiceData(getService)

            }
            )
            .catch(error => {
                // Handle the error
                console.log(error);
            });
        setIsModalOpen(false)
    };
    const editService = () => {

        const data = {
            "serviceId": 17,
            "serviceName": "giat nhanh cham",
            "description": "giat sieu cham",
            "feePerUnitKg": 10000,
            "clothesTypeId": 1,
            "status": "active",
            "image": "aaaa"
        }
        // };
        // const headers = {
        //     Authorization: bearer_token
        // };
        // console.log("headed", headers)
        // console.log("check token: ", bearer_token)
        // axios.post('https://localhost:7195/api/Service/createservice', { headers,'Content-Type': 'application/json',
        // 'accept': '*/*' }, { data })
        //     .then((response) => {
        //         // Handle the response.
        //         // setServiceData(response.data)
        //         console.log(response.data)

        //     })
        //     .catch((error) => {
        //         console.log("local", error)
        //         console.log("local", bearer_token)



        //     });
        axios.put('https://localhost:7195/updateservice', editingService, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                Authorization: bearer_token
            },
        })
            .then(response => {
                // Handle the successful response
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
        setClothesTypeId(value)
        console.log(`selected ${value}`);
    };
    const handleChangeUpdate = (value) => {
        setEditingService((pre) => {
            return { ...pre, clothesTypeId: value };
        });
        console.log(`selected ${value}`);
    };
    const searchByName = () => {
        const headers = {
            Authorization: bearer_token,
            // 'Content-Type': 'application/json',
            //     'accept': '*/*',
        };
        // Make the GET request.
        axios
            .get(`https://localhost:7195/api/service?$filter=contains(ServiceName, '${search}')`, { headers })
            .then((response) => {
                // Handle the response.
                setServiceData(response.data)
                console.log(response.data)

            })
            .catch((error) => {
                console.log("local", localStorage.getItem("Token"))

            });
    }
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
                                    <Button type="primary" onClick={showModal} style={{ backgroundColor: '#6AB8FF' }}>
                                        Add a service
                                    </Button>
                                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                        footer={[
                                            <Button type="primary" onClick={handleOk}>
                                                Submit
                                            </Button>,
                                        ]}>
                                        <p>Service Name</p><Input type='text' value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                                        <p>Description</p><Input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                                        <p>Fee</p><Input type='text' name='email' value={feePerUnitKg} onChange={(e) => setFeePerUnitKg(e.target.value)} />
                                        <p>clothesTypeId</p>
                                        <Select
                                            defaultValue="1"
                                            style={{
                                                width: 300,
                                            }}
                                            onChange={handleChange}
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
                                        />
                                        <p>Image Url</p><Input type='text' value={image} onChange={(e) => setImage(e.target.value)} />

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
                                                <Input defaultValue="Combine input and button" placeholder="Search a service by name" value={search} onChange={(e) => setSearch(e.target.value)} />
                                                <Button type="primary" onClick={searchByName}>Search</Button>
                                            </Space.Compact></Space>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                        <Table
                            columns={columns}
                            dataSource={serviceData}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <p
                                        style={{
                                            marginLeft: '5%',
                                        }}
                                    >
                                        {record.name + ': ' + record.description}
                                    </p>
                                )
                            }}
                        />
                        <Modal
                            title="Edit Student"
                            visible={isEditing}
                            okText="Save"
                            onCancel={() => {
                                resetEditing();
                            }}
                            onOk={() => {
                                editService();
                                resetEditing();
                                console.log(editingService)
                            }}
                        >
                            <p>Service Name</p>
                            <Input
                                value={editingService?.serviceName}
                                onChange={(e) => {
                                    setEditingService((pre) => {
                                        return { ...pre, serviceName: e.target.value };
                                    });
                                }}
                            />
                            <p>Description</p>
                            <Input
                                value={editingService?.description}
                                onChange={(e) => {
                                    setEditingService((pre) => {
                                        return { ...pre, description: e.target.value };
                                    });
                                }}
                            />
                            <p>Fee</p>
                            <Input
                                value={editingService?.feePerUnitKg}
                                onChange={(e) => {
                                    setEditingService((pre) => {
                                        return { ...pre, feePerUnitKg: e.target.value };
                                    });
                                }}
                            />
                            <p>Clother Type</p>
                            {/* <Input
                                value={editingService?.feePerUnitKg}
                                onChange={(e) => {
                                    setEditingService((pre) => {
                                        return { ...pre, feePerUnitKg: e.target.value };
                                    });
                                }}
                            /> */}
                            <Select
                                defaultValue={editingService?.clothesTypeId}
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
                            />
                            {/* <p>Image</p>
                        <Input
                            value={editingService?.image}
                            onChange={(e) => {
                                setEditingService((pre) => {
                                    return { ...pre, image: e.target.value };
                                });
                            }}
                        /> */}
                        </Modal>
                    </div>
                </Col>
            </Row>
        </div>
    )

}

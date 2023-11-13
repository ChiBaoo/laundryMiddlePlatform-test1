import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Button, message, Modal } from 'antd'
import { AlertOutlined, FormOutlined, ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';


export default function StoreOrder() {
    const [storeData, setStoreData] = useState([])
    const [serviceName, setServiceName] = useState([])
    const [storeIdLocal, setStoreIdLocal] = useState()
    // const storeIdLocal = localStorage.getItem("storeId")
    const userIdLocal = localStorage.getItem("UserData")
    const [panelData, setPanelData] = useState([
        { value: 'NEW', panel: 'New Order', color: '#6AB8FF' },
        { value: 'ACCEPTED', panel: 'Accepted', color: '#A9A9A9' },
        { value: 'DELION', panel: 'Delivery On', color: '#A9A9A9' },
        { value: 'PROCESSING', panel: 'Store Processing', color: '#A9A9A9' },
        { value: 'FINISHED', panel: 'Finished Laundry', color: '#A9A9A9' },
        { value: 'DELIBACK', panel: 'Delivery Back', color: '#A9A9A9' },
        { value: 'COMPLETED', panel: 'Completed', color: '#A9A9A9' },
    ])
    const [messageApi, contextHolder] = message.useMessage();
    const [status, setStatus] = useState('NEW')

    const columns = [
        {
            title: 'Service Name',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Weight',
            dataIndex: 'weightKg',
            key: 'weightKg',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: '',
            dataIndex: 'status',
            key: 'status',
            render: () => <div hidden>
            </div>
        },
    ];
    const columnsAction = [
        {
            title: 'Service Name',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Weight',
            dataIndex: 'weightKg',
            key: 'weightKg',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => <div>
                {record.status === 'NEW' ? (
                    <div>
                        <Button type='primary' style={{ backgroundColor: '#6AB8FF' }} onClick={() => { updateOrderStatus(record) }}>Accept</Button>
                        <Button type='primary' style={{ marginLeft: '3%' }} onClick={() => { cancelOrder(record) }} danger >Cancel</Button>

                    </div>
                ) : record.status === 'PROCESSING' ? (
                    <div>
                        <Button type='primary' style={{ backgroundColor: '#6AB8FF' }} onClick={() => { updateOrderStatus(record) }}>Finish</Button>

                    </div>
                ) : (
                    <div>

                    </div>
                )}
            </div>
        },
        {
            title: '',
            dataIndex: 'status',
            key: 'status',
            render: () => <div hidden>
            </div>
        },
    ];
    useEffect(() => {
        getOrder()
        console.log('data', storeData)
    }, [storeIdLocal]);

    //UPDATE STATUS FOR EACH STATUS STATE
    const updateOrderStatus = (record) => {
        const status = record.status
        if (status === 'NEW') {
            const acceptOrderData = {
                "orderId": record.orderId,
                "userId": record.userId,
                "storeId": parseInt(storeIdLocal),
                "serviceId": record.serviceId
            }
            console.log('accept: ', acceptOrderData)
            axios
                .patch(`https://localhost:7195/api/Order/acceptorder/${record.orderId}`, acceptOrderData)
                .then((response) => {
                    // Handle the response.
                    getOrder()
                    successNofi('Accept order successfully')
                    console.log(response.data)

                })
                .catch((error) => {
                    console.log("err", error)
                    failNofi(error.response.data)
                });
        } else if (status === 'PROCESSING') {
            axios
                .patch(`https://localhost:7195/api/Order/finishorder/${record.orderId}?storeId=${storeIdLocal}`)
                .then((response) => {
                    // Handle the response.
                    getOrder()
                    console.log(response.data)
                    successNofi('Finish order successfully')

                })
                .catch((error) => {
                    console.log("err", error)
                    failNofi(error.response.data)
                });
            console.log('status', 'hoho')
        }
        console.log(record)
    }
    const cancelOrder = (record) => {

        const cancelOrderData = {
            "orderId": record.orderId,
            "userId": record.userId,
            "storeId": parseInt(storeIdLocal),
            "serviceId": record.serviceId
        }
        console.log('accept: ', cancelOrderData)

        Modal.confirm({
            title: "Are you sure, you want to cancel this order?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                axios
                    .patch(`https://localhost:7195/api/Order/StoreCancelOrder/${record.orderId}`, cancelOrderData)
                    .then((response) => {
                        // Handle the response.
                        getOrder()
                        successNofi(response.data)
                        console.log(response.data)

                    })
                    .catch((error) => {
                        console.log("err", error)
                        failNofi(error.response.data)
                    });
            },
        });
    }
    //GET STORE ID
    const getStoreId = () => {
        axios
            .get(`https://localhost:7195/api/Store?$filter=userId eq ${userIdLocal}`)
            .then((response) => {
                // Handle the response.
                const array = response.data
                var storeId = array[0].storeId;
                localStorage.setItem("StoreId", storeId)
                setStoreIdLocal(storeId)
                console.log('check store id state', storeIdLocal)
            })
            .catch((error) => {
                console.log('err', error)

            });
    }
    //GET ORDER
    const getOrder = async () => {
        // Make the GET request.
        getStoreId()
        console.log('store id: ', typeof (parseInt(localStorage.getItem("StoreId"))), parseInt(localStorage.getItem("StoreId")))
        await axios
            .get(`https://localhost:7195/api/Order/StoreOrders/${parseInt(localStorage.getItem("StoreId"))}?$filter=status eq 'NEW'`)
            .then((response) => {
                // Handle the response.
                setStoreData(response.data)
                console.log('get order', response.data)
            })
            .catch((error) => {
                console.log('err', error)

            });
    }
    const getServiceName = (serviceId) => {
        for (let i = 0; i < serviceId.length; i++) {
            console.log('service id api', serviceId[i].serviceId)
            axios
                .get(`https://localhost:7195/api/Service/${serviceId[i].serviceId}`)
                .then((response) => {
                    // Handle the response.
                    console.log('service id ', response.data.serviceId)
                    setStoreData(storeData.map(storeData => {
                        if (storeData.serviceId === serviceId[i].serviceId) {
                            // Create a *new* object with changes
                            console.log('suitable')
                            //   return { ...storeData, serviceName: response.data.serviceName };
                        } else {
                            // No changes
                            return storeData;
                        }
                    }));
                })
                .catch((error) => {
                    console.log('err', error)
                });
        }
    }
    //HANDLE CHANGE BY STATUS
    const HandleChange = (event) => {
        const statusData = event.target.getAttribute("value")
        setStatus(event.target.getAttribute("value"))
        axios
            .get(`https://localhost:7195/api/Order/StoreOrders/${storeIdLocal}?$filter=status eq '${statusData}'`)
            .then((response) => {
                // Handle the response.
                setStoreData(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error.response.data)
            });
        handleChangeColor(event.target.getAttribute("value"))
        console.log(event.target.getAttribute("value"), status)
    }
    const handleChangeColor = (value) => {
        const nextState = panelData.map(panel => {
            if (panel.value == value) {
                return {
                    ...panel,
                    color: '#6AB8FF',
                };
            } else {
                return {
                    ...panel,
                    color: '#A9A9A9',
                };
            }
        });
        setPanelData(nextState);
    }
    const successNofi = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
            style: {
                marginLeft: '80%',
                marginTop: '5%',
            },
        })
    }
    const failNofi = (message) => {
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
        <div className='Store-Order'>
            <Row>
                <Col span={4}>
                    <div className=''>
                        <Link to='/store-order'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> Order</Link> <br />
                        <Link to='/store-service'><ShopOutlined style={{ fontSize: '30px', margin: '5%', }} /> Service</Link> <br />
                        <Link to='/store-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Store Profile</Link> <br />
                        <Link to='/store-owner-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Store Owner Profile</Link> <br />
                    </div>
                </Col>
                <Col span={20}>
                    {contextHolder}
                    <div className='deliveries-list'>
                        {panelData.map((panel) => (
                            <a>
                                <a style={{ margin: '1%', fontSize: '16px', marginRight: '1%', color: panel.color }} value={panel.value} onClick={HandleChange}>{panel.panel}</a>
                            </a>
                        ))}

                        {status === 'NEW' || status === 'PROCESSING' ? (
                            <div>
                                <Table
                                    columns={columnsAction}
                                    dataSource={storeData}
                                    style={{ margin: '3%', marginRight: '-10%' }}
                                />
                            </div>
                        ) : (
                            <div>
                                <Table
                                    columns={columns}
                                    dataSource={storeData}
                                    style={{ margin: '3%', marginRight: '-10%' }}
                                />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

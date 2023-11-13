import { Button, Descriptions, Modal, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function OrderDetail() {
    const userId = localStorage.getItem("UserData")
    const serviceId = localStorage.getItem("serviceId")
    const weightKg = localStorage.getItem("weight")
    const storeId = localStorage.getItem("storeId")
    const [orderData, setOrderData] = useState({
        "userId": userId,
        "serviceId": serviceId,
        "weightKg": weightKg,
        status: "active"
    })
    const [viewOrder, setViewOrder] = useState({
        weight: localStorage.getItem("weight"),
    })
    const [distance, setDistance] = useState()
    const [shippingFee, setShippingFee] = useState()
    const [total, setTotal] = useState()
    const [messageApi, contextHolder] = message.useMessage();


    // const shippingFee = 3000*3*Math.round(distance)
    // const total = orderData.weightKg * localStorage.getItem("serviceFee") + shippingFee
    const navigate = useNavigate();

    useEffect(() => {
        console.log("order detail data: ", orderData)
        setOrderData((prevState) => ({
            ...prevState,
            totalAmount: total
        }));
        console.log('store and user', storeId, userId)
        getTotal()
        gerServiceId()
        getStoreId()


    }, [distance, shippingFee, total])
    const getDistance = () => {
        console.log('user, store', userId, storeId)
        axios
            .get(`https://localhost:7195/api/Order/getdistance?userId=${userId}&storeId=${storeId}`)
            .then((response) => {
                // Handle the response.
                console.log('distance: ', response.data)
                setDistance(response.data)
            })
            .catch((error) => {
                console.log("err", error)
            });

    }
    const getStoreId = () => {
        axios
            .get(`https://localhost:7195/api/Store/${storeId}`)
            .then((response) => {
                // Handle the response.
                setViewOrder((prevState) => ({
                    ...prevState,
                    storeName: response.data.storeName
                }));
            })
            .catch((error) => {
                console.log("err", error)
            });
    }
    const gerServiceId = () => {
        axios
            .get(`https://localhost:7195/api/Service/${localStorage.getItem("serviceId")}`)
            .then((response) => {
                // Handle the response.
                setViewOrder((prevState) => ({
                    ...prevState,
                    serviceName: response.data.serviceName,
                    clothesTypeName: response.data.clothesTypeName
                }));
            })
            .catch((error) => {
                console.log("err", error)

            });
    }
    const getTotal = () => {
        getDistance()
        setShippingFee(3000 * 3 * Math.round(distance))
        setTotal(orderData.weightKg * localStorage.getItem("serviceFee") + shippingFee)
        console.log('shipping fee: ', shippingFee)
        console.log('total: ', total)
    }
    const createOrder = () => {
        Modal.confirm({
            title: "Do you want to create this order",
            okText: "Yes",
            onOk: () => {
                axios.post(`https://localhost:7195/api/Order/createorder/${storeId}`, orderData)
                    .then(response => {
                        // Handle the successful response
                        console.log(response.data);
                        successNofi('Create order successfully')
                        navigate('/user-order')
                    }
                    )
                    .catch(error => {
                        // Handle the error
                        console.log(error);
                        failNofi(error.response.data)
                    });
            },
        });
        console.log('order data: ', orderData)

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
        <div style={{ margin: '7%' }}>
                
                <Descriptions
                    contentStyle={{ fontSize: '16px' }}
                    labelStyle={{ fontSize: '16px' }}
                    title="Order Detail"
                    items={[
                        {
                            key: '1',
                            label: 'Service Name',
                            children: viewOrder.serviceName,
                        },
                        {
                            key: '1',
                            span: 2,
                            label: 'Clothes Type',
                            children: viewOrder.clothesTypeName,
                        },
                        {
                            key: '1',
                            label: 'Weight',
                            children: `${viewOrder.weight} Kg`,
                        },
                        {
                            key: '1',
                            span: 2,
                            label: 'Fee fer unit',
                            children: `${localStorage.getItem("serviceFee")} Vnd/Kg`,
                        },
                        {
                            key: '1',
                            label: 'Distance',
                            children: `${Math.round(distance)} Km`,
                        },
                        {
                            key: '1',
                            label: 'Shipping Fee(3000 Vnd/km)',
                            children: `${shippingFee} Vnd`,
                        },
                        {
                            key: '1',
                            label: 'Total',
                            children: `${orderData.totalAmount} Vnd`,
                        },
                    ]} />

            <Button type='primary' onClick={createOrder} style={{ marginLeft: '70%', marginTop: '10px' }}>Create an order</Button>
        </div>
    )
}

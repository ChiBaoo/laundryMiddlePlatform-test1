import React, { useEffect, useState } from 'react'
import { Service } from './ServiceData'
import laundryImg from '../assets/th.jpg'
import { Col, Row, InputNumber, Card, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Paragraph, Text } = Typography;
const bearer_token = `Bearer ${localStorage.getItem('Token')}`;
const serviceId = localStorage.getItem("serviceId")
export default function ServiceDetail() {
    const [serviceData, setServiceData] = useState({})
    const [serviceDetailList, setServiceDetailList] = useState([])
    const [weight, setWeigt] = useState(1)
    useEffect(() => {
        getService()
        console.log('data effect', localStorage.getItem("serviceId"))
    }, []);

    const getService = () => {
        const headers = {
            Authorization: bearer_token
        };
        // Make the GET request.
        axios
            .get(`https://localhost:7195/api/Service/${localStorage.getItem("serviceId")}`, { headers })
            .then((response) => {
                // Handle the response.
                setServiceData(response.data)
                setServiceDetailList(response.data.priceOfStores)
                console.log('data get from api', response.data.priceOfStores)
                console.log('service detail list', serviceDetailList)
                // console.log('data service', serviceData)
                // console.log('data service fake', Service)


            })
            .catch((error) => {
                console.log("local", localStorage.getItem("Token"))

            });
    }
    const orderData = {
        "userId": localStorage.getItem("UserData"),
        "serviceId": serviceId,
        "weightKg": weight,
        "totalAmount": 40
    }
    const getData = () => {
        console.log('order data', orderData)
    }

    const makeOrder = () => {
        localStorage.setItem("weight", weight)

    }
    const handleChangeWeight = (value) => {
        setWeigt(value);
        console.log(`selected ${value}`);
    };
    return (
        <div className='Service-detail'>
            <div>
                <Row>
                    <Col span={12}>
                        <img style={{ width: '400px', margin: '10%', marginLeft: '30%' }} src={laundryImg} />
                    </Col>
                    <Col span={12}>
                        <div style={{ margin: '10%', fontSize: '15px' }}>
                            <p style={{ fontSize: '30px', color: '#39A7FF' }}>{serviceData.serviceName}</p>
                            <p style={{ fontSize: '20px', color: '#87C4FF' }}>Description</p>
                            <p style={{ fontSize: '17px', color: '#A9A9A9', marginLeft: '5%' }}>{serviceData.description}</p>
                            <p>{serviceData.feePerUnitKg}</p>
                            <p style={{ fontSize: '20px', color: '#87C4FF', }}>Weight</p><InputNumber name='weight' min={1} max={20} defaultValue={1} onChange={handleChangeWeight}></InputNumber><br />
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                <h3 style={{ marginLeft: '5%', color: '#FF6A6A' }}>Relative service</h3>
                <div>
                    {serviceDetailList.length === 0 ? (
                        <div>
                            <h6>There is no store support this service</h6>
                        </div>
                    ) : (
                        <Row style={{ marginLeft: '10%' }}>

                            {serviceDetailList.map((service) => (
                                <Col span={8}>
                                    <Card style={{
                                        width: 330,
                                    }}>
                                        <img src={laundryImg} />
                                        <Text type="secondary" style={{fontSize: '22px', margin: '2%', }}>{service.storeName}</Text>
                                        <Paragraph style={{fontSize: '18px', margin: '2%' }}>
                                            {service.feePerUnitKg} vnd/kg
                                        </Paragraph>
                                        <Button style={{ margin: '2%' }} type='primary' onClick={() => {
                                            localStorage.setItem("storeId", service.storeId)
                                            localStorage.setItem("serviceFee", service.feePerUnitKg)
                                            localStorage.setItem("weight", weight)
                                        }}><Link to='/order-detail'>Use Service</Link></Button>

                                    </Card>
                                </Col>
                            ))}
                        </Row>

                    )}
                </div>

            </div>

        </div>
    )
}


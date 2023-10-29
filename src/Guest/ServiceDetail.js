import React, { Component } from 'react'

import { Service } from './ServiceData'
import laundryImg from '../assets/th.jpg'
import { Col, Row, InputNumber, Card, Button } from 'antd';
import { Link } from 'react-router-dom';



export default class ServiceDetail extends Component {
    render() {
        return (
            <div className='Service-detail'>
                <div>
                    <Row>
                        <Col span={12}>
                            <img style={{ width: '400px', margin: '10%', marginLeft: '30%' }} src={laundryImg} />
                        </Col>
                        <Col span={12}>
                            <div style={{ margin: '10%', fontSize: '15px' }}>
                                <h1>Service Name</h1>
                                <p>Service Description</p>
                                <p>Service Price</p>
                                <p>Service Rating</p>
                                <p>Service used</p>
                                <p>weight </p><InputNumber name='weight' min={1} max={20} defaultValue={3}></InputNumber><br />
                                <Button style={{ margin: '5%' }} type='primary'>Add to cart</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <h3 style={{ marginLeft: '5%', color: '#FF6A6A' }}>Relative service</h3>
                    <Row style={{ marginLeft: '10%' }}>
                        {Service.map((service) => (
                            <Col span={8}>
                                <Card style={{
                                    width: 330,
                                }}>
                                    <img src={laundryImg} />
                                    <h3>{service.name}</h3>
                                    <p>{service.price}</p>
                                    <p>{service.rating}</p>
                                    <Link to='/service-detail'>Detail</Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

            </div>
        )
    }
}

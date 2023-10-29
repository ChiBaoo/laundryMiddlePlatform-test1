import React, { Component } from 'react'
import { Col, Row } from 'antd';
import {
    Button,
    Form,
    Input,
    Checkbox
} from 'antd';
import laudryImage from '../assets/image1.jpg'
import { Link } from 'react-router-dom';


export default class SignIn extends Component {
    render() {

        return (
            <div className='Sign-In'>
                <div className='header'>
                    <Row>
                        <Col span={24}>Laundry middle flatform</Col>
                    </Row>
                </div>

                <Row>
                    <Col span={7}>
                        <div>
                            <h1>Sign Up to Use Our Service</h1>
                        </div>
                        <div>
                            <h6>If you don't have an account you can <Link to='/sign-up'>sign up here</Link></h6>
                        </div>
                    </Col>
                    <Col span={7}>
                        <img src={laudryImage} style={{ width: '400px', }} />
                    </Col>
                    <div className='form'>
                    <Col span={9}>
                        <h1>Welcome</h1>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 2,
                                    span: 16,
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 6,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 6,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" style={{backgroundColor: 'red'}}>
                                    Sign in with Google
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    </div>
                    
                </Row>
            </div>
        )
    }
}


import React, { useState } from 'react'
import { Col, Row } from 'antd';
import { Button, Form, Input, message } from 'antd';
import laudryImage from '../assets/image1.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const Login = async () => {
        const jsonData = {
            email: email,
            password: password,
        };
        console.log(email, password)

        axios.post('https://localhost:7195/api/User/Login', jsonData)
            .then(response => {
                // Handle the successful response
                console.log(response)
                successNofi('Login successfully')
                if (response.data.roleId === 1) {
                    setTimeout(() => navigate('/admin', 3000))
                    localStorage.setItem("UserData", response.data.userId)
                    localStorage.setItem("Role", response.data.roleId)
                    console.log(response.data)
                }
                else if (response.data.roleId === 2) {
                    navigate('/store-order')
                    // localStorage.setItem("Token", response.data.token)
                    localStorage.setItem("UserData", response.data.userId)
                    localStorage.setItem("Role", response.data.roleId)
                    console.log(response.data)
                }
                else if (response.data.roleId === 3) {
                    navigate('/shipper-delivery')
                    // localStorage.setItem("Token", response.data.token)
                    localStorage.setItem("UserData", response.data.userId)
                    localStorage.setItem("Role", response.data.roleId)

                    console.log(response.data)

                } else if (response.data.roleId === 4) {
                    navigate('/search-service')
                    // localStorage.setItem("Token", response.data.token)
                    localStorage.setItem("UserData", response.data.userId)
                    localStorage.setItem("Role", response.data.roleId)
                    // console.log(response.data)
                } else {
                    navigate('/home')
                }
                
                return response
            })
            .catch(error => {
                // Handle the error
                console.log(error);
                failNofi('Some field was wrong, please try again')
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
        <div className='Sign-In'>
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
                <Col span={9}>
                    <div className='form'>
                        {contextHolder}
                        <h1>Welcome</h1>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
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
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>

                            {/* <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 2,
                                    span: 16,
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item> */}

                            <Form.Item
                                wrapperCol={{
                                    offset: 6,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" onClick={Login}>
                                    Submit
                                </Button>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 6,
                                    span: 16,
                                }}
                            >
                            </Form.Item>
                        </Form>
                    </div>

                </Col>

            </Row>
        </div>
    )
}


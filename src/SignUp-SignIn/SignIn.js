import React, { Component, useState } from 'react'
import { Col, Row } from 'antd';
import { Button, Form, Input, Checkbox} from 'antd';
import laudryImage from '../assets/image1.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn(){
    const [email, setEmail] = useState()
    const [password, setPassword] =useState()
    const navigate = useNavigate();
    
    const Login = async () => {
        const jsonData = {
            email: email,
            password: password,
          };
        console.log(email, password)
          
          axios.post('https://localhost:7195/api/User/LoginToken', jsonData, {
            headers: {
              'Content-Type': 'application/json',
              'accept': '*/*'
            },
          })
            .then(response => {
              // Handle the successful response
              console.log(response)
              if(response.data.roleId ===4){
                navigate('/user')
                
                localStorage.setItem("Token", response.data)
                console.log(response.data)
              }
            else
            navigate('/role2')
            localStorage.setItem("Token", response.data)
            console.log(response.data)

              return response
            })
            .catch(error => {
              // Handle the error
              console.log(error);
            });
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
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
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
                                    <Input.Password  value={password} onChange={(e) => setPassword(e.target.value)}/>
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


import React, { useState } from 'react'
import { Col, Row, Form, Input, Button } from 'antd';
import laudryImage from '../assets/image1.jpg'
import { type } from '@testing-library/user-event/dist/type';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: ''
  })
  const navigate = useNavigate();

  const Register = () => {
    // setUserData({
    //   firstName: 'tien son',
    //   lastName: 'nguyen',
    //   email: 'tienson@gmail.com',
    //   phoneNumber: '0543216789',
    //   address: 'quan1',
    //   password: '123456'
    // })
    console.log(userData)

    axios.post('https://localhost:7195/api/User/Register', userData, {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      },
    })
      .then(response => {
        // Handle the successful response
        console.log(response.data);
        if(response.data==='Sign Up successfully!')
        navigate('/sign-in')
      }
      )
      .catch(error => {
        // Handle the error
        console.log(error);
      });
  }
  return (
    <div className='Sign-Up'>
      <div className='body'>
        <Row>
          <Col span={12}>
            <img src={laudryImage} style={{ width: '400px', marginLeft: '50px' }} />
          </Col>
          <Col span={12}>
            <Form
              name="nest-messages"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
            >
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder='First Name' value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder='Last Name' value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    type: 'string',
                    min: 10,
                    max: 11
                  },
                ]}
              >
                <Input placeholder='Phone Number' value={userData.phoneNumber} onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                  },
                ]}
              >
                <Input placeholder='Email' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                  type = 'password'
                ]}
              >
                <Input.Password value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder='Address' value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
              </Form.Item>

              <Form.Item

              >
                <Button type="primary" htmlType="submit" onClick={Register}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

    </div>
  )
}

export default SignUp
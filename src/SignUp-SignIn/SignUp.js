import React, { Component } from 'react'
import { Col, Row, Form, Input, InputNumber, Button } from 'antd';
import laudryImage from '../assets/image1.jpg'
import Password from 'antd/es/input/Password';
import { type } from '@testing-library/user-event/dist/type';

class SignUp extends Component {
  render() {
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
                  <Input placeholder='First Name' />
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
                  <Input placeholder='Last Name' />
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
                  <Input placeholder='Phone Number' />
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
                  <Input placeholder='Email' />
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
                  <Input.Password />

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
                  <Input placeholder='Address' />
                </Form.Item>



                <Form.Item

                >
                  <Button type="primary" htmlType="submit">
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
}

export default SignUp
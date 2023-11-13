import React, { useState } from 'react'
import { Col, Row, Button, Typography, message } from 'antd';
import ShipperImage from '../assets/shipper.jpg'
import { AlertOutlined, FormOutlined, ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const { Paragraph, Text, Title } = Typography;

const StoreProfile = () => {
  const [storeName, setStoreName] = useState()
  const [description, setDescription] = useState()
  const [address, setAddress] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getStore()
  }, []);

  const getStore = () => {
    // Make the GET request.
    axios
      .get(`https://localhost:7195/api/Store/${localStorage.getItem('StoreId')}`)
      .then((response) => {
        // Handle the response.
        setStoreName(response.data.storeName)
        setDescription(response.data.description)
        setAddress(response.data.address)
        setPhoneNumber(response.data.phoneNumber)
        console.log(response.data)

      })
      .catch((error) => {
        console.log("local", localStorage.getItem("Token"))

      });
  }
  const changeProfile = () => {
    const data = {
      "storeId": localStorage.getItem("StoreId"),
      "storeName": storeName,
      "description": description,
      "address": address,
      "phoneNumber": phoneNumber,
      "userId": localStorage.getItem("UserData")
    }
    axios
      .put(`https://localhost:7195/api/Store/updatestore`, data)
      .then((response) => {
        // Handle the response.
        console.log(response.data)
        successNofi('Update profile successfully')

      })
      .catch((error) => {
        console.log('err', error)
        failNofi('Something was wrong, please try again')
        getStore()

      });
    console.log('data update', data)
    console.log('check api', typeof (localStorage.getItem("UserData")))
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
    <div className='Shipper-Profile'>
      <Row>
        <Col span={4}>
          <div className=''>
            <Link to='/store-order'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> Order</Link> <br />
            <Link to='/store-service'><ShopOutlined style={{ fontSize: '30px', margin: '5%', }} /> Service</Link> <br />
            <Link to='/store-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Store Profile</Link> <br />
            <Link to='/store-owner-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Store Owner Profile</Link> <br />
          </div>
        </Col>
        <Col span={8}>
        <Title level={3}>Store Profile</Title>
          <img src={ShipperImage} style={{ width: '400px', margin: '10%' }} />
        </Col>
        <Col span={12}>
          {contextHolder}
          <div className='profile-form'>
            <Text type="secondary">Store Name</Text>
            <Paragraph
              editable={{
                onChange: setStoreName,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {storeName}
            </Paragraph>
            <Text type="secondary">Description</Text>
            <Paragraph
              editable={{
                onChange: setDescription,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {description}
            </Paragraph>
            <Text type="secondary">address</Text>
            <Paragraph
              editable={{
                onChange: setAddress,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {address}
            </Paragraph>
            <Text type="secondary">Phone Number</Text>
            <Paragraph
              editable={{
                onChange: setPhoneNumber,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {phoneNumber}
            </Paragraph>
            
            
            <Button style={{ marginTop: '5%' }} type='primary' onClick={changeProfile}>Save</Button>
          </div>
        </Col>
      </Row>


    </div>
  )
}


export default StoreProfile
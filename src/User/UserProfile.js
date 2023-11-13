import React, { useState } from 'react'
import { Col, Row, Button, Typography, Modal, Input, Select, DatePicker, message } from 'antd';
import ShipperImage from '../assets/shipper.jpg'
import { AlertOutlined, FormOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const { Paragraph, Text } = Typography;

const StoreProfile = () => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [address, setAddress] = useState()
  const [gender, setGender] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [password, setPassword] = useState()
  const [birthday, setBirthday] = useState()
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState()
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getUser()
    console.log('data', userData)
  }, []);

  const getUser = () => {
    // Make the GET request.
    axios
      .get(`https://localhost:7195/api/User/${localStorage.getItem('UserData')}`)
      .then((response) => {
        // Handle the response.
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setAddress(response.data.address)
        setGender(response.data.gender)
        setPhoneNumber(response.data.phoneNumber)
        setPassword(response.data.password)
        setBirthday(response.data.birthday)
        console.log('birthday: ', response.data.birthday, dayjs(birthday))
        console.log(response.data)

      })
      .catch((error) => {
        console.log("local", localStorage.getItem("Token"))

      });
  }
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleChange = (value) => {
    setGender(value);
    console.log('gender: ', gender)
  };
  const changeProfile = () => {
    const data = {
      userId: localStorage.getItem("UserData"),
      firstName: firstName,
      lastName: lastName,
      address: address,
      gender: gender,
      phoneNumber: phoneNumber,
      password: password,
      birthday: birthday
    }
    axios
      .put(`https://localhost:7195/api/User/${localStorage.getItem("UserData")}`, data)
      .then((response) => {
        // Handle the response.
        console.log(response.data)
        successNofi('Update profile successfully')

      })
      .catch((error) => {
        failNofi('Some field was wrong, please try again')
      });
    console.log('data update', data)
    console.log('check api', typeof (localStorage.getItem("UserData")))
  }
  const onChangeDate = (date, dateString) => {
    setBirthday(dateString)
    console.log(birthday);
  };
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
          <div className='user-nav'>
            <Link to='/user-order'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> My Order</Link> <br />
            <Link to='/user-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Profile</Link> <br />
          </div>
        </Col>
        <Col span={8}>
          <img src={ShipperImage} style={{ width: '400px', margin: '10%' }} />
        </Col>
        <Col span={12}>
          {contextHolder}
          <div className='profile-form'>
            <Text type="secondary">First Name</Text>
            <Paragraph
              editable={{
                onChange: setFirstName,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {firstName}
            </Paragraph>
            <Text type="secondary">Last Name</Text>
            <Paragraph
              editable={{
                onChange: setLastName,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {lastName}
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
            <Text type="secondary">Gender</Text><br />
            <Select
              value={gender}
              style={{
                width: 300,
                margin: '10px', fontSize: '16px'
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'Male',
                  label: 'Male',
                },
                {
                  value: 'Female',
                  label: 'Female',
                },
                {
                  value: 'Other',
                  label: 'Other',
                }
              ]}
            /> <br />
            <Text type="secondary">Birthday</Text> <br />
            <DatePicker style={{ margin: '10px', fontSize: '16px' }} value={dayjs(birthday)} onChange={onChangeDate} /> <br />
            <a style={{ marginTop: '3px', fontSize: '16px' }} onClick={showModal}>
              Change password
            </a>
            <Modal
              open={open}
              title="Title"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Return
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                  Submit
                </Button>,
              ]}>
              <p>New password</p><Input.Password placeholder='*******' onChange={(e) => { setPassword(e.target.value); }}></Input.Password>
            </Modal> <br />
            <Button style={{ marginTop: '5%' }} type='primary' onClick={changeProfile}>Save</Button>
          </div>
        </Col>
      </Row>


    </div>
  )
}


export default StoreProfile
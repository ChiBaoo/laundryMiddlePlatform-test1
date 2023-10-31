import React, { useState } from 'react'
import { Col, Row, Button, Typography, Modal, Input } from 'antd';
import ShipperImage from '../assets/shipper.jpg'
import {AlertOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Paragraph, Text } = Typography;

const ShipperProfile = () => {
  const [shipperName, setShipperName] = useState('Shipper name');
  const [description, setDescription] = useState('Description')
  const [email, setEmail] = useState('ShipperEmail@gmail.com')
  const [phone, setPhone] = useState('0123456789')
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className='Shipper-Profile'>
      <Row>
        <Col span={4}>
          <div className='shipper-nav'>
            <Link to='/shipper-delivery'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> Deliveries List</Link> <br />
            <Link to='/shipper-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Profile</Link> <br />
          </div>
        </Col>
        <Col span={8}>
          <img src={ShipperImage} style={{ width: '400px', margin: '10%' }} />
        </Col>
        <Col span={12}>
          <div className='profile-form'>
            <Text type="secondary">Shipper name</Text>
            <Paragraph
              editable={{
                onChange: setShipperName,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {shipperName}
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
            <Text type="secondary">Email</Text>
            <Paragraph
              editable={{
                onChange: setEmail,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {email}
            </Paragraph>
            <Text type="secondary">Phone Number</Text>
            <Paragraph
              editable={{
                onChange: setPhone,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {phone}
            </Paragraph>
            <a style={{ marginTop: '3px', fontSize: '16px' }} onClick={showModal}>
              Change password
            </a> <br/>
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

              ]}
            >
              <p>Recent password</p><Input.Password placeholder='recent password'></Input.Password>
              <p>New password</p><Input.Password placeholder='new password'></Input.Password>
              <p>New password again</p><Input.Password placeholder='new password again'></Input.Password>
            </Modal>
            <Button style={{ marginTop: '5%'}} type='primary'>Save</Button>
          </div>
        </Col>
      </Row>


    </div>
  )
}


export default ShipperProfile
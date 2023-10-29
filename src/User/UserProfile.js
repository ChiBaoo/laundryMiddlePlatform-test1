import React, { useState } from 'react'
import { Col, Row, Button, Typography, Input, Modal } from 'antd';
import UserImage from '../assets/Golden-Retriever-10.jpg'
import { ShoppingCartOutlined, AlertOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Paragraph, Text } = Typography;

const StoreProfile = () => {
  const [userName, setUserName] = useState('User name');
  const [description, setDescription] = useState('Description')
  const [address, setAddress] = useState('Address')
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
    <div className='User-Profile'>

      <Row>
        <Col span={4}>
          <div className='user-nav'>
            <Link to='/user-cart'><ShoppingCartOutlined style={{ fontSize: '30px', margin: '5%' }} /> Create Order</Link> <br />
            <Link to='/user-order'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> My Order</Link> <br />
            <Link to='/user-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Profile</Link> <br />
          </div>
        </Col>
        <Col span={8}>
          <img src={UserImage} style={{ width: '400px', margin: '10%' }} />
        </Col>
        <Col span={12}>
          <div className='profile-form'>
            <Text type="secondary">User name</Text>
            <Paragraph
              editable={{
                onChange: setUserName,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {userName}
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
            <Text type="secondary">Store name</Text>
            <Paragraph
              editable={{
                onChange: setAddress,
              }}
              style={{ marginTop: '3px', fontSize: '16px' }}
            >
              {address}
            </Paragraph>
            <Text type="secondary">Store name</Text>
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
            </a> <br />
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
            <Button style={{ marginTop: '5%' }} type='primary'>Save</Button>
          </div>
        </Col>
      </Row>


    </div>
  )
}


export default StoreProfile
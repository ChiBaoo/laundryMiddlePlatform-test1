import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Button } from 'antd'
import { AlertOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';




const DeliveryData = [
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
]



export default function ShipperDelivery(){
  const [serviceData, setServiceData] = useState([])

  const bearer_token = `Bearer ${localStorage.getItem('Token')}`;
  const columns = [
    {
      title: 'Sender Name',
      dataIndex: 'senderName',
      key: 'senderName',
    },
    {
      title: 'Sender Phone',
      dataIndex: 'senderPhone',
      key: 'senderPhone',
    },
    {
      title: 'Sender Address',
      dataIndex: 'senderAddress',
      key: 'senderAddress',
    },
    {
      title: 'Reicever Name',
      dataIndex: 'receiverName',
      key: 'receiverName',
    },
    {
      title: 'Receiver Phone',
      dataIndex: 'receiverPhone',
      key: 'receiverPhone',
    },
    {
      title: 'Receiver Address',
      dataIndex: 'receiverAddress',
      key: 'receiverAddress',
    },
    
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => <div>
        <Button type='primary' onClick={AcceptOrder}>Accept</Button>
        {/* <Button type='primary' style={{ marginLeft: '5%'}} danger>Cancel</Button> */}
      </div>
    },
  
  ];
  
  const AcceptOrder =() =>{
    const jsonData = {
      
  };
  
  axios.patch('https://localhost:7195/api/Delivery/accept-delivery/4?shipperId=3', {
      headers: {
          // 'Content-Type': 'application/json',
          'accept': '*/*',
          Authorization: bearer_token

      },
  })
      .then(response => {
          // Handle the successful response
          console.log('good good')
          
  
          return response
      })
      .catch(error => {
          // Handle the error
          console.log(error);
          console.log('token', bearer_token)
      });
  }
  useEffect(() => {
    setServiceData(getService)
}, []);

const getService = () => {
    const headers = {
        Authorization: bearer_token
    };
    // Make the GET request.
    axios
        .get('https://localhost:7195/api/Delivery', { headers })
        .then((response) => {
            // Handle the response.
            setServiceData(response.data)
            console.log(response.data)

        })
        .catch((error) => {
            console.log("local", localStorage.getItem("Token"))

        });
}
    return (
      <div className='Shipper-Delivery'>
        <Row>
          <Col span={4}>
            <div className='shipper-nav'>
              <Link to='/shipper-delivery'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> Deliveries List</Link> <br />
              <Link to='/shipper-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Profile</Link> <br />
            </div>
          </Col>
          <Col span={20}>
            <div className='deliveries-list'>
              <Link to='/shipper-delivery' style={{ margin: '5%', fontSize: '16px', marginRight: '2%', color: '#A9A9A9' }}>New Order</Link> /
              <Link to='/shipper-panel-ongoing' style={{ margin: '5%', fontSize: '16px', marginRight: '2%', marginLeft: '2%' }}>Ongoing</Link> /
              <Link to='/shipper-panel-finish' style={{ margin: '5%', fontSize: '16px', marginRight: '2%', marginLeft: '2%' }}>Finish</Link>

              <Table
                columns={columns}
                dataSource={serviceData}
                style={{ margin: '3%' }}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }

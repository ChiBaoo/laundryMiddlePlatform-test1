import React, { Component } from 'react'
import { Col, Row, Button, Table } from 'antd';
import { AlertOutlined, ShoppingCartOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const columns = [
  {
    title: 'Service Name',
    dataIndex: 'serviceName',
    key: 'serviceName',
},
{
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    render: (_, record) => (
        <div>
          {record.weight} kg
        </div>
    )
},
{
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_, record) => (
        <div>
          {record.price} VND
        </div>
    )
},
{
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: (_, record) => (
        <div>
          {record.price} VND
        </div>
    )
},
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => (
      <div>
        <Button style={{backgroundColor:'#6AB8FF', color:'white'}}>{record.status}</Button>
      </div>
  )
  },
];

const DeliveryData = [
  { serviceName: 'Service name', weight: 10, price: 10000, total: 100000, status: 'wait for accept' },
  { serviceName: 'Service name', weight: 10, price: 10000, total: 100000, status: 'accepted' },
  { serviceName: 'Service name', weight: 10, price: 10000, total: 100000, status: 'taking to the store'},
  { serviceName: 'Service name', weight: 10, price: 10000, total: 100000, status: 'the store received'},
  { serviceName: 'Service name', weight: 10, price: 10000, total: 100000, status: 'processing' },
  { serviceName: 'Service name', weight: 10, price: 10000, total: 100000, status: 'store finish' },
  { serviceName: 'Service name', weight: 10, price: 10000, total: 100000, status: 'taking from the store' },
  { serviceName: 'Service name', weight: 10, price: 10000, total: 100000, status: 'the customer received'},


]
export default class UserOrder extends Component {
  render() {
    return (
      <div className='User'>
        <Row>
          <Col span={4}>
            <div className='user-nav'>
              <Link to='/user-cart'><ShoppingCartOutlined style={{ fontSize: '30px', margin: '5%' }} /> Create Order</Link> <br />
              <Link to='/user-order'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> My Order</Link> <br />
              <Link to='/user-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Profile</Link> <br />
            </div>
          </Col>
          <Col span={20}>
            <Table
              columns={columns}
              dataSource={DeliveryData}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

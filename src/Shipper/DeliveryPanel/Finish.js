import React from 'react'
import { Col, Row, Table, Input, Modal, Button } from 'antd'
import { ShopOutlined, AlertOutlined, FormOutlined } from '@ant-design/icons';
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
  },
  {
    title: 'Address receive',
    dataIndex: 'addressReceive',
    key: 'addressReceive',
  },
  {
    title: 'Address send',
    dataIndex: 'addressSend',
    key: 'addressSend',
  },
  {
    title: 'Delivery fee',
    dataIndex: 'deliveryFee',
    key: 'deliveryFee',
  },

  {
    title: 'Status',
    dataIndex: '',
    key: 'x',
    render: () => <div>
      <p style={{color: '#43D636'}}>Well done!!!</p>
    </div>
  },

];


const DeliveryData = [
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
  { serviceName: 'Service name', addressReceive: 'Address receive the clothes', addressSend: 'Address send the clothes', weight : 10, deliveryFee: 30000 },
]



export default class Finish extends React.Component {

  render() {
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
              <Link to='/shipper-delivery' style={{ margin: '5%', fontSize: '16px', marginRight: '2%'}}>New Order</Link> /
              <Link to='/shipper-panel-ongoing' style={{ margin: '5%', fontSize: '16px', marginRight: '2%', marginLeft: '2%' }}>Ongoing</Link> /
              <Link to='/shipper-panel-finish' style={{ margin: '5%', fontSize: '16px', marginRight: '2%', marginLeft: '2%', color: '#A9A9A9'  }}>Finish</Link>

              <Table
                columns={columns}
                dataSource={DeliveryData}
                style={{ margin: '3%' }}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
};


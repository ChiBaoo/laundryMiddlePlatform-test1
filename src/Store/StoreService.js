import React from 'react'
import { Col, Row, Table, Input, Modal, Button } from 'antd'
import { OrderData } from './OrderData'
import { ShopOutlined, AlertOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, ':', value);

const columns = [
  {
    title: 'Service Name',
    dataIndex: 'serviceName',
    key: 'serviceName',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Max Weight',
    dataIndex: 'maxWeight',
    key: 'maxWeight',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <div>
      <Button type='primary'>Update</Button>
      <Button type='primary' danger>Delete</Button>
    </div>
},
  
];

const Service = [
  {key: 1, serviceName: 'Service name 1', description: 'Service description 1', price: 10000, maxWeight: 10},
  {key: 2, serviceName: 'Service name 2', description: 'Service description 2', price: 10000, maxWeight: 10},
  {key: 3, serviceName: 'Service name 3', description: 'Service description 3', price: 10000, maxWeight: 10},
  {key: 4, serviceName: 'Service name 4', description: 'Service description 4', price: 10000, maxWeight: 10},
  {key: 5, serviceName: 'Service name 5', description: 'Service description 5', price: 10000, maxWeight: 10},
  {key: 6, serviceName: 'Service name 6', description: 'Service description 6', price: 10000, maxWeight: 10},
  {key: 7, serviceName: 'Service name 7', description: 'Service description 7', price: 10000, maxWeight: 10},
  {key: 8, serviceName: 'Service name 8', description: 'Service description 8', price: 10000, maxWeight: 10},

]
const ServiceData = [
  {    name: 'Service 1', description: 'Service description 1',  },
  {    name: 'Service 2', description: 'Service description 2',  },
  {    name: 'Service 3', description: 'Service description 3',  },
  {    name: 'Service 4', description: 'Service description 4',  },
  {    name: 'Service 5', description: 'Service description 5',  },
  {    name: 'Service 6', description: 'Service description 6',  },
  {    name: 'Service 7', description: 'Service description 7',  },
]



export default class StoreService extends React.Component {
  state = {
    startTime: '',
    endTime: '',
    isModalOpen: false

  }
  handleOnChangeStartTime = (event) => {
    this.setState({
      startTime: event.target.value
    })
  }
  handleOnChangeEndTime = (event) => {
    this.setState({
      endTime: event.target.value
    })
  }
  showModal = () => {
    this.setState({
      isModalOpen: true
    })
  };
  handleOk = () => {
    this.setState({
      isModalOpen: false
    })
  };
  handleCancel = () => {
    this.setState({
      isModalOpen: false
    })
  };
  render() {
    return (
      <div className='Store-Service'>
        <Row>
          <Col span={4}>
            <div className='service-and-order'>
              <Link to='/store-order'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> Order</Link> <br />
              <Link to='/store-service'><ShopOutlined style={{ fontSize: '30px', margin: '5%', }} /> Service</Link> <br />
              <Link to='/store-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Profile</Link> <br />
            </div>
          </Col>
          <Col span={20}>
            <div className='order'>
              <div className='search'>
                <Row>
                  <Col span={10}>
                    <Button type="primary" onClick={this.showModal} style={{ backgroundColor: '#6AB8FF' }}>
                      Add a service
                    </Button>
                    <Modal title="Basic Modal" open={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}
                      footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          Cancel
                        </Button>,
                        <Button type="primary" onClick={this.handleOk}>
                          Submit
                        </Button>,
                      ]}>
                        <select name='name'>
                      <p>Name</p>
                      {ServiceData.map((data) => (
                        <option value={data.name}>{data.name}</option>
                      ))}
                      </select>
                      
                    </Modal>
                  </Col>
                  <Col span={14}>
                    <div className='search-bar'>
                      <Search placeholder="Search a service by name" onSearch={onSearch} enterButton />
                    </div>
                  </Col>
                </Row>
              </div>
              <Table
                columns={columns}
                dataSource={Service}
                style={{margin: '3%'}}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

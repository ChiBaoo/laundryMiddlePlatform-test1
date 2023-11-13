import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Button, message, Modal } from 'antd'
import { AlertOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';

export default function UserOrder() {
  const [orderData, setOrderData] = useState([])
  const userIdLocal = localStorage.getItem("UserData")
  const [panelData, setPanelData] = useState([
    { value: 'NEW', panel: 'New Order', color: '#6AB8FF' },
    { value: 'ACCEPTED', panel: 'Accepted', color: '#A9A9A9' },
    { value: 'DELION', panel: 'Delivery On', color: '#A9A9A9' },
    { value: 'PROCESSING', panel: 'Store Processing', color: '#A9A9A9' },
    { value: 'FINISHED', panel: 'Finished Laundry', color: '#A9A9A9' },
    { value: 'DELIBACK', panel: 'Delivery Back', color: '#A9A9A9' },
    { value: 'COMPLETED', panel: 'Completed', color: '#A9A9A9' },
    { value: 'CANCELLED', panel: 'Canceled', color: '#A9A9A9' },

  ])
  const [status, setStatus] = useState('NEW')
  const [messageApi, contextHolder] = message.useMessage();
  const columns = [

    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Weight',
      dataIndex: 'weightKg',
      key: 'weightKg',
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const columnsNew = [
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Weight',
      dataIndex: 'weightKg',
      key: 'weightKg',
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'id',
      render: (record) => <div>
        <Button type='primary' onClick={() => {cancelOrder(record) }} danger>Cancel</Button>
      </div>,
    },
  ];

  const cancelOrder = (record) => {
    console.log('data cancel: ', record.orderId, userIdLocal)
    Modal.confirm({
      title: "Are you sure, you want to cancel this order?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        axios.patch(`https://localhost:7195/api/Order/CustomerCancelOrder/${record.orderId}?customerId=${userIdLocal}`)
          .then((response) => {
            // Handle the response.
            successNofi(response.data)
            getOrder()
            console.log(response)
          })
          .catch((error) => {
            console.log("err", error)
            failNofi('Something was wrong, please try again')
          });
      },
    });
  }
  useEffect(() => {
    getOrder()
    console.log('data effect', orderData)
    // console.log('shipper id', shipperId, typeof (shipperId))
  }, []);

  const getOrder = async () => {
    // Make the GET request.
    await axios
      .get(`https://localhost:7195/api/Order/UserOrders/${userIdLocal}?filter=status eq 'NEW'`)
      .then((response) => {
        // Handle the response.
        // console.log('respone data:', typeof(response.data))
        console.log('order data', response.data)
        setOrderData(response.data)

      })
      .catch((error) => {
        failNofi('There is no order here')
      });
  }
  const getOrderByStatus = (status) => {
    axios
      .get(`https://localhost:7195/api/Order/UserOrders/${userIdLocal}?filter=status eq '${status}'`)
      .then((response) => {
        // Handle the response.
        setOrderData(response.data)

      })
      .catch((error) => {
        console.log('err', error)
        setOrderData('')
      });
  }
  const HandleChange = (event) => {
    setStatus(event.target.getAttribute("value"))
    const data = event.target.getAttribute("value")
    getOrderByStatus(data)
    handleChangeColor(data)
  }
  const handleChangeColor = (value) => {
    const nextState = panelData.map(panel => {
      if (panel.value == value) {
        // No change
        return {
          ...panel,
          color: '#6AB8FF',
        };
      } else {
        // Return a new circle 50px below
        return {
          ...panel,
          color: '#A9A9A9',
        };
      }
    });
    // Re-render with the new array
    setPanelData(nextState);
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
    <div className='Shipper-Delivery'>
      <Row>
        <Col span={4}>
          <div className='user-nav'>
            <Link to='/user-order'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> My Order</Link> <br />
            <Link to='/user-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Profile</Link> <br />
          </div>
        </Col>
        <Col span={20}>
          <div className='deliveries-list'>
            {contextHolder}
            {panelData.map((panel) => (
              <a>
                <a style={{ margin: '1%', fontSize: '16px', marginRight: '1%', color: panel.color }} name={panel.id} value={panel.value} onClick={HandleChange}>{panel.panel}</a>
              </a>
            ))}
            <div>
              {status === 'NEW' ? (
                <div>
                  <Table
                    columns={columnsNew}
                    dataSource={orderData}
                    style={{ margin: '3%' }}
                  />
                </div>
              ) : (
                <div>
                  <Table
                    columns={columns}
                    dataSource={orderData}
                    style={{ margin: '3%' }}
                  />
                </div>
              )}
            </div>

          </div>
        </Col>
      </Row>
    </div>
  )
}

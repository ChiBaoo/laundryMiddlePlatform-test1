import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Button, message, Modal } from 'antd'
import { AlertOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';



export default function ShipperDelivery() {
  const [serviceData, setServiceData] = useState([])
  const storeIdLocal = `${localStorage.getItem("storeId")}`
  const shipperId = parseInt(localStorage.getItem("UserData"))
  const userIdLocal = localStorage.getItem("UserData")
  const [panelData, setPanelData] = useState([
    { value: 'WAITING', panel: 'New Order', color: '#6AB8FF' },
    { value: 'ACCEPTED', panel: 'Accepted', color: '#A9A9A9' },
    { value: 'DELIVERING', panel: 'Delivering', color: '#A9A9A9' },
    { value: 'FINISHED', panel: 'Finished', color: '#A9A9A9' },
  ])
  const [messageApi, contextHolder] = message.useMessage();

  const columns = [
    {
      title: 'Receiver Address',
      dataIndex: 'receiverAddress',
      key: 'receiverAddress',
    },
    {
      title: 'Receiver Phone',
      dataIndex: 'receiverPhone',
      key: 'receiverPhone',
    },
    {
      title: 'Receiver Name',
      dataIndex: 'receiverName',
      key: 'receiverName',
    },
    {
      title: 'SenderAddress',
      dataIndex: 'senderAddress',
      key: 'senderAddress',
    },
    {
      title: 'Sender Phone',
      dataIndex: 'senderPhone',
      key: 'senderPhone',
    },
    {
      title: 'Sender Name',
      dataIndex: 'senderName',
      key: 'senderName',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => <div>
        {record.status === 'WAITING' ? (
          <div style={{ display: 'inline-flex' }}>
            <Button type='primary' style={{ backgroundColor: '#6AB8FF' }} onClick={() => { updateOrderStatus(record) }}>Accept</Button>
            <Button type='primary' style={{ marginLeft: '3%' }} onClick={() => { updateOrderStatus(record) }} danger >Cancel</Button>
          </div>
        ) : record.status === 'ACCEPTED' ? (
          <div>
            <Button type='primary' style={{ backgroundColor: '#6AB8FF' }} onClick={() => { updateOrderStatus(record) }}>Package Received</Button>
            <Button type='primary' style={{ marginLeft: '3%' }} onClick={() => { cancelOrder(record) }} danger >Cancel</Button>
          </div>
        ) : record.status === 'DELIVERING' ? (
          <div>
            <Button type='primary' style={{ backgroundColor: '#6AB8FF' }} onClick={() => { updateOrderStatus(record) }}>Finish</Button>

          </div>
        ) : (
          <div>
            <p>Well done</p>
          </div>
        )}
      </div>
    },
    {
      title: '',
      dataIndex: 'status',
      key: 'status',
      render: () => <div hidden>
      </div>
    },


  ];

  const updateOrderStatus = (record) => {
    const status = record.status
    if (status === 'WAITING') {
      const deliveryId = record.deliveryId
      console.log('delivery ID: ', deliveryId)
      console.log('shipper ID: ', userIdLocal)
      axios
        .patch(`https://localhost:7195/api/Delivery/accept-delivery/${deliveryId}?shipperId=${userIdLocal}`)
        .then((response) => {
          // Handle the response.
          console.log(response.data)
          getService()
          successNofi('Accepted the order to delivery')
        })
        .catch((error) => {
          console.log("err", error)
          failNofi(error.response.data)
          getService()
        });
    } else if (status === 'ACCEPTED') {
      const deliveryId = record.deliveryId
      axios
        .patch(`https://localhost:7195/api/Delivery/PackageReceived/${deliveryId}`)
        .then((response) => {
          // Handle the response.
          console.log(response.data)
          successNofi('Receive package successfully')
          getDeliveryByStatus(record.status)
        })
        .catch((error) => {
          console.log("err", error)
          failNofi(error.response.data)
        });
    } else if (status === 'DELIVERING') {
      const deliveryId = record.deliveryId
      axios
        .patch(`https://localhost:7195/api/Delivery/FinishDelivery/${deliveryId}`)
        .then((response) => {
          // Handle the response.
          console.log(response.data)
          successNofi('Finish Delivery Successfully')
          getDeliveryByStatus(record.status)
        })
        .catch((error) => {
          console.log("err", error)
          failNofi('Something was wrong, please try again')
        });
    } else if (status === 'FINISHED') {
      console.log('status', 'hehe')
    }
    console.log(record)
  }
  const cancelOrder = (record) => {
    const deliveryId = record.deliveryId
    console.log('cancel data: ', record.deliveryId, shipperId)
    Modal.confirm({
      title: "Are you sure, you want to cancel this order?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        axios
          .patch(`https://localhost:7195/api/Delivery/cancel/${deliveryId}?shipperId=${shipperId}`)
          .then((response) => {
            // Handle the response.
            console.log(response.data)
            getDeliveryByStatus('ACCEPTED')
            successNofi('Cancel delivery successfully')
          })
          .catch((error) => {
            console.log("err", error)
            failNofi(error.response.data)
            getService()
          });
      },
    });

  }
  useEffect(() => {
    getService()
    console.log('data', serviceData)
    console.log('shipper id', shipperId, typeof (shipperId))
  }, []);

  const getService = () => {
    // Make the GET request.
    axios
      .get(`https://localhost:7195/api/Delivery/WaitingDeliveries`)
      .then((response) => {
        // Handle the response.
        setServiceData(response.data)
        console.log(response.data)

      })
      .catch((error) => {
        failNofi('There is no order for delivery')
        setServiceData('')
      });
  }
  const getDeliveryByStatus = (status) => {
    axios
      .get(`https://localhost:7195/api/Delivery/YourDelivery/${shipperId}?$filter=status eq '${status}'`)
      .then((response) => {
        // Handle the response.
        setServiceData(response.data)
        console.log(response.data)

      })
      .catch((error) => {
        console.log('err', error)
        setServiceData('')
      });
  }
  const HandleChange = (event) => {
    const dataChagne = event.target.getAttribute("value")
    if (dataChagne === 'WAITING') {
      getService()
    } else if (dataChagne === 'ACCEPTED') {
      getDeliveryByStatus('ACCEPTED')
    } else if (dataChagne === 'DELIVERING') {
      getDeliveryByStatus('DELIVERING')
    } else if (dataChagne === 'FINISHED') {
      getDeliveryByStatus('FINISHED')
    }
    handleChangeColor(dataChagne)
  }
  const handleChangeColor = (value) => {
    const nextState = panelData.map(panel => {
      if (panel.value == value) {
        return {
          ...panel,
          color: '#6AB8FF',
        };
      } else {
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
          <div className=''>
            <Link to='/shipper-delivery'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> Deliveries List</Link> <br />
            <Link to='/shipper-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Profile</Link> <br />
          </div>
        </Col>
        <Col span={20}>
          <div className='deliveries-list'>
            {contextHolder}
            {panelData.map((panel) => (
              <a>
                <a style={{ margin: '1%', fontSize: '16px', marginRight: '1%', color: panel.color }} value={panel.value} onClick={HandleChange}>{panel.panel}</a>
              </a>
            ))}
            <Table
              columns={columns}
              dataSource={serviceData}
              style={{ margin: '3%', marginRight: '-10%' }}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

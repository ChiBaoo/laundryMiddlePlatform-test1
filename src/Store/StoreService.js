import React, { Component, useState } from 'react'
import { Col, Row, Table, Input, Modal, Button, Select, message, InputNumber } from 'antd'
import { useEffect } from 'react';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, FormOutlined, ShopOutlined, AlertOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';


const { Search } = Input;
// const onSearch = (value, _e, info) => console.log(info?.source, ':', value);



export default function ServiceManage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [serviceData, setServiceData] = useState([])
  const [serviceId, setServiceId] = useState()
  const [serviceIdEdit, setServiceIdEdit] = useState()

  const [serviceName, setServiceName] = useState()
  const [description, setDescription] = useState()
  const [isEditing, setIsEditing] = useState(false);
  const [serviceEdit, setserviceEdit] = useState();
  const [options, setOptions] = useState([])
  const [feePerUnitKg, setFeePerUnitKg] = useState(10000)
  const [storeService, setStoreService] = useState([])
  const [messageApi, contextHolder] = message.useMessage();

  const storeIdLocal = localStorage.getItem("StoreId")


  const columns = [
    {
      title: 'Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Clothes Type',
      dataIndex: 'clothesTypeName',
      key: 'clothesTypeName',
    },
    {
      title: 'Fee',
      dataIndex: 'feePerUnitKg',
      key: 'feePerUnitKg',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'id',
      render: (record) => <div>
        <EditOutlined
          onClick={() => { editServiceModal(record); }}
        />
        <DeleteOutlined
          onClick={() => {
            DeleteService(record);
          }}
          style={{ color: "red", marginLeft: 12 }}
        />
        {/* <Button type='primary' style={{ marginLeft: '2%' }} danger>Delete</Button> */}
      </div>,
    },
  ];
  useEffect(() => {
    getStoreService()
    getService()

  }, []);


  const getService = () => {
    axios
      .get('https://localhost:7195/api/Service')
      .then((response) => {
        // Handle the response.
        setServiceData(response.data)
        console.log('service get:', response.data)

      })
      .catch((error) => {
        console.log("local", localStorage.getItem("Token"))

      });
  }

  const getStoreService = () => {
    axios
      .get(`https://localhost:7195/api/Service/your-service/${storeIdLocal}`)
      .then((response) => {
        setStoreService(response.data)
        console.log('store service: ', storeService)

      })
      .catch((error) => {
        console.log("local", localStorage.getItem("Token"))

      });
  }
  //UPDATE

  const editServiceModal = (record) => {
    // setStoreId([record.id])
    setServiceIdEdit(record.serviceId)
    console.log('service id edit 1', record.serviceId)
    console.log('service id edit 2', serviceIdEdit)
    setIsEditing(true);
    setserviceEdit({ ...record })
  }
  const resetEditing = () => {
    setIsEditing(false);
    setserviceEdit(null);
  };
  //DELETE
  const DeleteService = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this service record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const deleteId = record.serviceId
        console.log('deleteId', deleteId)
        axios.delete(`https://localhost:7195/api/Store/DeleteServiceFromStore?storeId=${storeIdLocal}&serviceId=${deleteId}`)
          .then((response) => {
            // Handle the response.
            successNofi(response.data)
            getStoreService()
            console.log(response)
          })
          .catch((error) => {
            console.log("err", error)
            failNofi('Something was wrong, please try again')
          });
      },
    });
  };
  //DETAIL
  const showModal = () => {
    for (let i = 0; i < serviceData.length; i++) {
      options.push({
        value: serviceData[i].serviceId,
        label: serviceData[i].serviceName,
      });
    }
    setIsModalOpen(true)
  };
  const handleOk = () => {
    const data = {
      serviceId: serviceId,
      feePerUnitKg: feePerUnitKg
    }
    console.log('service data', data)
    if (data.feePerUnitKg >= 1000 && data.feePerUnitKg <= 100000) {
      axios.post(`https://localhost:7195/api/Store/AddServiceToStore?storeId=${storeIdLocal}`, data)
        .then(response => {
          // Handle the successful response
          getStoreService()
          successNofi('Add new service successfully')
        })
        .catch(error => {
          // Handle the error
          failNofi('Some field were wrong, please try again')
          console.log(error);
        });
      setIsModalOpen(false)
    } else {
      failNofi('Fee must be between 1.000vnd and 100.000vnd')
    }
  };
  const editService = () => {
    const editData = {
      "serviceId": serviceId,
      "feePerUnitKg": feePerUnitKg
    }
    if (serviceEdit.feePerUnitKg > 999 && serviceEdit.feePerUnitKg < 100001) {
      axios.patch(`https://localhost:7195/api/Store/UpdateServiceInStore?storeId=${localStorage.getItem('StoreId')}`, serviceEdit)
        .then(response => {
          // Handle the successful response
          console.log('edit data:', response)
          successNofi('Update service successfully')
          getStoreService()
        }
        )
        .catch(error => {
          // Handle the error
          failNofi('Some field was wrong, please try again')
          console.log(error);
        });
      resetEditing();
    } else {
      failNofi('Fee must be between 1.000vnd and 100.000vnd')
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false)
  };
  const handleChange = (value) => {
    setServiceId(value)
    console.log('service id select: ', serviceId)
    console.log(`selected ${value}`);
  };

  const handleChangeFee = (value) => {
    {
      setserviceEdit((pre) => {
        return { ...pre, feePerUnitKg: value };
      });
    }
    console.log(`selected ${value}`);
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
    <div className='Store-Service'>
      <Row>
        <Col span={4}>
          <div className=''>
            <Link to='/store-order'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> Order</Link> <br />
            <Link to='/store-service'><ShopOutlined style={{ fontSize: '30px', margin: '5%', }} /> Service</Link> <br />
            <Link to='/store-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Store Profile</Link> <br />
            <Link to='/store-owner-profile'><FormOutlined style={{ fontSize: '30px', margin: '5%' }} /> Store Owner Profile</Link> <br />
          </div>
        </Col>
        <Col span={20}>
          <div className='Shipper'>
            <h3>Service Manage</h3>
            <div className='search'>
              <Row>
                <Col span={10}>
                  <Button type="primary" onClick={showModal} style={{ backgroundColor: '#6AB8FF' }}>
                    Add a service
                  </Button>
                  <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                    footer={[
                      <Button type="primary" onClick={handleOk}>
                        Submit
                      </Button>,
                    ]}>
                    <p>Service for select</p>
                    <Select
                      placeholder="Select a service"
                      style={{
                        width: 300,
                      }}
                      onChange={handleChange}
                      options={options}
                    />
                    <p>{description}</p>
                    <p>Fee for each Kg</p>
                    <InputNumber name='weight' defaultValue={10000} onChange={setFeePerUnitKg}></InputNumber><br />
                  </Modal>
                </Col>
                <Col span={14}>
                </Col>
              </Row>
              {contextHolder}
            </div>
            <Table
              columns={columns}
              dataSource={storeService}
            />
            <Modal
              title="Edit Service"
              visible={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                editService();
                console.log(serviceEdit)
              }}
            >
              <p>Service Name</p>
              <p>{serviceEdit?.serviceName}</p>
              <p>Fee per unit</p>
              <InputNumber
                value={serviceEdit?.feePerUnitKg}
                onChange={handleChangeFee}
              />
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  )

}

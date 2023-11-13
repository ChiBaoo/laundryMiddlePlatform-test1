import React, { useEffect, useState } from 'react'
import { Col, Row, Checkbox, Card, Button, Space, Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import laundryImg from '../assets/th.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';


const bearer_token = `Bearer ${localStorage.getItem('Token')}`;
export default function SearchService() {
  const [serviceData, setServiceData] = useState([])
  const [serviceDetailId, setServiceDetailId] = useState([])
  const [search, setSearch] = useState()
  useEffect(() => {
    getService()
    // console.log('data effect', serviceData)
  }, []);

  const getService = () => {
    // if(serviceSearch){
    //   setServiceData(serviceSearch)
    // }
    const headers = {
      Authorization: bearer_token
    };
    // Make the GET request.
    axios
      .get('https://localhost:7195/api/Service', { headers })
      .then((response) => {
        // Handle the response.
        setServiceData(response.data)


      })
      .catch((error) => {
        console.log("local", localStorage.getItem("Token"))

      });
  }
  const getServiceDetalId = () => {
    console.log('detail id: ', serviceDetailId)
  }
  const searchByName = () => {
    // Make the GET request.
    axios
      .get(`https://localhost:7195/api/service?$filter=contains(ServiceName, '${search}')`)
      .then((response) => {
        // Handle the response.
        localStorage.setItem("SearchService", response.data)
        setServiceData(response.data)
        console.log(response.data)

      })
      .catch((error) => {
        console.log("local", localStorage.getItem("Token"))

      });
  }
  return (
    <div className='Service-list'>
      <div style={{marginLeft: '60%'}}>
        <Space>
          <Space.Compact
            style={{
              width: '200%',
            }}
          >
            <Input placeholder="Search a service by name" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button type="primary" onClick={searchByName}>Search</Button>
          </Space.Compact>
        </Space>
      </div>

      <Row>
        <Col span={2}>
        </Col>
        <Col span={22}>
          <Row>
            {serviceData.map((service) => (
              <Col span={8}>
                <Card style={{
                  width: 330,
                }}>
                  <img src={laundryImg} />
                  <h3>{service.serviceName}</h3>
                  <p>{service.description}</p>
                  <p>{service.feePerUnitKg}</p>
                  <Link to='/service-detail' onClick={() => localStorage.setItem("serviceId", service.serviceId)}>Detail</Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

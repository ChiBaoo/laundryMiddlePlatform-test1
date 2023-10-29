import React, { Component } from 'react'
import { Col, Row, Checkbox, Card } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { Service } from './ServiceData'
import laundryImg from '../assets/th.jpg'
import { Link } from 'react-router-dom';



export default class SearchService extends Component {
  render() {
    return (
      <div className='Service-list'>
        {/* <Navigation /> */}
        <h6 style={{ textAlign: 'center', fontSize: '27px', color: '#FF6A6A' }}>Lucky!!! We have some suitable service for you</h6>
        <Row>
          <Col span={6}>
            <div className='filter'>
              <FilterOutlined style={{ fontSize: '23px' }} /> <h3>Filter</h3>
            </div>
            <div className='sub-filter'>
              <h3 style={{ color: '#FF6A6A' }}>Service</h3>
              <div className='option'>
                <Checkbox>Service 1</Checkbox><br />
                <Checkbox>Service 2</Checkbox><br />
                <Checkbox>Service 3</Checkbox><br />
                <Checkbox>Service 4</Checkbox><br />
              </div>
              <h3 style={{ color: '#FF6A6A' }}>City</h3>
              <div className='option'>
                <Checkbox>City 1</Checkbox><br />
                <Checkbox>City 2</Checkbox><br />
                <Checkbox>City 3</Checkbox><br />
                <Checkbox>City 4</Checkbox><br />
              </div>
              <h3 style={{ color: '#FF6A6A' }}>Price</h3>
              <div className='option'>
                <Checkbox>Under 10</Checkbox><br />
                <Checkbox>Upper 10</Checkbox><br />
                <Checkbox>Under 20</Checkbox><br />
                <Checkbox>Upper 20</Checkbox><br />
              </div>
            </div>
          </Col>
          <Col span={18}>
            <Row>
              {Service.map((service) => (
                <Col span={8}>
                  <Card style={{
                    width: 330,
                  }}>
                    <img src={laundryImg} />
                    <h3>{service.name}</h3>
                    <p>{service.price}</p>
                    <p>{service.rating}</p>
                    <Link to='/service-detail'>Detail</Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

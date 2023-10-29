import React, { Component } from 'react'
import { Col, Row, Form, Input, InputNumber, Button } from 'antd';
import { ShoppingCartOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source,':', value);

export default class Navigation extends Component {
    render() {
        return (
            <div className='Navigate'>
                <Row>
                    <Col span={7}>
                        <Link to='/'><h3>Laundry Middle Platform</h3></Link>
                    </Col>
                    <Col span={13}>
                        <div className='search'>
                            <Link to='/search-service'>
                        <Search placeholder="Search a service" onSearch={onSearch} enterButton />
                        </Link>
                        </div>
                    </Col>
                    <Col span={4}>

                    <ShoppingCartOutlined style={{ fontSize: '25px', color:'white', backgroundColor: '#6AB8FF', margin:'2px' }}/>
                    <BellOutlined style={{ fontSize: '25px', color:'white', backgroundColor: '#6AB8FF', margin:'2px' }}/>
                    <UserOutlined style={{color:'#6AB8FF'}}/> <Link to='/sign-in'>Sign in</Link>/<Link to='/sign-up'>Sign up</Link>
                    <div style={{fontSize:'15px'}}>
                        <Link style={{margin:'5px'}} to='/admin'>Admin</Link>
                        <Link style={{margin:'5px'}}  to='/store'>Store</Link>
                        <Link style={{margin:'5px'}}  to='/shipper-delivery'>Shipper</Link>
                        <Link style={{margin:'5px'}}  to='/user'>User</Link>
                    </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

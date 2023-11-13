import React from 'react'
import { Col, Row, Input, Button, Space } from 'antd';
import {UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';



export default function Navigation() {
    const roleId = localStorage.getItem("Role")
    const navigate = useNavigate()
    const ChangeState = () => {
        // localStorage.deleteItem("Token")
        localStorage.setItem("Role", '')
        localStorage.setItem("UserData", '')
        localStorage.setItem("StoreId", '')
        navigate('/sign-in')
    }
    return (
        <div className='Navigate'>

            <Row>
                <Col span={7}>

                    <Link to='/'><h1 style={{ margin: '6%', marginTop: '3%' }}>Laundry Middle Platform</h1></Link>
                </Col>
                <Col span={13}>
                </Col>
                <Col span={4}>
                    <div>
                        {roleId == 1 ? (
                            <div>
                                <Link to='/admin'style={{ margin: '5px' }}><Button style={{ color: '#6AB8FF' }} >Admin Panel</Button></Link>
                                <Button type='primary' style={{ margin: '5px' }}onClick={ChangeState} danger>Log out</Button>
                            </div>
                        ) : roleId == 2 ? (
                            <div>
                                <Link to='/store' style={{ margin: '5px' }}><Button style={{ color: '#6AB8FF' }} >Store Panel</Button></Link>
                                <Button type='primary' style={{ margin: '5px' }} onClick={ChangeState} danger>Log out</Button>
                            </div>
                        ) : roleId == 3 ? (
                            <div>
                                <Link to='/shipper-delivery' style={{ margin: '5px' }}><Button style={{ color: '#6AB8FF' }} >Shipper Panel</Button></Link>
                                <Button type='primary' style={{ margin: '5px' }} onClick={ChangeState} danger>Log out</Button>
                            </div>
                        ) : roleId == 4 ? (
                            <div>
                                <Link to='/user-order' style={{ margin: '5px' }} ><Button style={{ color: '#6AB8FF' }} >User Panel</Button></Link>
                                <Button type='primary' style={{ margin: '5px' }} onClick={ChangeState} danger>Log out</Button>
                            </div>
                        ) : (
                            <div>
                                <UserOutlined style={{ color: '#6AB8FF' }} /> <Link to='/sign-in'>Sign in</Link>/<Link to='/sign-up'>Sign up</Link>
                            </div>
                        )}
                    </div>
                    {/* <div style={{ fontSize: '15px' }}>
                        <Link style={{ margin: '5px' }} to='/admin'>Admin</Link>
                        <Link style={{ margin: '5px' }} to='/store'>Store</Link>
                        <Link style={{ margin: '5px' }} to='/shipper-delivery'>Shipper</Link>
                        <Link style={{ margin: '5px' }} to='/user'>User</Link>
                    </div> */}
                </Col>
            </Row>
        </div>
    )
}


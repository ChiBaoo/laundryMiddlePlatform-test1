import React, { Component } from 'react'
import { ShopOutlined ,AlertOutlined , TeamOutlined, CarOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default class AdminNav extends Component {
    render() {
        return (
            <div className='Admin-Nav'>
                <div className='manage'>
                    <Link to='/account-manage'><TeamOutlined style={{ fontSize: '30px', margin: '5%' }} /> User</Link> <br/>
                    <Link to='/store-manage'><ShopOutlined style={{ fontSize: '30px', margin: '5%' }} /> Store</Link> <br/>
                    <Link to='/shipper-manage'><CarOutlined style={{ fontSize: '30px', margin: '5%' }} /> Shipper </Link> <br/>
                    <Link to='/service-manage'><AlertOutlined style={{ fontSize: '30px', margin: '5%' }} /> Service</Link> <br/>
                </div>

            </div>
        )
    }
}

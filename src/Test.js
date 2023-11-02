import React, { Component } from 'react'
import StoreOrder from './Store/StoreOrder'
import SignUp from './SignUp-SignIn/SignUp'
import SignIn from './SignUp-SignIn/SignIn'
import ServiceDetail from './Guest/ServiceDetail'
import SearchService from './Guest/SearchService';
import { Route, Routes } from 'react-router-dom';
import Home from './Navigate/Home'
import ServiceManage from './Admin/ServiceMange';
import ShipperManage from './Admin/ShipperManage'
import Navigation from './Navigate/Navigation';
import StoreManage from './Admin/StoreManage';
import AccountManage from './Admin/AccountManage';
import ShipperDelivery from './Shipper/ShipperDelivery'
import User from './User/User'
import StoreService from './Store/StoreService'
import StoreProfile from './Store/StoreProfile'
import ShipperProfile from './Shipper/ShipperProfile'
import FinishShipper from './Shipper/DeliveryPanel/Finish'
import OngoingShipper from './Shipper/DeliveryPanel/Ongoing'
import UserOrder from './User/UserOrder'
import UserProfile from './User/UserProfile'
import CheckOut from './User/CheckOut'
import Role1 from './Navigate/Role1'
import Role2 from './Navigate/Role2'



export default class Test extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='search-service' element={<SearchService/>}/>
          <Route path='sign-up' element={<SignUp/>}/>
          <Route path='sign-in' element={<SignIn/>} />
          <Route path='service-detail' element={<ServiceDetail/>} />
          <Route path='account-manage' element={<AccountManage/>} />
          <Route path='store-manage' element={<StoreManage/>} />
          <Route path='shipper-manage' element={<ShipperManage/>} />
          <Route path='service-manage' element={<ServiceManage/>} />
          <Route path='admin' element={<AccountManage/>} />
          <Route path='store' element={<StoreOrder/>} />
          <Route path='shipper-delivery' element={<ShipperDelivery/>} />
          <Route path='shipper-profile' element={<ShipperProfile/>} />
          <Route path='user' element={<User/>} />
          <Route path='store-order' element={<StoreOrder/>} />
          <Route path='store-service' element={<StoreService/>} />
          <Route path='store-profile' element={<StoreProfile/>} />
          <Route path='shipper-panel-neworder' element={<ShipperDelivery/>} />
          <Route path='shipper-panel-ongoing' element={<OngoingShipper/>} />
          <Route path='shipper-panel-finish' element={<FinishShipper/>} />
          <Route path='user-cart' element={<User/>} />
          <Route path='user-order' element={<UserOrder/>} />
          <Route path='user-profile' element={<UserProfile/>} />
          <Route path='checkout' element={<CheckOut/>} />
          <Route path='user' element={<User/>} />
          <Route path='role1' element={<Role1/>} />
          <Route path='role2' element={<Role2 />} />
          
        </Routes>
      </div>
    )
  }
}

 
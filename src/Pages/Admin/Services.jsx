import React from 'react'
import ServicesList from '../../Components/Admin/Services/ServicesList'
import NavBar from '../../Components/Admin/Home/NavbarAdmin'
import SideBar from '../../Components/Admin/Home/SideBar'
import { Helmet } from 'react-helmet'

function Services() {
  return (
    <div>
       <Helmet>
        <title>Services | MindEase</title>
      </Helmet>
          <ServicesList />
    </div>
  ) 
}

export default Services

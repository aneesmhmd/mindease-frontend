import React from 'react'
import ServicesList from '../../components/Admin/Services/ServicesList'
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

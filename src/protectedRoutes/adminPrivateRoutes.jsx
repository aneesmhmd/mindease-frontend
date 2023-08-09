import React, { useEffect, useState } from 'react'
import { getLocal } from '../Context/auth'

function adminPrivateRoutes({route}) {
  const [verify, setVerify] = useState(false)

  useEffect(()=>{
    const token = getLocal('adminJwt')
    
  })
  return (
    <div>
      
    </div>
  )
}

export default adminPrivateRoutes

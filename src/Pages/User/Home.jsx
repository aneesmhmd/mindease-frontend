import React, { useEffect } from 'react'
import NavBar from '../../Components/UserNavbar/Navbar'

function Home() {
  useEffect(()=>{
    document.title = 'MindEase'
  })
  return (
    <div>
      <NavBar/>
    </div>
  )
}

export default Home

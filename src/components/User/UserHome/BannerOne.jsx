import React from 'react'
import home from '../../../images/ImageOne.jpg'
import { Link } from 'react-router-dom'

function BannerOne() {
  return (
    <div className="bg-cover bg-center flex mt-3 mx-9 rounded-md" style={{ backgroundImage: `url(${home})` }}>
      <div className="flex flex-1" >
        <div className="p-20 lg:p-44">
          <h1 className="md:text-4xl font-serif text-gray-800 font-bold text-start">
            MAKE A POSITIVE DIFFERENCE IN YOUR LIFE
          </h1>
        </div>
      </div>
      <div className="flex flex-1">

      </div>
    </div>
  )
}

export default BannerOne

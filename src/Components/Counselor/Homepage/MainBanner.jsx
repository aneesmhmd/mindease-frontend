import React from 'react'
import home from '../../../images/CBanner.jpg'
function MainBanner() {
  return (
    <div>
      <div className="bg-cover bg-center flex mt-3 mx-9 rounded-md" style={{ backgroundImage: `url(${home})` }}>
        <div className="flex flex-1" >
          <div className="p-20 lg:p-44">
            <h1 className="md:text-4xl font-serif text-white text-start text-stroke font-bold ">
              DON'T TEACH ANYTHING, HELP THEM TO DISCOVER IT WITHIN THEMSELVES
            </h1>
          </div>
        </div>
        <div className="flex flex-1">

        </div>
      </div>
    </div>
  )
}

export default MainBanner

import React from 'react'
import { PropagateLoader } from 'react-spinners'

function Loaders({ message }) {
    return (
        <div className='flex flex-col items-center justify-center mt-80'>
            <PropagateLoader
                color="#6b7abd"
                speedMultiplier={0.8}
            />
            <h1 className='mt-10'>{message}</h1>

        </div>
    )
}

export default Loaders

import React from 'react'
import image from '../../../images/post-1.jpeg'
import imageTwo from '../../../images/post-2.jpeg'

function BannerTwo() {
    return (
        <div>
            <div className="flex flex-col md:flex-row align-middle justify-center mt-5 bg-white">
                <div className="flex md:justify-end justify-center align-middle h-2/3 md:w-1/2">
                    <img src={image}
                        className="w-7/12"/>
                </div>
                <div className='flex justify-center align-middle h-full md:w-1/2 mt-12'>
                    <div className="flex justify-center flex-col items-center align-middle h-full md:w-2/3 md:text-end text-center">
                        <h1 className="md:text-4xl font-sans font-bold mt-5 text-end">
                            Why
                            <span className='text-red-500'>
                                suffer Alone?</span>
                            <br/>
                            We will help you
                        </h1>
                        <p className="mt-4 font-serif md:w-2/3 w-3/4 xl:text-lg text-sm">If things around are getting the worst of you, and are starting to affect your well being, are causing stress, or anxiety, that is when you should consider going for counselling or therapy. Counselling can be an option when you want to overcome mental challenges such as mental illness or even a mere confusion over what subjects you should choose...</p>
                    </div>
                </div>

            </div>


            <div className="flex flex-col md:flex-row align-middle justify-center mt-5 bg-white">

                <div className='flex justify-center align-middle h-full md:w-1/2 md:mt-20 mt-10'>
                    <div className="flex justify-center flex-col items-center align-middle h-full md:w-2/3 md:text-start text-center">
                        <h1 className="md:text-4xl font-sans font-bold mt-5 text-start">
                            How can
                            <br/>
                            We
                            <span className='text-red-500'>help you</span>
                        </h1>
                        <p className="mt-4 font-serif md:w-2/3 w-3/4 xl:text-lg text-sm">
                            We can connect you with our team of certified clinical psychologists and therapists who understand and direct you in meaningful ways that will help you with the process of healing till you become capable to fight your stressors head-on
                        </p>
                    </div>
                </div>
                <div className="flex md:justify-start justify-center align-middle h-2/3 md:w-1/2">
                    <img src={imageTwo}
                        className="w-7/12"/>
                </div>


            </div>


        </div>
    )
}

export default BannerTwo

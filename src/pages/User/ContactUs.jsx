import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import ContactForm from '../../components/User/ContactUs/ContactForm'


function ContactUs() {
    const [loading, setLoading] = useState(true)
    return (
        <div className='pt-16 min-h-screen bg-gray-100'>

            <Helmet>
                <title>
                    Contact Us | MindEase
                </title>
            </Helmet>

            <ContactForm />
        </div>
    )
}

export default ContactUs

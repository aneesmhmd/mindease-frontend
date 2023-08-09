import React from 'react'
import { Helmet } from 'react-helmet'
import ContactForm from '../../components/User/ContactUs/ContactForm'

function ContactUs() {
    return (
        <div className='pt-20'>
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

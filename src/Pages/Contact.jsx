import React from 'react'
import NavbarHome from '../components/NavbarHome'
import ContactCTA from '../components/contact/ContactCTA'
import FooterHome from '../components/FooterHome'
import ContactFormSection from '../components/contact/ContactFormSection'

const Contact = () => {
  return (
    <>
      <NavbarHome/>
      <ContactCTA/>
      <ContactFormSection/>
      <FooterHome/>
    </>
  )
}

export default Contact
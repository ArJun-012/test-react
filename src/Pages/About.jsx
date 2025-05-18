import React from 'react'
import AboutHero from '../components/about/AboutHero'
import NavbarHome from '../components/NavbarHome'
import WhyChooseUs from '../components/about/WhyChooseUs'
import StatsSection from '../components/StatsSection'
import AboutServices from '../components/about/AboutServices'
import HealthFooter from '../components/HealthFooter'
import FooterHome from '../components/FooterHome'
import DoctorsPreview from '../components/doctors/DoctorsPreview'



const About = () => {
  return (
    <>
        <NavbarHome/>
        <AboutHero/>
        <WhyChooseUs/>
        <StatsSection/>
        <AboutServices/>
        <DoctorsPreview/>
        <HealthFooter/>
        <FooterHome/>
    </>
  )
}

export default About
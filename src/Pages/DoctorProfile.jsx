import React from 'react'
import NavbarHome from '../components/NavbarHome'
import DoctorProfileComponent from '../components/doctors/DoctorProfileComponent'
import AppointmentForm from '../components/doctors/AppointmentForm'
import HealthFooter from '../components/HealthFooter'
import FooterHome from '../components/FooterHome'

const DoctorProfile = () => {
  return (
    <>
        <NavbarHome/>
        <DoctorProfileComponent/>
        <AppointmentForm/>
        <HealthFooter/>
        <FooterHome/>
    </>
  )
}

export default DoctorProfile
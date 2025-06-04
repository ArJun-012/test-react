import React from 'react'
import NavbarHome from '../components/NavbarHome'
import DoctorsPage from '../components/doctors/DoctorsPage'
import AppointmentForm from '../components/doctors/AppointmentForm'
import FooterHome from '../components/FooterHome'
import HealthFooter from '../components/HealthFooter'

const Doctors = () => {
    return (
        <>
            <NavbarHome/>
            <DoctorsPage/>
            <AppointmentForm/>
            <HealthFooter/>
            <FooterHome/>
        </>
    )
}

export default Doctors;
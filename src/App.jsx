import React from 'react'
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeStore from './Pages/HomeStore'
import ProductStore from './Pages/ProductStore'
import Sidebar from './components/Sidebar'
import ProductDetailsPage from './Pages/ProductDetailsPage'
import Home from './components/Home/Home'
import About from './Pages/About'
import Services from './Pages/Services'
import Doctors from './Pages/Doctors'
import Contact from './Pages/Contact'
import Appoinments from './Pages/Appoinments'
import OtpTest from './components/OtpTest'
import PaymentGateway from './Pages/PaymentGateway'
import DoctorProfile from './Pages/DoctorProfile'
import Chatbot from './Pages/chatbot'
import UserDashboard from './components/userdash'
import AppointmentMap from './components/AppointmentMap'
import AdminLanding from './Admin/Pages/AdminLanding'
import StoreManageAdmin from './Admin/Pages/StoreManageAdmin'
import ClinicManageAdmin from './Admin/Pages/ClinicManageAdmin'
import ProductDetails from './Admin/Components/ProductDetails'
import ProductManageAdmin from './Admin/Pages/ProductManageAdmin'
import AppointmentForm from './components/doctors/AppointmentForm'
import AppointmentManageAdmin from './Admin/Pages/AppointmentManageAdmin'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/store" element={<HomeStore />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/appointments" element={<Appoinments/>} />
        <Route path="/product" element={<ProductStore />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/product/:id" element={<ProductDetailsPage/>} />
        <Route path="/otptest" element={<OtpTest/>} />
        <Route path="/payment" element={<PaymentGateway/>} />
        <Route path="/doctor" element={<DoctorProfile/>} />
        <Route path="/chatbot" element={<Chatbot/>} />
        <Route path="/map" element={<UserDashboard/>} />
        <Route path="/appoinmentmap" element={<AppointmentMap/>} />
        <Route path="/admin/home" element={<AdminLanding/>} />
        <Route path="/admin/store" element={<StoreManageAdmin/>} />
        <Route path="/admin/clinics" element={<ClinicManageAdmin/>} />
        <Route path="/admin/products" element={<ProductManageAdmin/>} />
        <Route path="/admin/appointments" element={<AppointmentManageAdmin/>} />
        <Route path="/appointment" element={<AppointmentForm/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
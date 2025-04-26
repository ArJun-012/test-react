import React from 'react'
import Button from './components/button'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProductGrid from './components/products'
import CareSection from './components/CareSection'
import TestimonialCarousel from './components/TestimonialCarousel'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      {/* <Button/> */}
      <Hero/>
      <Navbar/>
      <ProductGrid/>
      <CareSection/>
      <TestimonialCarousel/>
      <ProductGrid/>
      <Footer/>
    </>
  )
}

export default App
import React from 'react'
import Button from './components/button'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProductGrid from './components/products'
import CareSection from './components/CareSection'
import TestimonialCarousel from './components/TestimonialCarousel'
import Footer from './components/Footer'
import ProductHero from './components/ProductHero'

const App = () => {
  return (
    <>
      {/* <Button/> */}
      <Navbar/>
      <Hero/>
      <ProductGrid/>
      <CareSection/>
      <TestimonialCarousel/>
      <ProductHero/>
      <ProductGrid/>
      <Footer/>
    </>
  )
}

export default App
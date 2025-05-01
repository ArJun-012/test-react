import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ProductGrid from '../components/products'
import Footer from '../components/Footer'

const ProductStore = () => {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <ProductGrid/>
      <Footer/>
    </>
  )
}

export default ProductStore
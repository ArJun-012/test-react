import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProductGrid from '../components/products'
import CareSection from '../components/CareSection'
import TestimonialCarousel from '../components/TestimonialCarousel'
import ProductHero from '../components/ProductHero'
import Footer from '../components/Footer'


const HomeStore = () => {
    return (
        <>
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

export default HomeStore
import React from 'react'
import Navbar from '../components/Navbar'
import ProductDetails from '../components/ProductDetails'
import HowToUseSection from '../components/HowToUseSection'
import FeaturesSection from '../components/FeaturesSection'
import ProductGrid from '../components/products'
import Footer from '../components/Footer'

const ProductDetailsPage = () => {
    return (
        <>
            <Navbar/>
            <ProductDetails/>
            <HowToUseSection/>
            <FeaturesSection/>
            <ProductGrid/>
            <Footer/>
        </>
    )
}

export default ProductDetailsPage
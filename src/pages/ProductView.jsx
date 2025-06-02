import React, { useEffect } from 'react'
import { NavbarDemo } from '../components/Navbar'
import AllProducts from '../components/AllProducts'
import Footer from '../components/Footer'
import ArtDetails from '../components/ArtDetails'
import { useLocation } from 'react-router-dom'

const ProductView = () => {
    const location = useLocation()
    const prod = location.state.prod;
    useEffect(() => {
        // Scroll to the top of the page when this component is rendered
        window.scrollTo(0, 0);
    }, []); // Empty dependency array ensures it only runs on mount
    return (
        <div className="w-full bg-black py-5">
            <NavbarDemo />
            <ArtDetails prod={prod} />
            <Footer />

        </div>
    )
}

export default ProductView

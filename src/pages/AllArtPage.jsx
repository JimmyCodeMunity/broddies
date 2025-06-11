import React from "react";
import { NavbarDemo } from "../components/Navbar";
import AllProducts from "../components/AllProducts";
import Footer from "../components/Footer";

const AllArtPage = () => {
  return (
    <div className="bg-black py-5">
      <NavbarDemo />
      <AllProducts />
      <Footer />
    </div>
  );
};

export default AllArtPage;

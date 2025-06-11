import React from "react";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import { NavbarDemo } from "../components/Navbar";
import Whatsap from "../components/Whatsap";

const CartPage = () => {
  return (
    <div className="w-full bg-black py-5">
      <NavbarDemo />
      <Cart />
      <Footer />
      {/* <Whatsap /> */}
    </div>
  );
};

export default CartPage;

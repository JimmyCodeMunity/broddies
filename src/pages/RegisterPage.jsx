import React from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { NavbarDemo } from "../components/Navbar";
import Footer from "../components/Footer";

const RegisterPage = () => {
  return (
    <div className="w-full bg-black py-5">
      <NavbarDemo />
      <div className="w-full h-screen grid place-items-center">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;

import React from "react";
import { NavbarDemo } from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full bg-black py-5">
      <NavbarDemo />
      <div className="w-full h-screen grid place-items-center">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;

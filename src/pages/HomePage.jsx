import React from "react";
import { GoogleGeminiEffectDemo } from "../components/GeminiEffect";
import Shop from "../components/Shop";
import { NavbarDemo } from "../components/Navbar";
import { MacbookScroll } from "../components/Laptop";
import { WelcomeText } from "../components/WelcomeText";
import { Beams } from "../components/Beams";
import CoverFlow from "../components/CoverFlow";
import { ScrollSec } from "../components/ScrollSection";
import Footer from "../components/Footer";
import MiniProducts from "../components/MiniProducts";

const HomePage = () => {
  return (
    <div className="w-full bg-black h-full mx-auto">
      <div className="w-full bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] bg-center bg-cover">
        <NavbarDemo />
        <WelcomeText />
      </div>

      <MacbookScroll />
      {/* <CoverFlow/> */}
      <MiniProducts/>

      <GoogleGeminiEffectDemo />
      <ScrollSec />
      <Beams />
      <Footer/>
    </div>
  );
};

export default HomePage;

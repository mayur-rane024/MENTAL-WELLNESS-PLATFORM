import React from "react";
import Header from "./HomePage/Header";
import Hero from "./HomePage/Hero";
import Benefits from "./HomePage/Benefits";
import Collaboration from "./HomePage/Collaboration";
import Services from "./HomePage/Services";
// import Pricing from "./HomePage/Pricing";
// import Roadmap from "./HomePage/Roadmap";
import Footer from "./HomePage/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
const Home = () => {
  return (
    <div>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        {/* <Collaboration /> */}

        <Services />
        {/* <Pricing /> */}
        {/* <Roadmap /> */}
        <Footer />
      </div>
      <ButtonGradient />
    </div>
  );
};

export default Home;

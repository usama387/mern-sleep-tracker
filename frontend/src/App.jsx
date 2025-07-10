import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./reusable/_components/Navbar";
import FooterSection from "./reusable/_components/Footer";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import { useSelector } from "react-redux";
import SignupPage from "./pages/SignUp";
import SigninPage from "./pages/SignIn";

const App = () => {
  // state from redux to access user information for authentication
  const { user } = useSelector((store) => store?.auth);

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SigninPage />} />
      </Routes>
      <FooterSection />
    </div>
  );
};

export default App;

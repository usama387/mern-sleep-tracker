import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./reusable/_components/Navbar";
import FooterSection from "./reusable/_components/Footer";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import { useSelector } from "react-redux";
import SignupPage from "./pages/SignUp";
import SigninPage from "./pages/SignIn";
import DashboardPage from "./pages/Dashboard";
import DoctorPanel from "./pages/DoctorPanel";

const App = () => {
  // state from redux to access user information for authentication
  const { user } = useSelector((store) => store?.auth);
  
  // Get the current location
  const location = useLocation();

  // Conditionally render Navbar (exclude for /doctor-panel)
  const showNavbar = location.pathname !== "/doctor-panel";

  return (
    <div className="">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/doctor-panel" element={<DoctorPanel />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <DashboardPage />
            ) : (
              <Navigate to="/sign-in" state={{ from: "/dashboard" }} replace />
            )
          }
        />
      </Routes>
      <FooterSection />
    </div>
  );
};

export default App;
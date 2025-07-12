import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./reusable/_components/Navbar";
import FooterSection from "./reusable/_components/Footer";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import { useSelector } from "react-redux";
import SignupPage from "./pages/SignUp";
import SigninPage from "./pages/SignIn";
import DashboardPage from "./pages/Dashboard";
import { Loader2 } from "lucide-react";

const App = () => {
  // state from redux to access user information for authentication
  const { user, loading } = useSelector((store) => store?.auth);

  // if (loading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen">
  //       <Loader2 className="w-8 h-8 animate-spin text-green-500 mb-2" />
  //       <p className="text-green-500 font-semibold">Just a moment...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SigninPage />} />
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

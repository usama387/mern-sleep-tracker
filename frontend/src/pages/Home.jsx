import FAQSection from "@/reusable/_components/FAQ";
import HeroSection from "@/reusable/_components/Hero";
import TestimonialsSection from "@/reusable/_components/Testimonials";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default Home;

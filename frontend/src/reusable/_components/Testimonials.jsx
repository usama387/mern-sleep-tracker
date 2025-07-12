import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Sarah Jameel",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "Somnio completely transformed my sleep routine. I went from tossing and turning for hours to falling asleep within minutes. The personalized insights helped me understand my sleep patterns like never before.",
      improvement: "Sleep quality improved by 85%",
    },
    {
      name: "Syed Noor Uz Zaman Jillani",
      role: "Software Developer",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "As a developer working late hours, my sleep was a mess. Somnio's AI recommendations helped me establish a healthy routine. Now I wake up refreshed and more productive than ever.",
      improvement: "Energy levels increased by 70%",
    },
    {
      name: "Abdul Wasay",
      role: "Instructor",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "The detailed sleep analytics are incredible! Somnio showed me how my workout timing affected my sleep. Now I optimize both my fitness and rest for peak performance.",
      improvement: "Recovery time reduced by 40%",
    },
    {
      name: "Aisha Saleem",
      role: "Business Owner",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "Running a business is stressful, but Somnio helped me prioritize sleep as part of my success strategy. Better sleep means better decisions and more energy for my team.",
      improvement: "Stress levels decreased by 60%",
    },
    {
      name: "Muhammad Affan",
      role: "Teacher",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "I was skeptical about sleep tracking, but Somnio's gentle approach and actionable insights won me over. My students even notice I'm more patient and energetic in class!",
      improvement: "Mood improved by 75%",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-50/30 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-4">
              <Users className="w-3 h-3 mr-1" />
              Trusted by Thousands
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                What Our Users{" "}
              </span>
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of people who have transformed their sleep and
              improved their lives with Somnio.
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  <Card className="border border-green-100 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                      <div className="grid md:grid-cols-3 gap-8 items-center">
                        {/* Quote Icon */}
                        <div className="md:col-span-3 flex justify-center mb-4">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <Quote className="w-8 h-8 text-white" />
                          </motion.div>
                        </div>

                        {/* Testimonial Content */}
                        <div className="md:col-span-2 space-y-6">
                          {/* Stars */}
                          <div className="flex justify-center md:justify-start space-x-1">
                            {[...Array(testimonials[currentIndex].rating)].map(
                              (_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: 0.3 + i * 0.1,
                                  }}
                                >
                                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                </motion.div>
                              )
                            )}
                          </div>

                          {/* Quote */}
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-700 leading-relaxed text-center md:text-left italic"
                          >
                            "{testimonials[currentIndex].text}"
                          </motion.p>

                          {/* Improvement Badge */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex justify-center md:justify-start"
                          >
                            <Badge className="bg-green-500 text-white hover:bg-green-600 px-4 py-2">
                              {testimonials[currentIndex].improvement}
                            </Badge>
                          </motion.div>
                        </div>

                        {/* User Info */}
                        <div className="flex flex-col items-center space-y-4">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            <Avatar className="w-20 h-20 border-4 border-green-200 shadow-lg">
                              <AvatarImage
                                src={
                                  testimonials[currentIndex].avatar ||
                                  "/placeholder.svg"
                                }
                              />
                              <AvatarFallback className="bg-green-100 text-green-700 text-xl font-semibold">
                                {testimonials[currentIndex].name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="text-center"
                          >
                            <h4 className="font-semibold text-gray-900 text-lg">
                              {testimonials[currentIndex].name}
                            </h4>
                            <p className="text-green-600 font-medium">
                              {testimonials[currentIndex].role}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center space-x-4 mt-8"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-green-500 scale-125"
                      : "bg-green-200 hover:bg-green-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {[
              { number: "50K+", label: "Happy Users" },
              { number: "95%", label: "Sleep Improvement" },
              { number: "4.9/5", label: "App Rating" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

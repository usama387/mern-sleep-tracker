import { motion } from "framer-motion";
import { ArrowRight, Moon, Stars, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
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

  const characterVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-xl"
          variants={pulseVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-green-300/20 rounded-full blur-xl"
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-100/30 rounded-full blur-xl"
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-4">
                <Stars className="w-3 h-3 mr-1" />
                Sleep Better, Live Better
              </Badge>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Welcome to{" "}
                </span>
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Somnio
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Transform your nights, elevate your days. Advanced sleep
                tracking technology that helps you understand, optimize, and
                master your sleep for peak performance and wellness.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg"
                >
                  Start Tracking
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-8 py-6 text-lg bg-transparent"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-8 pt-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">
                  Real-time monitoring
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">
                  AI-powered insights
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Character */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={characterVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="relative"
              variants={floatingVariants}
              animate="animate"
            >
              {/* Sleeping Character */}
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                {/* Bed Frame */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-36 bg-gradient-to-r from-amber-100 to-amber-200 rounded-2xl shadow-xl">
                  {/* Bed headboard */}
                  <div className="absolute -top-8 left-0 right-0 h-12 bg-gradient-to-r from-amber-200 to-amber-300 rounded-t-2xl shadow-lg" />
                  {/* Bed legs */}
                  <div className="absolute -bottom-4 left-6 w-3 h-4 bg-amber-300 rounded-b shadow-sm" />
                  <div className="absolute -bottom-4 right-6 w-3 h-4 bg-amber-300 rounded-b shadow-sm" />
                  <div className="absolute -bottom-4 left-1/3 w-3 h-4 bg-amber-300 rounded-b shadow-sm" />
                  <div className="absolute -bottom-4 right-1/3 w-3 h-4 bg-amber-300 rounded-b shadow-sm" />
                </div>

                {/* Mattress */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-72 h-8 bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-md border border-gray-200" />

                {/* Pillow */}
                <div className="absolute bottom-24 left-1/2 transform  translate-x-8 w-28 h-12 bg-gradient-to-b from-white to-gray-50 rounded-full shadow-lg border border-gray-100">
                  {/* Pillow indentation */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-100 rounded-full opacity-50" />
                </div>

                {/* Human Character */}
                <div className="absolute bottom-16 left-1/2 transform  translate-x-4">
                  {/* Head */}
                  <div
                    className="relative w-20 h-20 rounded-full shadow-lg"
                    style={{ backgroundColor: "#fdbcb4" }}
                  >
                    {/* Hair */}
                    <div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-16 rounded-full shadow-sm"
                      style={{
                        background:
                          "linear-gradient(to bottom, #8b4513, #654321)",
                      }}
                    />

                    {/* Hair texture strands */}
                    <div className="absolute -top-3 left-3 w-4 h-8 bg-amber-800 rounded-full opacity-70 transform -rotate-12" />
                    <div className="absolute -top-3 right-3 w-4 h-8 bg-amber-800 rounded-full opacity-70 transform rotate-12" />
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-amber-700 rounded-full opacity-60" />

                    {/* Closed eyes with detailed eyelashes */}
                    <div className="absolute top-6 left-5">
                      <div className="w-3 h-1 bg-gray-800 rounded-full" />
                      {/* Upper eyelashes */}
                      <div className="absolute -top-1 left-0 w-3 h-0.5 bg-gray-700 rounded-full opacity-70" />
                      {/* Lower eyelashes */}
                      <div className="absolute top-1 left-0 w-3 h-0.5 bg-gray-600 rounded-full opacity-40" />
                    </div>
                    <div className="absolute top-6 right-5">
                      <div className="w-3 h-1 bg-gray-800 rounded-full" />
                      <div className="absolute -top-1 right-0 w-3 h-0.5 bg-gray-700 rounded-full opacity-70" />
                      <div className="absolute top-1 right-0 w-3 h-0.5 bg-gray-600 rounded-full opacity-40" />
                    </div>

                    {/* Eyebrows */}
                    <div className="absolute top-4 left-5 w-3 h-1 bg-amber-800 rounded-full opacity-80 transform -rotate-12" />
                    <div className="absolute top-4 right-5 w-3 h-1 bg-amber-800 rounded-full opacity-80 transform rotate-12" />

                    {/* Nose */}
                    <div
                      className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: "#f9a8a0" }}
                    />
                    {/* Nose highlight */}
                    <div className="absolute top-8 left-1/2  translate-x-0.5 w-0.5 h-1 bg-white rounded-full opacity-60" />

                    {/* Peaceful smile */}
                    <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-5 h-2 border-b-2 border-gray-700 rounded-full opacity-90" />

                    {/* Cheek blush */}
                    <div className="absolute top-9 left-2 w-3 h-2 bg-pink-300 rounded-full opacity-30" />
                    <div className="absolute top-9 right-2 w-3 h-2 bg-pink-300 rounded-full opacity-30" />
                  </div>

                  {/* Neck */}
                  <div
                    className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-6 rounded-t-lg"
                    style={{ backgroundColor: "#fdbcb4" }}
                  />

                  {/* Body in comfortable pajamas */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-gradient-to-b from-blue-200 to-blue-300 rounded-t-3xl shadow-lg">
                    {/* Pajama collar */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-3 bg-blue-100 rounded-t-2xl" />

                    {/* Pajama buttons */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />

                    {/* Pajama pattern - small stars */}
                    <div className="absolute top-3 left-4 w-1.5 h-1.5 bg-white rounded-full opacity-40" />
                    <div className="absolute top-6 right-5 w-1 h-1 bg-white rounded-full opacity-40" />
                    <div className="absolute top-10 left-6 w-1.5 h-1.5 bg-white rounded-full opacity-40" />
                    <div className="absolute top-14 right-3 w-1 h-1 bg-white rounded-full opacity-40" />
                    <div className="absolute top-18 left-3 w-1.5 h-1.5 bg-white rounded-full opacity-40" />

                    {/* Left arm - relaxed position */}
                    <div className="absolute top-4 -left-8 w-16 h-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full transform -rotate-20 shadow-md" />
                    {/* Right arm - under pillow */}
                    <div className="absolute top-2 -right-6 w-14 h-7 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full transform rotate-15 shadow-md" />

                    {/* Hands */}
                    <div
                      className="absolute top-6 -left-12 w-5 h-5 rounded-full shadow-sm"
                      style={{ backgroundColor: "#fdbcb4" }}
                    />
                    <div
                      className="absolute top-3 -right-8 w-5 h-5 rounded-full shadow-sm"
                      style={{ backgroundColor: "#fdbcb4" }}
                    />
                  </div>

                  {/* Legs under blanket */}
                  <div className="absolute top-48 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gradient-to-b from-blue-300 to-blue-400 rounded-b-2xl opacity-60" />
                </div>

                {/* Cozy blanket */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-36 h-28 bg-gradient-to-b from-green-200 to-green-300 rounded-t-3xl shadow-xl opacity-95">
                  {/* Blanket folds and texture */}
                  <div className="absolute top-3 left-6 w-24 h-1 bg-green-400 opacity-40 rounded-full" />
                  <div className="absolute top-6 left-8 w-20 h-1 bg-green-400 opacity-40 rounded-full" />
                  <div className="absolute top-9 left-6 w-24 h-1 bg-green-400 opacity-40 rounded-full" />
                  <div className="absolute top-12 left-10 w-16 h-1 bg-green-400 opacity-40 rounded-full" />

                  {/* Blanket edge detail */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-300 to-green-400 rounded-t-3xl" />
                </div>

                {/* Gentle breathing animation */}
                <motion.div
                  className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-24 h-20 rounded-full pointer-events-none"
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Sleep particles */}
                <motion.div
                  className="absolute -top-4 left-1/4 w-2 h-2 bg-green-400 rounded-full opacity-60"
                  animate={{
                    y: [-20, -40, -20],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -top-8 right-1/4 w-1.5 h-1.5 bg-green-500 rounded-full opacity-60"
                  animate={{
                    y: [-15, -35, -15],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute -top-6 left-1/2 w-1 h-1 bg-green-600 rounded-full opacity-60"
                  animate={{
                    y: [-10, -30, -10],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />

                {/* ZZZ sleep text */}
                <motion.div
                  className="absolute -top-12 left-3/4 text-green-500 font-bold text-2xl opacity-70"
                  animate={{
                    y: [-5, -15, -5],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  Z
                </motion.div>
                <motion.div
                  className="absolute -top-18 left-3/4 text-green-500 font-bold text-lg opacity-60"
                  animate={{
                    y: [-8, -18, -8],
                    opacity: [0.6, 0.9, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  Z
                </motion.div>
                <motion.div
                  className="absolute -top-24 left-3/4 text-green-500 font-bold text-sm opacity-50"
                  animate={{
                    y: [-10, -20, -10],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                >
                  Z
                </motion.div>
              </div>

              {/* Moon and stars decoration */}
              <motion.div
                className="absolute -top-16 -right-8"
                animate={{ rotate: [0, 10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Moon className="w-8 h-8 text-green-400 opacity-60" />
              </motion.div>

              <motion.div
                className="absolute -top-8 -left-12"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Stars className="w-6 h-6 text-green-500 opacity-40" />
              </motion.div>
            </motion.div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-200/20 to-green-300/20 rounded-full blur-3xl scale-150 -z-10" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-green-50">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

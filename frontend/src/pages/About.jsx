import { motion } from "framer-motion";
import {
  Target,
  Heart,
  Shield,
  Users,
  Award,
  Moon,
  Brain,
  Activity,
  Clock,
  Smartphone,
  TrendingUp,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutPage = () => {
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

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Advanced machine learning algorithms analyze your sleep patterns to provide personalized recommendations for better rest.",
    },
    {
      icon: Activity,
      title: "Real-Time Monitoring",
      description:
        "Continuous tracking of your sleep stages, heart rate, and movement without any wearable devices required.",
    },
    {
      icon: Smartphone,
      title: "Smart Integration",
      description:
        "Seamlessly connects with your favorite devices and apps to create a comprehensive health ecosystem.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your sleep data is encrypted and secure. We never share your personal information with third parties.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Detailed analytics and trends help you understand your sleep improvement journey over time.",
    },
    {
      icon: Clock,
      title: "Smart Alarms",
      description:
        "Wake up naturally during your lightest sleep phase for a more refreshed and energized morning.",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Happy Users", icon: Users },
    { number: "95%", label: "Sleep Improvement", icon: TrendingUp },
    { number: "4.9/5", label: "App Rating", icon: Star },
    { number: "24/7", label: "Support Available", icon: Clock },
  ];

  const teamMembers = [
    {
      name: "Usama Razaaq",
      role: "Founder & Lead Developer",
      avatar: "/placeholder.svg?height=80&width=80",
      description:
        "Passionate about creating technology that improves people's lives through better sleep.",
    },
    {
      name: "Dr. Sarah Chen",
      role: "Sleep Specialist",
      avatar: "/placeholder.svg?height=80&width=80",
      description:
        "Board-certified sleep medicine physician with 15+ years of experience in sleep disorders.",
    },
    {
      name: "Michael Torres",
      role: "AI Engineer",
      avatar: "/placeholder.svg?height=80&width=80",
      description:
        "Machine learning expert specializing in health data analysis and predictive algorithms.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Health First",
      description:
        "We believe quality sleep is the foundation of a healthy, productive life.",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description:
        "Your personal data deserves the highest level of protection and privacy.",
    },
    {
      icon: Target,
      title: "Continuous Innovation",
      description:
        "We're constantly improving our technology to serve you better.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description:
        "Building a supportive community of people committed to better sleep.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/30">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 bg-green-300/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-6">
                <Moon className="w-3 h-3 mr-1" />
                About Somnio
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Transforming Sleep,{" "}
              </span>
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                One Night at a Time
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 leading-relaxed mb-8"
            >
              We're on a mission to revolutionize how the world sleeps. Through
              cutting-edge technology and personalized insights, we help
              millions achieve the restorative sleep they deserve.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg"
                >
                  Join Our Mission
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
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Card className="border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-4">
                <Target className="w-3 h-3 mr-1" />
                Our Mission
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Why We Built{" "}
                </span>
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Somnio
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Sleep is the foundation of human performance
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  In our fast-paced world, quality sleep has become a luxury
                  rather than a necessity. We recognized that millions of people
                  struggle with sleep issues, affecting their health,
                  productivity, and overall quality of life.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  That's why we created Somnio - to democratize access to
                  advanced sleep science and make personalized sleep
                  optimization available to everyone. Our mission is simple:
                  help every person achieve the restorative sleep they need to
                  live their best life.
                </p>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Evidence-based sleep science
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Personalized recommendations
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Accessible to everyone</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <Card className="border border-green-100 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Heart className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Our Promise
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        "We're committed to helping you achieve better sleep
                        through innovative technology, scientific research, and
                        personalized care. Your journey to better sleep starts
                        here."
                      </p>
                      <div className="pt-4 border-t border-green-100">
                        <p className="text-sm text-green-600 font-medium">
                          - The Somnio Team
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Somnio */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-4">
                <Award className="w-3 h-3 mr-1" />
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  What Makes Somnio{" "}
                </span>
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Different
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've combined cutting-edge technology with sleep science to
                create the most comprehensive sleep tracking and optimization
                platform available.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm h-full">
                    <CardContent className="p-6">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-4">
                <Heart className="w-3 h-3 mr-1" />
                Our Values
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  What We{" "}
                </span>
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Stand For
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <value.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {value.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-green-50/30 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-4">
                <Users className="w-3 h-3 mr-1" />
                Meet the Team
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  The People Behind{" "}
                </span>
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Somnio
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our diverse team of experts is passionate about improving sleep
                health through innovation and technology.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4"
                      >
                        <Avatar className="w-20 h-20 mx-auto border-4 border-green-200 shadow-lg">
                          <AvatarImage
                            src={member.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback className="bg-green-100 text-green-700 text-xl font-semibold">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-green-600 font-medium mb-4">
                        {member.role}
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Ready to Transform Your Sleep?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl mb-8 opacity-90"
            >
              Join thousands of people who have already improved their sleep
              quality with Somnio. Start your journey to better rest tonight.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg font-semibold"
                >
                  Get Started Today
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 hover:border-white px-8 py-6 text-lg bg-transparent"
                >
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

import { motion } from "framer-motion"
import {
  Moon,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

const FooterSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Download", href: "/download" },
  ]

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Bug Reports", href: "/bugs" },
    { name: "Feature Requests", href: "/requests" },
    { name: "Community", href: "/community" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Data Protection", href: "/data-protection" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white relative overflow-hidden">
      {/* Background Pattern - Hidden on smaller screens */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <div className="absolute top-10 left-10 w-24 md:w-32 h-24 md:h-32 border border-green-400 rounded-full" />
        <div className="absolute top-32 right-10 w-20 md:w-24 h-20 md:h-24 border border-green-400 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-32 md:w-40 h-32 md:h-40 border border-green-400 rounded-full" />
        <div className="absolute bottom-40 right-1/3 w-16 md:w-20 h-16 md:h-20 border border-green-400 rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Main Footer Content */}
          <div className="py-8 sm:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="space-y-4 sm:space-y-6">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 group">
                  <motion.div
                    className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Moon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                  </motion.div>
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                    Somnio
                  </span>
                </Link>

                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Transform your nights, elevate your days. The most advanced sleep tracking technology designed to help
                  you achieve perfect rest and peak performance.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center p-2 sm:p-3 bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="text-lg sm:text-xl font-bold text-green-400">50K+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Happy Users</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="text-lg sm:text-xl font-bold text-green-400">4.9★</div>
                    <div className="text-xs sm:text-sm text-gray-400">App Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-green-400">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group text-sm sm:text-base"
                    >
                      <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="flex items-center">
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {link.name}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div variants={itemVariants}>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-green-400">Support</h3>
              <ul className="space-y-2 sm:space-y-3">
                {supportLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group text-sm sm:text-base"
                    >
                      <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="flex items-center">
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {link.name}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">support@somnio.app</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">+1 (555) 123-SLEEP</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">24/7 Support</span>
                </div>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants}>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-green-400">Stay Updated</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-xs sm:text-sm">
                Get the latest sleep tips, app updates, and exclusive content delivered to your inbox.
              </p>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 text-sm sm:text-base"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 text-sm sm:text-base">
                      Subscribe
                    </Button>
                  </motion.div>
                </div>

                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Shield className="w-3 h-3 flex-shrink-0" />
                  <span>We respect your privacy. Unsubscribe anytime.</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 sm:mt-8">
                <h4 className="text-sm font-medium mb-3 sm:mb-4 text-gray-300">Follow Us</h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-8 sm:w-10 h-8 sm:h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-green-500 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <social.icon className="w-4 h-4" />
                      <span className="sr-only">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div variants={itemVariants} className="border-t border-gray-700 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              {/* Developer Credit */}
              <div className="flex items-center space-x-2 text-gray-300">
                <span className="text-xs sm:text-sm">Crafted with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span className="text-xs sm:text-sm">by</span>
                <motion.span
                  className="font-semibold text-green-400 hover:text-green-300 transition-colors duration-200 text-xs sm:text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  Usama Razaaq
                </motion.span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Developer</Badge>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
                {legalLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={link.href} className="hover:text-green-400 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700"
            >
              <p className="text-xs sm:text-sm text-gray-400">
                © {new Date().getFullYear()} Somnio. All rights reserved.
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="block sm:inline">Transforming sleep, one night at a time.</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements - Hidden on smaller screens */}
      <motion.div
        className="absolute top-20 right-10 w-2 h-2 bg-green-400 rounded-full opacity-60 hidden md:block"
        animate={{
          y: [-20, 20, -20],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-1 h-1 bg-green-500 rounded-full opacity-40 hidden md:block"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </footer>
  )
}

export default FooterSection;
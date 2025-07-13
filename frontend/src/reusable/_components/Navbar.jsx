import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/featues/api/authApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const { user } = useSelector((store) => store?.auth);

  const [logoutUser] = useLogoutUserMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const navVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  // to redirect user on top of the web page
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial="initial"
      animate="animate"
      className="sticky top-0 z-50 w-full border-b border-green-200/20 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <motion.div variants={logoVariants}>
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Moon className="h-4 w-4 text-white" />
            </motion.div>
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Somnio
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          variants={navVariants}
          className="hidden md:flex items-center space-x-8"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Link
                to={item.href}
                onClick={handleNavClick}
                className="relative text-sm font-medium text-gray-700 transition-colors hover:text-green-600 group"
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="text-green-600 font-semibold"
                >
                  {item.name}
                </motion.span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Desktop Sign In Button */}
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="hidden md:block items-center space-x-4"
        >
          {!user ? (
            <Link to="/sign-in">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Sign In
                </motion.span>
              </Button>
            </Link>
          ) : user?.role !== "DOCTOR" ? (
            <Button
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleLogout}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.span>
            </Button>
          ) : null}

          {user?.role === "DOCTOR" && (
            <Button
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate("/doctor")}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Proceed to Doctor Panel
              </motion.span>
            </Button>
          )}
        </motion.div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-green-600 hover:bg-green-50"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isOpen ? "close" : "menu"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isOpen ? (
                        <X className="h-5 w-5" />
                      ) : (
                        <Menu className="h-5 w-5" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-white/95 backdrop-blur-md border-green-200/20"
            >
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col space-y-6 mt-8"
              >
                {/* Mobile Logo */}
                <motion.div variants={mobileItemVariants}>
                  <SheetClose asChild>
                    <Link to="/" className="flex items-center space-x-2 group">
                      <motion.div
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <Moon className="h-5 w-5 text-white" />
                      </motion.div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                        Somnio
                      </span>
                    </Link>
                  </SheetClose>
                </motion.div>

                {/* Mobile Navigation Links */}
                <motion.nav className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div key={item.name} variants={mobileItemVariants}>
                      <SheetClose asChild>
                        <Link
                          to={item.href}
                          className="flex items-center py-3 px-4 text-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 group"
                        >
                          <motion.span
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        </Link>
                      </SheetClose>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* Mobile Menu Auth Buttons */}
                <motion.div variants={mobileItemVariants}>
                  <SheetClose asChild>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {!user ? (
                        <Link to="/sign-in">
                          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              Sign In
                            </motion.span>
                          </Button>
                        </Link>
                      ) : user?.role !== "DOCTOR" ? (
                        <Button
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={handleLogout}
                        >
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            Logout
                          </motion.span>
                        </Button>
                      ) : null}

                      {user?.role === "DOCTOR" && (
                        <Button
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => navigate("/doctor")}
                        >
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            Proceed to Doctor Panel
                          </motion.span>
                        </Button>
                      )}
                    </motion.div>
                  </SheetClose>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;

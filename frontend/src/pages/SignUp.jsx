import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  Stethoscope,
  Shield,
  CheckCircle,
  ArrowRight,
  Moon,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "@/featues/api/authApi";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT", // Default role
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [registerUser, { isLoading, isSuccess, error }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account created successfully!");
    }

    if (error) {
      const errorMessage =
        error.data?.message || "Registration failed. Please try again.";
      toast.error("Registration Error", {
        description: errorMessage,
        duration: 5000,
      });

      // Set form errors if available
      if (error.data?.errors) {
        setErrors(error.data.errors);
      }
    }
  }, [isSuccess, error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    const apiFormData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role,
    };

    try {
      await registerUser(apiFormData).unwrap();
      setIsSubmitted(true);
    } catch (err) {
      // Errors are handled in the useEffect above
    }
  };

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

  const roleOptions = [
    {
      value: "PATIENT",
      label: "Patient",
      icon: UserCheck,
      description: "Track your sleep and improve your health",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      value: "DOCTOR",
      label: "Doctor",
      icon: Stethoscope,
      description: "Monitor patients and provide care",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/30 flex items-center justify-center py-12 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-100/30 rounded-full blur-xl"
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center space-x-3 group mb-8"
            >
              <motion.div
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Moon className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Somnio
              </span>
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Create Your{" "}
              </span>
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Account
              </span>
            </h1>

            <p className="text-gray-600 leading-relaxed">
              Start your journey to better sleep and improved health with
              Somnio's advanced tracking technology.
            </p>
          </motion.div>

          {/* Sign Up Form */}
          <motion.div variants={itemVariants}>
            <Card className="border border-green-100 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Account Created!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Welcome to Somnio! Please login to continue.
                    </p>
                    <Button
                      onClick={() => navigate("/sign-in")}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg"
                    >
                      Sign In Now
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Selection */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700">
                        I am a *
                      </Label>
                      <RadioGroup
                        value={formData.role}
                        onValueChange={handleRoleChange}
                        className="grid grid-cols-1 gap-4"
                      >
                        {roleOptions.map((option) => (
                          <motion.div
                            key={option.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Label
                              htmlFor={option.value}
                              className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                formData.role === option.value
                                  ? `${option.borderColor} ${option.bgColor} shadow-md`
                                  : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                              }`}
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                                className="sr-only"
                              />
                              <motion.div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  formData.role === option.value
                                    ? `bg-gradient-to-r ${option.color} text-white`
                                    : "bg-gray-100 text-gray-400"
                                }`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <option.icon className="w-5 h-5" />
                              </motion.div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">
                                  {option.label}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {option.description}
                                </div>
                              </div>
                              {formData.role === option.value && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                                >
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </motion.div>
                              )}
                            </Label>
                          </motion.div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Full Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`pl-10 border-green-200 focus:border-green-400 focus:ring-green-400 ${
                            errors.name
                              ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                              : ""
                          }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-red-600"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email Address *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className={`pl-10 border-green-200 focus:border-green-400 focus:ring-green-400 ${
                            errors.email
                              ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                              : ""
                          }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-red-600"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Create a strong password"
                          className={`pl-10 pr-10 border-green-200 focus:border-green-400 focus:ring-green-400 ${
                            errors.password
                              ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                              : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <AnimatePresence>
                        {errors.password && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-red-600"
                          >
                            {errors.password}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {!errors.password && formData.password && (
                        <div className="text-xs text-gray-500">
                          Password strength:{" "}
                          {formData.password.length >= 8 &&
                          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(
                            formData.password
                          )
                            ? "Strong"
                            : formData.password.length >= 6
                            ? "Medium"
                            : "Weak"}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <ArrowRight className="w-5 h-5 mr-2" />
                        )}
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </motion.div>

                    {/* Privacy Notice */}
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Shield className="w-4 h-4" />
                      <span>Your data is secure and encrypted</span>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sign In Link */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;

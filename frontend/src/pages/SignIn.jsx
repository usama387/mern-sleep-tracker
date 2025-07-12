import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Moon,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/featues/api/authApi";
import { useDispatch } from "react-redux";
import { setAuthLoading } from "@/redux/authSlice";

const SigninPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginUser, { data, isLoading, isSuccess, error }] = useLoginUserMutation();

  // Load saved email from localStorage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  // Handle login success or error
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Welcome back ${data.user.name}!`);

      // Save email to localStorage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email.trim().toLowerCase());
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Set temporary loading state
      dispatch(setAuthLoading(true));

      // Redirect to the original intended page or home
      const from = location.state?.from || "/";
      navigate(from, { replace: true });

      // Allow time for Redux store update
      setTimeout(() => {
        dispatch(setAuthLoading(false));
      }, 100);
    }

    if (error) {
      const errorMessage = error.data?.message || "Login failed. Please try again.";
      toast.error("Login Error", {
        description: errorMessage,
        duration: 5000,
      });

      // Set form errors if available
      if (error.data?.errors) {
        setErrors(error.data.errors);
      }
    }
  }, [isSuccess, error, navigate, location, formData.email, rememberMe, dispatch]);

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

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Basic validation
    if (!formData.email.trim() || !formData.password) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      await loginUser(payload).unwrap();
    } catch (err) {
      // Error handling is done in the useEffect
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
                Sign In to{" "}
              </span>
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Somnio
              </span>
            </h1>

            <p className="text-gray-600 leading-relaxed">
              Continue your journey to better sleep and improved health. Welcome
              back to your sleep sanctuary.
            </p>
          </motion.div>

          {/* Sign In Form */}
          <motion.div variants={itemVariants}>
            <Card className="border border-green-100 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password *
                      </Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className={`pl-10 pr-10 border-green-200 focus:border-green-400 focus:ring-green-400 ${
                          errors.password
                            ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                        className="w-4 h-4 text-green-600 border-green-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
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
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </motion.div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>Your login is secure and encrypted</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Create one here
              </Link>
            </p>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6 text-sm text-gray-500"
          >
            <Link
              to="/privacy"
              className="hover:text-green-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-green-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link to="/help" className="hover:text-green-600 transition-colors">
              Help Center
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SigninPage;
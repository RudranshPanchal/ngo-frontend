import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  ArrowLeft,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";
import api from "../config/api.js";

const SignupPage = () => {
  const { setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (data === "Donor") {
      setFormData((prev) => ({ ...prev, role: "donor" }));
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Validate role first
    if (!formData.role) {
      setError("Please select a role before continuing");
      setLoading(false);
      return;
    }

    // ✅ Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Create user data
    const userData = {
      id: Date.now().toString(),
      fullName: formData.name,
      email: formData.email,
      role: formData.role,
      registrationDate: new Date().toISOString(),
      joinDate: new Date().toLocaleDateString(),
    };

    try {
      // Try backend first
      const response = await api.post(import.meta.env.VITE_BACKEND_URL + "/api/auth/register", {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      const data = response.data;

      if (response.status === 200 && data.success) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        if (data.user) {
          localStorage.setItem("userData", JSON.stringify(data.user));
          setCurrentUser(data.user);
        }
        alert("Account created successfully! Please login to continue.");
        navigate("/login");
        return;
      }
    } catch (err) {
      console.log(
        "Backend unavailable, proceeding with local storage:",
        err.message
      );
    }

    // ✅ Fallback local account creation
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("authToken", "local_" + Date.now());
    localStorage.setItem("role", formData.role);
    setCurrentUser(userData);

    alert("Account created successfully! Please login to continue.");
    navigate("/login");
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-4 sm:py-8">
      <div className="max-w-sm sm:max-w-md w-full mx-auto px-4">
        {/* Back to Home Link */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">Back to Home</span>
          </button>
        </div>

        <Card className="w-full relative overflow-visible border-0 shadow-lg bg-white">
          <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
            {/* Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
                  <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#6b21a8] mb-2">
              Create Account
            </CardTitle>

            {/* Subtitle */}
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
              Join Orbosis Foundation and make a difference
            </p>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 relative px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Role Dropdown */}
              <div className="space-y-1 sm:space-y-2">
                <Label
                  htmlFor="role"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Role
                </Label>

                {data === "Donor" ? (
                  // ✅ Fixed, non-editable "Donor" role
                  <Select value="donor" onValueChange={() => {}}>
                    <SelectTrigger
                      className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md 
                      bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
                    >
                      <SelectValue placeholder="Donor" />
                    </SelectTrigger>
                    <SelectContent className="hidden">
                      <SelectItem value="donor">Donor</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  // ✅ User must select a role manually
                  <Select
                    value={formData.role}
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger
                      className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md 
                      bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    >
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>

                    <SelectContent className="z-[60] bg-white border border-gray-200 rounded-md shadow-lg">
                      <SelectItem value="member" className="bg-white hover:bg-gray-50 text-sm">
                        Member
                      </SelectItem>
                      <SelectItem value="donor" className="bg-white hover:bg-gray-50 text-sm">
                        Donor
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Name Field */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs sm:text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Signup Button */}
              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-lg cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-700 hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Contact Options */}
            <div className="pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Need help? Contact us:
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
                <a
                  href="https://wa.me/918770702092"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-2 text-green-600 hover:text-green-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">WhatsApp</span>
                </a>
                <a
                  href="mailto:Orbosisfoundation@gmail.com"
                  className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">Email</span>
                </a>
                <a
                  href="tel:+918770702092"
                  className="flex items-center justify-center sm:justify-start gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">Call</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;

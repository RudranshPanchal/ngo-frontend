import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { User, Lock, User2Icon, ArrowLeft, MessageCircle, Mail, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.jsx';
import axios from 'axios';

// ✅ Define validation schema using Yup
const schema = yup.object().shape({
  role: yup.string().required('Please select your role'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});
// ✅ Define validation schema using Yup
const forgotSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
});
const LoginPage = () => {
  const { setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);


  // ✅ Integrate react-hook-form with yup validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Handle form submission
  const onSubmit = async (formData) => {
    // console.log('froo', formData)
    setServerError(null);
    setLoading(true);

    try {
      const loginResponse = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/auth/login', formData);
      const { token } = loginResponse.data;

      if (!token) {
        setServerError('Login failed: No token received.');
        return;
      }
      console.log("token-login", token)
      localStorage.setItem("authToken", token)

      const userResponse = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const detailedUserData = userResponse.data.user;

      // 🔥 Save role + user persistently so sidebar stays after refresh
      localStorage.setItem("userData", JSON.stringify(detailedUserData));
      localStorage.setItem("role", detailedUserData.role);

      // update global context
      setCurrentUser(detailedUserData);

      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response) {
        const status = error.response.status;
        const apiMessage = error.response.data?.error || error.response.data?.message;

        if (status === 400) {
          setServerError(apiMessage || 'Role does not match. Please select the correct role.');
        } else if (status === 401) {
          setServerError(apiMessage || 'Invalid email or password.');
        } else if (status === 403) {
          localStorage.setItem("tempEmail", formData.email);
          setServerError('Password change required before proceeding.');
          setTimeout(() => navigate('/change-password'), 2000);
        } else if (status === 404) {
          setServerError(apiMessage || 'User not found. Please sign up first.');
        } else {
          setServerError(apiMessage || `Unexpected error (${status}). Please try again.`);
        }
      } else {
        setServerError('Network error. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onFogatepassword = async () => {
    return hello
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-4 sm:py-8">
      <div className="max-w-sm sm:max-w-md w-full mx-auto px-4">
        {/* Back to Home Link */}
        <div className="mb-4 sm:mb-6">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <Card className="w-full relative overflow-visible border-0 shadow-lg bg-white">
          <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
                  <User2Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#6b21a8] mb-2">
              ORBOSIS Login
            </CardTitle>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Access your account to continue</p>
          </CardHeader>

          {serverError && <p className="ml-6 text-red-500">{serverError}</p>}

          <CardContent className="space-y-4 sm:space-y-6 relative px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">

              {/* Role Dropdown */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="role" className="text-xs sm:text-sm font-medium text-gray-700">
                  Role
                </Label>
                <Select onValueChange={(value) => setValue('role', value)} defaultValue="">
                  <SelectTrigger className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="z-[60] bg-white border border-gray-200 rounded-md shadow-lg">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="donor">Donor</SelectItem>
                    <SelectItem value="beneficiary">Beneficiary</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    className="pl-9 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register('password')}
                    className="pl-9 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-xs sm:text-sm text-purple-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-lg ${loading ? 'opacity-50' : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {/* Signup and Contact Info */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-purple-600 hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Need help? Contact us:
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
                <a href="https://wa.me/918770702092" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
                <a href="mailto:Orbosisfoundation@gmail.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </a>
                <a href="tel:+918770702092" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                  <Phone className="h-5 w-5" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
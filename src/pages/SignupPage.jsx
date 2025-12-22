// import React, { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Button } from "../components/ui/button.jsx";
// import { Input } from "../components/ui/input.jsx";
// import { Label } from "../components/ui/label.jsx";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select.jsx";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card.jsx";
// import {
//   User,
//   Mail,
//   Lock,
//   UserPlus,
//   ArrowLeft,
//   MessageCircle,
//   Phone,
// } from "lucide-react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAppContext } from "../contexts/AppContext.jsx";
// import api from "../config/api.js";

// // Validation Schema with Yup
// const signupSchema = yup.object().shape({
//   role: yup
//     .string()
//     .required("Please select a role")
//     // .oneOf(["member", "donor"], "Invalid role selected"),
//   .oneOf(["member", "donor", "volunteer", "beneficiary"], "Invalid role selected"),

//   name: yup
//     .string()
//     .required("Full name is required")
//     .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
//     .min(2, "Name must be at least 2 characters")
//     .max(100, "Name must not exceed 100 characters")
//     .test('no-multiple-spaces', 'Multiple consecutive spaces are not allowed', function(value) {
//       if (!value) return true;
//       return !/\s{2,}/.test(value);
//     })
//     .transform((value) => value?.trim()),

//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Please enter a valid email address")
//     .matches(
//       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//       "Please enter a valid email format"
//     )
//     .lowercase()
//     .max(255, "Email must not exceed 255 characters"),

//   password: yup
//     .string()
//     .required("Password is required")
//     .min(8, "Password must be at least 8 characters")
//     .max(128, "Password must not exceed 128 characters")
//     .matches(
//       /^(?=.*[a-z])/,
//       "Password must contain at least one lowercase letter"
//     )
//     .matches(
//       /^(?=.*[A-Z])/,
//       "Password must contain at least one uppercase letter"
//     )
//     .matches(/^(?=.*\d)/, "Password must contain at least one number")
//     .matches(
//       /^(?=.*[@$!%*?&#])/,
//       "Password must contain at least one special character (@$!%*?&#)"
//     ),

//   confirmPassword: yup
//     .string()
//     .required("Please confirm your password")
//     .oneOf([yup.ref("password")], "Passwords must match")
// });

// const SignupPage = () => {
//   const { setCurrentUser } = useAppContext();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const data = location.state;

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // React Hook Form with Yup validation
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm({
//     resolver: yupResolver(signupSchema),
//     mode: "onChange", // Validate on change
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       role: data === "Donor" ? "donor" : "",
//     }
//   });

//   useEffect(() => {
//     if (data === "Donor") {
//       setValue("role", "donor");
//     }
//   }, [data, setValue]);

//   const onSubmit = async (formData) => {
//     setLoading(true);
//     setError("");

//     // Create user data
//     const userData = {
//       id: Date.now().toString(),
//       fullName: formData.name,
//       email: formData.email,
//       role: formData.role,
//       registrationDate: new Date().toISOString(),
//       joinDate: new Date().toLocaleDateString(),
//     };

//     console.log("signupda",formData)

//     try {
//       // Try backend first
//       const response = await api.post(import.meta.env.VITE_BACKEND_URL + "/api/auth/register", {
//         fullName: formData.name,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//       });

//       const responseData = response.data;

//       if (response.status === 200 && responseData.success) {
//         if (responseData.token) {
//           localStorage.setItem("authToken", responseData.token);
//         }
//         if (responseData.user) {
//           localStorage.setItem("userData", JSON.stringify(responseData.user));
//           setCurrentUser(responseData.user);
//         }
//         alert("Account created successfully! Please login to continue.");
//         navigate("/login");
//         return;
//       }
//     } catch (err) {
//       console.log(
//         "Backend unavailable, proceeding with local storage:",
//         err.message
//       );
//     }

//     // Fallback local account creation
//     localStorage.setItem("userData", JSON.stringify(userData));
//     localStorage.setItem("authToken", "local_" + Date.now());
//     localStorage.setItem("role", formData.role);
//     setCurrentUser(userData);

//     alert("Account created successfully! Please login to continue.");
//     navigate("/login");
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-4 sm:py-8">
//       <div className="max-w-sm sm:max-w-md w-full mx-auto px-4">
//         {/* Back to Home Link */}
//         <div className="mb-4 sm:mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
//           >
//             <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
//             <span className="text-xs sm:text-sm font-medium">Back to Home</span>
//           </button>
//         </div>

//         <Card className="w-full relative overflow-visible border-0 shadow-lg bg-white">
//           <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
//             {/* Icon */}
//             <div className="flex justify-center mb-4 sm:mb-6">
//               <div className="relative">
//                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
//                   <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
//                 </div>
//               </div>
//             </div>

//             {/* Title */}
//             <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#6b21a8] mb-2">
//               Create Account
//             </CardTitle>

//             {/* Subtitle */}
//             <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
//               Join Orbosis Foundation and make a difference
//             </p>
//           </CardHeader>

//           <CardContent className="space-y-4 sm:space-y-6 relative px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Signup Form */}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
//               {/* Role Dropdown */}
//               <div className="space-y-1 sm:space-y-2">
//                 <Label
//                   htmlFor="role"
//                   className="text-xs sm:text-sm font-medium text-gray-700"
//                 >
//                   Role *
//                 </Label>

//                 {data === "Donor" ? (
//                   // Fixed, non-editable "Donor" role
//                   <Controller
//                     name="role"
//                     control={control}
//                     render={({ field }) => (
//                       <Select value="donor" onValueChange={() => {}}>
//                         {/* <SelectTrigger
//                           className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md 
//                           bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
//                         >
//                           <SelectValue placeholder="Donor" />
//                         </SelectTrigger>
//                         <SelectContent className="hidden">
//                           <SelectItem value="donor">Donor</SelectItem>
//                         </SelectContent> */}
//                                                   <SelectContent className="z-[60] bg-white border border-gray-200 rounded-md shadow-lg">
//                             <SelectItem value="member" className="bg-white hover:bg-gray-50 text-sm">Member</SelectItem>
//                             <SelectItem value="donor" className="bg-white hover:bg-gray-50 text-sm">Donor</SelectItem>
//                             <SelectItem value="volunteer" className="bg-white hover:bg-gray-50 text-sm">Volunteer</SelectItem>
//                             <SelectItem value="beneficiary" className="bg-white hover:bg-gray-50 text-sm">Beneficiary</SelectItem>
//                           </SelectContent>

//                       </Select>
//                     )}
//                   />
//                 ) : (
//                   // User must select a role manually
//                   <Controller
//                     name="role"
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger
//                           className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md 
//                           bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
//                         >
//                           <SelectValue placeholder="Select role" />
//                         </SelectTrigger>

//                         <SelectContent className="z-[60] bg-white border border-gray-200 rounded-md shadow-lg">
//                           <SelectItem value="member" className="bg-white hover:bg-gray-50 text-sm">
//                             Member
//                           </SelectItem>
//                           <SelectItem value="donor" className="bg-white hover:bg-gray-50 text-sm">
//                             Donor
//                           </SelectItem>
//                           <SelectItem value="Volenteer" className="bg-white hover:bg-gray-50 text-sm">
//                             Volenteer
//                           </SelectItem>
//                           <SelectItem value="Beneficiaries" className="bg-white hover:bg-gray-50 text-sm">
//                             Beneficiariary
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 )}
//                 {errors.role && (
//                   <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>
//                 )}
//               </div>

//               {/* Name Field */}
//               <div className="space-y-1 sm:space-y-2">
//                 <Label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-700">
//                   Full Name *
//                 </Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
//                   <Controller
//                     name="name"
//                     control={control}
//                     render={({ field }) => (
//                       <Input
//                         {...field}
//                         id="name"
//                         type="text"
//                         placeholder="Enter your full name"
//                         className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
//                         onChange={(e) => {
//                           const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
//                           field.onChange(value);
//                         }}
//                       />
//                     )}
//                   />
//                 </div>
//                 {errors.name && (
//                   <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
//                 )}
//               </div>

//               {/* Email Field */}
//               <div className="space-y-1 sm:space-y-2">
//                 <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
//                   Email *
//                 </Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
//                   <Controller
//                     name="email"
//                     control={control}
//                     render={({ field }) => (
//                       <Input
//                         {...field}
//                         id="email"
//                         type="email"
//                         placeholder="Enter your email"
//                         className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
//                         onChange={(e) => {
//                           const value = e.target.value.replace(/[^a-z0-9@._-]/gi, "").toLowerCase();
//                           field.onChange(value);
//                         }}
//                       />
//                     )}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="space-y-1 sm:space-y-2">
//                 <Label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700">
//                   Password *
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
//                   <Controller
//                     name="password"
//                     control={control}
//                     render={({ field }) => (
//                       <Input
//                         {...field}
//                         id="password"
//                         type="password"
//                         placeholder="Enter your password"
//                         className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
//                       />
//                     )}
//                   />
//                 </div>
//                 {errors.password && (
//                   <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
//                 )}
//                 {!errors.password && (
//                   <p className="text-xs text-gray-500 mt-1">
//                     Must include uppercase, lowercase, number, and special character
//                   </p>
//                 )}
//               </div>

//               {/* Confirm Password Field */}
//               <div className="space-y-1 sm:space-y-2">
//                 <Label htmlFor="confirmPassword" className="text-xs sm:text-sm font-medium text-gray-700">
//                   Confirm Password *
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
//                   <Controller
//                     name="confirmPassword"
//                     control={control}
//                     render={({ field }) => (
//                       <Input
//                         {...field}
//                         id="confirmPassword"
//                         type="password"
//                         placeholder="Confirm your password"
//                         className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
//                       />
//                     )}
//                   />
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
//                 )}
//               </div>

//               {/* Signup Button */}
//               <div>
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-lg cursor-pointer"
//                 >
//                   {loading ? (
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       <span>Creating Account...</span>
//                     </div>
//                   ) : (
//                     "Sign Up"
//                   )}
//                 </Button>
//               </div>
//             </form>

//             {/* Login Link */}
//             <div className="text-center">
//               <p className="text-xs sm:text-sm text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="text-purple-600 hover:text-purple-700 hover:underline font-medium"
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </div>

//             {/* Contact Options */}
//             <div className="pt-4 sm:pt-6 border-t border-gray-200">
//               <p className="text-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
//                 Need help? Contact us:
//               </p>
//               <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
//                 <a
//                   href="https://wa.me/918770702092"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-center sm:justify-start gap-2 text-green-600 hover:text-green-700 transition-colors"
//                 >
//                   <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
//                   <span className="text-xs sm:text-sm">WhatsApp</span>
//                 </a>
//                 <a
//                   href="mailto:Orbosisfoundation@gmail.com"
//                   className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-700 transition-colors"
//                 >
//                   <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
//                   <span className="text-xs sm:text-sm">Email</span>
//                 </a>
//                 <a
//                   href="tel:+918770702092"
//                   className="flex items-center justify-center sm:justify-start gap-2 text-purple-600 hover:text-purple-700 transition-colors"
//                 >
//                   <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
//                   <span className="text-xs sm:text-sm">Call</span>
//                 </a>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import SuccessModal from "../components/successModal.jsx";
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

// Validation Schema with Yup (normalize role to lowercase)
const signupSchema = yup.object().shape({
  role: yup
    .string()
    .transform((val) => (val ? String(val).toLowerCase() : val))
    .required("Please select a role")
    .oneOf(
      ["member", "donor", "volunteer", "beneficiary"],
      "Invalid role selected"
    ),

  name: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .test(
      "no-multiple-spaces",
      "Multiple consecutive spaces are not allowed",
      function (value) {
        if (!value) return true;
        return !/\s{2,}/.test(value);
      }
    )
    .transform((value) => value?.trim()),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format"
    )
    .lowercase()
    .max(255, "Email must not exceed 255 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .matches(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .matches(/^(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /^(?=.*[@$!%*?&#])/,
      "Password must contain at least one special character (@$!%*?&#)"
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const ROLE_DISPLAY = {
  member: "Member",
  donor: "Donor",
  volunteer: "Volunteer",
  beneficiary: "Beneficiary",
};

const SignupPage = () => {
  const { setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [showSuccess, setShowSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // React Hook Form with Yup validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: data === "Donor" ? "donor" : "",
    },
  });

  // Ensure role is set when coming from Donor flow
  useEffect(() => {
    if (data === "Donor") {
      setValue("role", "donor", { shouldValidate: true, shouldDirty: true });
    }
  }, [data, setValue]);

  // Debug: watch role changes (temporary) - remove in production if you want
  useEffect(() => {
    const subscription = watch((val) => {
      // prints form values (role included)
      console.log("FORM WATCH:", val);
    });
    return () => subscription.unsubscribe?.();
  }, [watch]);

  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");

    // Normalize role for backend if backend expects capitalized labels
    //------------------------------------- const backendRole = ROLE_DISPLAY[formData.role] || formData.role;

    // Create user data (local fallback)
    const userData = {
      id: Date.now().toString(),
      fullName: formData.name,
      email: formData.email,
      role: formData.role,
      registrationDate: new Date().toISOString(),
      joinDate: new Date().toLocaleDateString(),
    };

    console.log("Submitting form:", formData);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      const responseData = response.data;

      if (response.status === 200 && responseData.success) {
        // ✅ SHOW SUCCESS MODAL
        setShowSuccess(true);

        // optional: store auth data
        if (responseData.token) {
          localStorage.setItem("authToken", responseData.token);
        }
        if (responseData.user) {
          localStorage.setItem("userData", JSON.stringify(responseData.user));
          setCurrentUser(responseData.user);
        }

        // ✅ AUTO REDIRECT AFTER 2 SECONDS
        setTimeout(() => {
          navigate("/login");
        }, 2000);

        return;
      } else {
        setError(responseData.message || "Registration failed on server");
      }
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);

      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );

      setLoading(false);
      return; // ⛔ NO LOCAL FALLBACK
    } finally {
      setLoading(false);
    }
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
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
                  <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
            </div>

            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#6b21a8] mb-2">
              Create Account
            </CardTitle>

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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {/* Role Dropdown */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="role" className="text-xs sm:text-sm font-medium text-gray-700">
                  Role *
                </Label>

                {data === "Donor" ? (
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => {
                      // Ensure the form role is set to donor (synchronous safe set)
                      if (!field.value) {
                        field.onChange("donor");
                      }

                      return (
                        <Select value={field.value || "donor"} onValueChange={field.onChange}>
                          <SelectTrigger
                            className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
                            aria-disabled="true"
                          >
                            <SelectValue placeholder="Donor" />
                          </SelectTrigger>

                          <SelectContent className="hidden">
                            <SelectItem value="donor">Donor</SelectItem>
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                ) : (
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>

                        <SelectContent className="z-[60] bg-white border border-gray-200 rounded-md shadow-lg">
                          {/* <SelectItem value="member" className="bg-white hover:bg-gray-50 text-sm">Member</SelectItem> */}
                          <SelectItem value="donor" className="bg-white hover:bg-gray-50 text-sm">Donor</SelectItem>
                          {/* <SelectItem value="volunteer" className="bg-white hover:bg-gray-50 text-sm">Volunteer</SelectItem> */}
                          <SelectItem value="beneficiary" className="bg-white hover:bg-gray-50 text-sm">Beneficiary</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}

                {errors.role && (
                  <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>
                )}
              </div>

              {/* Name */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^a-z0-9@._-]/gi, "").toLowerCase();
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                    )}
                  />
                </div>
                {errors.password ? <p className="text-xs text-red-500 mt-1">{errors.password.message}</p> : <p className="text-xs text-gray-500 mt-1">Must include uppercase, lowercase, number, and special character</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs sm:text-sm font-medium text-gray-700">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                    )}
                  />
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
              </div>

              {/* Submit */}
              <div>
                <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-lg cursor-pointer">
                  {loading ? <div className="flex items-center gap-2"><div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Creating Account...</span></div> : "Sign Up"}
                </Button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600">Already have an account? <Link to="/login" className="text-purple-600 hover:text-purple-700 hover:underline font-medium">Sign in here</Link></p>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Need help? Contact us:</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
                <a href="https://wa.me/918770702092" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 text-green-600 hover:text-green-700 transition-colors"><MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" /><span className="text-xs sm:text-sm">WhatsApp</span></a>
                <a href="mailto:Orbosisfoundation@gmail.com" className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-700 transition-colors"><Mail className="h-4 w-4 sm:h-5 sm:w-5" /><span className="text-xs sm:text-sm">Email</span></a>
                <a href="tel:+918770702092" className="flex items-center justify-center sm:justify-start gap-2 text-purple-600 hover:text-purple-700 transition-colors"><Phone className="h-4 w-4 sm:h-5 sm:w-5" /><span className="text-xs sm:text-sm">Call</span></a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <SuccessModal
        open={showSuccess}
        onClose={() => navigate("/login")}
      />
    </div>
  );
};

export default SignupPage;

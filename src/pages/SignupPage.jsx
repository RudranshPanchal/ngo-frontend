import React,{useState} from "react";
import * as yup from "yup";

// hooks & context
import { useSignup } from "../hooks/useSignup";
import { useAppContext } from "../contexts/AppContext";

// react-router
import { useNavigate, useLocation, Link } from "react-router-dom";

// react-hook-form
import { Controller } from "react-hook-form";

// icons
import {
  User,
  Mail,
  Lock,
  UserPlus,
  ArrowLeft,
  MessageCircle,
  Phone,
} from "lucide-react";

// UI components
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


// ✅ SCHEMA YAHI RAHEGA
export const signupSchema = yup.object().shape({
  role: yup
    .string()
    .transform((val) => (val ? String(val).toLowerCase() : val))
    .required("Please select a role")
    .oneOf(["member", "donor", "volunteer", "beneficiary"], "Invalid role selected"),

  name: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .min(2)
    .max(100)
    .transform((v) => v?.trim()),

  email: yup
    .string()
    .required("Email is required")
    .email()
    .lowercase()
    .max(255),

 password: yup.string().when("step", {
  is: "password",
  then: (s) =>
    s.required("Password is required")
     .min(8)
     .matches(/^(?=.*[a-z])/)
     .matches(/^(?=.*[A-Z])/)
     .matches(/^(?=.*\d)/)
     .matches(/^(?=.*[@$!%*?&#])/),
  otherwise: (s) => s.notRequired(),
}),

confirmPassword: yup.string().when("step", {
  is: "password",
  then: (s) =>
    s.required("Confirm password")
     .oneOf([yup.ref("password")], "Passwords must match"),
  otherwise: (s) => s.notRequired(),
}),
});

const SignupPage = () => {
  const { setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const { state: data } = useLocation();
  //  const [step, setStep] = useState("details"); 
// details | otp | password

const [otp, setOtp] = useState("");
const [verifiedEmail, setVerifiedEmail] = useState("");

  const {
  control,
  handleSubmit,
  formState: { errors },
  loading,
  error,
  step,       // 👈 yahan se
  setStep,
  onSubmit,
} = useSignup({ 
    data,
    setCurrentUser,
    navigate,
    signupSchema, // 👈 schema hook ko pass ho rahi
  });

  // 👇 ISKE BAAD TUMHARA PURA JSX SAME RAHEGA
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

  {/* ================= STEP 1 : ROLE + NAME + EMAIL ================= */}
  {step === "details" && (
    <>
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
              if (!field.value) field.onChange("donor");

              return (
                <Select value={field.value || "donor"} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm cursor-not-allowed">
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
                <SelectTrigger className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="z-[60] bg-white border rounded-md shadow-lg">
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="donor">Donor</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                  <SelectItem value="beneficiary">Beneficiary</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        )}
      </div>

      {/* Name */}
      <div className="space-y-1 sm:space-y-2">
        <Label className="text-xs sm:text-sm font-medium text-gray-700">Full Name *</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter your full name"
              onChange={(e) =>
                field.onChange(e.target.value.replace(/[^A-Za-z\s]/g, ""))
              }
            />
          )}
        />
      </div>

      {/* Email */}
      <div className="space-y-1 sm:space-y-2">
        <Label className="text-xs sm:text-sm font-medium text-gray-700">Email *</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              placeholder="Enter your email"
              onChange={(e) =>
                field.onChange(e.target.value.toLowerCase())
              }
            />
          )}
        />
      </div>
    </>
  )}

  {/* ================= STEP 2 : OTP ================= */}
 {step === "otp" && (
  <Controller
    name="otp"
    control={control}
    render={({ field }) => (
      <Input {...field} placeholder="Enter 6 digit OTP" />
    )}
  />
)}

  {/* ================= STEP 3 : PASSWORD ================= */}
  {step === "password" && (
    <>
      {/* Password */}
      <div className="space-y-1 sm:space-y-2">
        <Label className="text-xs sm:text-sm font-medium text-gray-700">Password *</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input {...field} type="password" placeholder="Enter password" />
          )}
        />
      </div>

      {/* Confirm Password */}
      <div className="space-y-1 sm:space-y-2">
        <Label className="text-xs sm:text-sm font-medium text-gray-700">
          Confirm Password *
        </Label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input {...field} type="password" placeholder="Confirm password" />
          )}
        />
      </div>
    </>
  )}

  {/* ================= BUTTON ================= */}
  <Button
  type="submit"
  disabled={loading}
  className="w-full bg-purple-600 text-white flex items-center justify-center gap-2"
>
  {loading && (
    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  )}

  {!loading && step === "details" && "Send OTP"}
  {!loading && step === "otp" && "Verify OTP"}
  {!loading && step === "password" && "Create Account"}

  {loading && step === "details" && "Sending OTP..."}
  {loading && step === "otp" && "Verifying OTP..."}
  {loading && step === "password" && "Creating Account..."}
</Button>


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
    </div>
  );
};


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
// import api from "../config/api.js";

// /* ================= VALIDATION ================= */
// const signupSchema = yup.object().shape({
//   role: yup.string().required("Please select a role"),
//   name: yup
//     .string()
//     .required("Full name is required")
//     .matches(/^[A-Za-z\s]+$/, "Only letters and spaces allowed")
//     .min(2)
//     .max(100),
//   email: yup.string().required("Email is required").email("Invalid email"),
// });

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const data = location.state;

//   const [step, setStep] = useState("signup"); // signup | otp | password
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [otp, setOtp] = useState("");
//   const [registeredEmail, setRegisteredEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm({
//     resolver: yupResolver(signupSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       role: data === "Donor" ? "donor" : "",
//     },
//   });

//   useEffect(() => {
//     if (data === "Donor") {
//       setValue("role", "donor");
//     }
//   }, [data, setValue]);

//   /* ================= REGISTER ================= */
//   const onSubmit = async (formData) => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
//         {
//           fullName: formData.name,
//           email: formData.email,
//           role: formData.role,
//         }
//       );

//       if (res.data?.success) {
//         setRegisteredEmail(formData.email);
//         setStep("otp");
//         alert("OTP sent to your email");
//       } else {
//         setError(res.data?.message || "Registration failed");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= VERIFY OTP ================= */
//   const handleVerifyOtp = async () => {
//     if (!otp) return alert("Enter OTP");

//     setLoading(true);
//     setError("");

//     try {
//       await api.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email-otp`,
//         { email: registeredEmail, otp }
//       );

//       setStep("password");
//       alert("Email verified successfully");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= CREATE PASSWORD ================= */
//   const handleCreatePassword = async () => {
//     if (!password || !confirmPassword)
//       return alert("Both fields required");

//     if (password !== confirmPassword)
//       return alert("Passwords do not match");

//     setLoading(true);
//     setError("");

//     try {
//       await api.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/auth/create-password`,
//         { email: registeredEmail, password, confirmPassword }
//       );

//       alert("Password created successfully");
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-6">
//       <div className="max-w-md w-full px-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 mb-4"
//         >
//           <ArrowLeft size={16} /> Back
//         </button>

//         <Card className="shadow-lg border-0 bg-white">
//           <CardHeader className="text-center">
//             <div className="flex justify-center mb-4">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full flex items-center justify-center">
//                 <UserPlus className="text-white w-8 h-8" />
//               </div>
//             </div>

//             <CardTitle className="text-2xl font-bold text-purple-700">
//               {step === "signup" && "Create Account"}
//               {step === "otp" && "Verify Email"}
//               {step === "password" && "Create Password"}
//             </CardTitle>

//             <p className="text-gray-600 text-sm mt-1">
//               Join Orbosis Foundation and make a difference
//             </p>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             {error && (
//               <div className="bg-red-50 text-red-600 p-2 rounded text-sm">
//                 {error}
//               </div>
//             )}

//             {/* ================= SIGNUP ================= */}
//             {step === "signup" && (
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <div>
//                   <Label>Role</Label>
//                   <Controller
//                     name="role"
//                     control={control}
//                     render={({ field }) => (
//                       <Select value={field.value} onValueChange={field.onChange}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select role" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="member">Member</SelectItem>
//                           <SelectItem value="donor">Donor</SelectItem>
//                           <SelectItem value="volunteer">Volunteer</SelectItem>
//                           <SelectItem value="beneficiary">Beneficiary</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>

//                 <div>
//                   <Label>Full Name</Label>
//                   <Controller
//                     name="name"
//                     control={control}
//                     render={({ field }) => <Input {...field} />}
//                   />
//                 </div>

//                 <div>
//                   <Label>Email</Label>
//                   <Controller
//                     name="email"
//                     control={control}
//                     render={({ field }) => <Input {...field} />}
//                   />
//                 </div>

//                 <Button className="w-full bg-purple-600 text-white">
//                   {loading ? "Creating..." : "Sign Up"}
//                 </Button>
//               </form>
//             )}

//             {/* ================= OTP ================= */}
//             {step === "otp" && (
//               <div className="space-y-4">
//                 <p className="text-center text-sm text-gray-600">
//                   OTP sent to <b>{registeredEmail}</b>
//                 </p>

//                 <Input
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   placeholder="Enter OTP"
//                   className="text-center tracking-widest"
//                 />

//                 <Button
//                   onClick={handleVerifyOtp}
//                   className="w-full bg-green-600 text-white"
//                 >
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </Button>
//               </div>
//             )}

//             {/* ================= CREATE PASSWORD ================= */}
//             {step === "password" && (
//               <div className="space-y-4">
//                 <Input
//                   type="password"
//                   placeholder="New Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <Input
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />

//                 <Button
//                   onClick={handleCreatePassword}
//                   className="w-full bg-purple-600 text-white"
//                 >
//                   {loading ? "Saving..." : "Create Password"}
//                 </Button>
//               </div>
//             )}

//             <p className="text-center text-sm mt-4">
//               Already have an account?{" "}
//               <Link to="/login" className="text-purple-600 font-medium">
//                 Login
//               </Link>
//             </p>

//             <div className="pt-4 border-t text-center text-sm text-gray-600">
//               Need help?
//               <div className="flex justify-center gap-4 mt-2">
//                 <a href="mailto:Orbosisfoundation@gmail.com">
//                   <Mail size={18} />
//                 </a>
//                 <a href="tel:+918770702092">
//                   <Phone size={18} />
//                 </a>
//                 <a href="https://wa.me/918770702092">
//                   <MessageCircle size={18} />
//                 </a>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

 export default SignupPage;

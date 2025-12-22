// import React, { useState } from "react";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { Label } from "../components/ui/label";
// import { sendOtp, verifyOtp, resetPassword } from "../utils/emailService.js";

// const ForgotPassword = () => {

  
//   const [step, setStep] = useState("email");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   //  Send OTP
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setSuccess(""); setError("");

//     try {
//       const res = await sendOtp(email);
//       setSuccess(res.data.message);
//       setStep("otp");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   //  Verify OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setSuccess(""); setError("");

//     try {
//       const res = await verifyOtp(email, otp);
//       setSuccess(res.data.message);
//       setStep("reset");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     }
//   };

//   //  Reset Password
//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setSuccess(""); setError("");

//     const newPassword = e.target.newPassword.value;
//     const confirm_password = e.target.confirm_password.value;

//     if (newPassword !== confirm_password) {
//       return setError("Passwords do not match");
//     }

//     try {
//       const res = await resetPassword(email, newPassword, confirm_password);
//       setSuccess(res.data.message);
//       setStep("done");
//     } catch (err) {
//       setError(err.response?.data?.message || "Reset failed");
//     }
//   };

//   return (
          
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
//       <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
//         <h2 className="text-xl font-bold mb-3">Forgot Password</h2>

//         {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//         {/* EMAIL STEP */}
//         {step === "email" && (
//           <form onSubmit={handleSendOtp} className="space-y-4">
//             <Label>Email</Label>
//             <Input type="email" required onChange={(e) => setEmail(e.target.value)} />
//             <Button className="w-full bg-purple-600 text-white">Send OTP</Button>
//           </form>
//         )}

//         {/* OTP STEP */}
//         {step === "otp" && (
//           <form onSubmit={handleVerifyOtp} className="space-y-4">
//             <Label>Enter OTP</Label>
//             <Input required onChange={(e) => setOtp(e.target.value)} />
//             <Button className="w-full bg-purple-600 text-white">Verify OTP</Button>
//           </form>
//         )}

//         {/* RESET PASSWORD */}
//         {step === "reset" && (
//           <form onSubmit={handleResetPassword} className="space-y-4">
//             <Label>New Password</Label>
//             <Input type="password" name="newPassword" required />

//             <Label>Confirm Password</Label>
//             <Input type="password" name="confirm_password" required />

//             <Button className="w-full bg-purple-600 text-white">Reset Password</Button>
//           </form>
//         )}

//         {/* DONE */}
//         {step === "done" && (
//           <div className="text-center">
//             <p className="text-green-600 font-semibold mb-4">Password reset successfully!</p>
//             <Button className="w-full bg-purple-600 text-white" onClick={() => (window.location.href = "/login")}>
//               Go to Login
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { sendOtp, verifyOtp, resetPassword } from "../utils/emailService.js";

const ForgotPassword = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // 🔵 SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!role) return setError("Please select your role.");

    try {
      const res = await sendOtp(email, role);
      setSuccess(res.data.message);
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // 🔵 RESEND OTP (same as send OTP)
  const handleResendOtp = async () => {
    setSuccess("");
    setError("");

    try {
      const res = await sendOtp(email, role);
      setSuccess("OTP sent again to your email.");
    } catch (err) {
      setError("Failed to resend OTP.");
    }
  };

  // 🟣 VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await verifyOtp(email, otp, role);
      setSuccess(res.data.message);
      setStep("reset");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  // 🟢 RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    const newPassword = e.target.newPassword.value;
    const confirm_password = e.target.confirm_password.value;

    if (newPassword !== confirm_password) {
      return setError("Passwords do not match");
    }

    try {
      const res = await resetPassword(email, newPassword, role);
      setSuccess(res.data.message);
      setStep("done");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-3">Forgot Password</h2>

        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* STEP 1: ROLE + EMAIL */}
        {step === "email" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            
            <Label>Role</Label>
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
              <option value="member">Member</option>
            </select>

            <Label>Email</Label>
            <Input type="email" required onChange={(e) => setEmail(e.target.value)} />

            <Button className="w-full bg-purple-600 text-white">Send OTP</Button>
          </form>
        )}

        {/* STEP 2: OTP + RESEND */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <Label>Enter OTP</Label>
            <Input required onChange={(e) => setOtp(e.target.value)} />

            <Button className="w-full bg-purple-600 text-white">Verify OTP</Button>

            {/* 🔥 RESEND BUTTON */}
            <Button
              type="button"
              onClick={handleResendOtp}
              className="w-full bg-gray-200 text-gray-700 mt-2 hover:bg-gray-300"
            >
              Resend OTP
            </Button>
          </form>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Label>New Password</Label>
            <Input type="password" name="newPassword" required />

            <Label>Confirm Password</Label>
            <Input type="password" name="confirm_password" required />

            <Button className="w-full bg-purple-600 text-white">Reset Password</Button>
          </form>
        )}

        {/* STEP 4: DONE */}
        {step === "done" && (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">Password reset successfully!</p>
            <Button
              className="w-full bg-purple-600 text-white"
              onClick={() => (window.location.href = "/login")}
            >
              Go to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

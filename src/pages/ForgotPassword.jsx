import React, { useState,useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { sendOtp, verifyOtp, resetPassword } from "../services/verificationService.js";


const ForgotPassword = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
  if (cooldown <= 0) return;

  const timer = setInterval(() => {
    setCooldown((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [cooldown]);

  // 🔵 SEND OTP
const handleSendOtp = async (e) => {
  e.preventDefault();

  if (isSending) return; // 🚫 double click block
  setError("");

  if (!role) {
    setError("Please select role");
    return;
  }

  try {
    setIsSending(true); // 🔒 lock button immediately
    await sendOtp(email, role);

    setStep("otp");
    setCooldown(30);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to send OTP");
  } finally {
    setIsSending(false); // 🔓 unlock (cooldown still works)
  }
};


  //  RESEND OTP 
  const handleResendOtp = async () => {
  if (cooldown > 0 || isSending) return;

  try {
    setIsSending(true);
    await sendOtp(email, role);

    setCooldown(30);
    setError("");
  } catch (err) {
    setError(err.response?.data?.message || "Failed to resend OTP");
  } finally {
    setIsSending(false);
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

            {/* <Button className="w-full bg-purple-600 text-white">Send OTP</Button> */}
          <Button
  className="w-full bg-purple-600 text-white"
  disabled={cooldown > 0 || isSending}
>
  {isSending
    ? "Sending OTP..."
    : cooldown > 0
    ? `Please wait ${cooldown}s`
    : "Send OTP"}
</Button>

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
  disabled={cooldown > 0}
  className={`w-full mt-2 ${
    cooldown > 0
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
  }`}
>
  {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
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

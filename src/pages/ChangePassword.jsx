import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");
  const [confirmNew, setConfirmNew] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -------- PASSWORD VALIDATION --------
  const passwordRules = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[@$!%*?&]/.test(newPassword),
  };

  const allValid = Object.values(passwordRules).every((r) => r === true);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!allValid) {
      return setError("Password does not meet the required criteria");
    }

    if (newPassword !== confirmNew) {
      return setError("New passwords do not match");
    }

    const email = localStorage.getItem("tempEmail");

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/changePassword",
        { email, oldPassword, newPassword }
      );

      setSuccess("Password updated successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        <form onSubmit={submit} className="space-y-4">
          
          {/* OLD PASSWORD */}
          <div>
            <Label>Old Password</Label>
            <Input
              type="password"
              required
              onChange={(e) => setOld(e.target.value)}
            />
          </div>

          {/* NEW PASSWORD */}
          <div>
            <Label>New Password</Label>
            <Input
              type="password"
              required
              onChange={(e) => setNew(e.target.value)}
            />

            {/* PASSWORD RULES DISPLAY */}
            <div className="text-xs mt-2 space-y-1">
              <p className={passwordRules.length ? "text-green-600" : "text-red-500"}>
                • Minimum 8 characters
              </p>
              <p className={passwordRules.uppercase ? "text-green-600" : "text-red-500"}>
                • At least one uppercase letter
              </p>
              <p className={passwordRules.lowercase ? "text-green-600" : "text-red-500"}>
                • At least one lowercase letter
              </p>
              <p className={passwordRules.number ? "text-green-600" : "text-red-500"}>
                • At least one number
              </p>
              <p className={passwordRules.special ? "text-green-600" : "text-red-500"}>
                • At least one special character (@$!%*?&)
              </p>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              required
              onChange={(e) => setConfirmNew(e.target.value)}
            />
            {confirmNew && newPassword !== confirmNew && (
              <p className="text-red-500 text-xs">Passwords do not match</p>
            )}
          </div>

          <Button
            disabled={!allValid || newPassword !== confirmNew}
            className={`w-full text-white ${
              allValid && newPassword === confirmNew
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Update Password
          </Button>
        </form>
      </div>

      {/* Fade Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.45s ease-out;
        }
      `}</style>
    </div>
  );
}

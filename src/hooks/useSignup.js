import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {
  sendSignupOtp,
  verifySignupOtp,
  createPassword,
} from "../services/verificationService.js";

export const useSignup = ({
  data,
  navigate,
  signupSchema,
}) => {
  const [step, setStep] = useState("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const form = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      role: data === "Donor" ? "donor" : "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
    context: { step },
  });

  const onSubmit = async (formData) => {
    setError("");
    setLoading(true);

    try {
      /* ================= STEP 1 : SEND OTP ================= */
      if (step === "details") {
        await sendSignupOtp({
          fullName: formData.name,
          email: formData.email,
          role: formData.role,
        });

        setRegisteredEmail(formData.email);
        setStep("otp");
        alert("OTP sent to your email");
      }

      /* ================= STEP 2 : VERIFY OTP ================= */
      else if (step === "otp") {
        if (!formData.otp) {
          setError("OTP is required");
          return;
        }

        await verifySignupOtp({
          email: registeredEmail,
          otp: formData.otp,
        });

        setStep("password");
        alert("Email verified successfully");
      }

      /* ================= STEP 3 : CREATE PASSWORD ================= */
      else if (step === "password") {
        if (!registeredEmail) {
          setError("Email missing. Please restart signup.");
          return;
        }

        await createPassword({
          email: registeredEmail,
          password: formData.password,
        });

        alert("Account created successfully");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    ...form,
    step,
    loading,
    error,
    setStep,
    onSubmit,
  };
};

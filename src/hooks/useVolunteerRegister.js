// import { useState } from "react";
// import { volunteerApi } from "../services/volunteerApi";
// import {
//   sendEmailOtpApi,
//   verifyEmailOtpApi,
//   sendPhoneOtpApi,
//   verifyPhoneOtpApi,
// } from "../services/verificationService";

// export function useVolunteerRegister({ reset, getValues }) {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const [emailOtp, setEmailOtp] = useState("");
//   const [phoneOtp, setPhoneOtp] = useState("");
//   const [verifying, setVerifying] = useState(false);

//   const [phoneOtpSent, setPhoneOtpSent] = useState(false);
//   const [phoneVerified, setPhoneVerified] = useState(false);

//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [emailVerified, setEmailVerified] = useState(false);
// const [emailOtpLoading, setEmailOtpLoading] = useState(false);
// const [phoneOtpLoading, setPhoneOtpLoading] = useState(false);

//   // ✅ REGISTER
//   const submitVolunteer = async (data) => {
//     const formData = new FormData();

//     Object.keys(data).forEach((key) => {
//       if (key === "dob" && data[key]) {
//         formData.append("dob", new Date(data[key]).toISOString());
//       } else {
//         formData.append(key, data[key] || "");
//       }
//     });

//     if (uploadedFile) {
//       formData.append("uploadIdProof", uploadedFile);
//     }

//     await volunteerApi.register(formData);

//     setShowSuccessModal(true);
//     setUploadedFile(null);
//     reset();
//   };

//   // 📱 SEND PHONE OTP
//  const sendPhoneOtp = async () => {
//   if (phoneOtpLoading || phoneOtpSent) return;

//   const phone = getValues("contactNumber");

//   if (!phone || phone.length !== 10) {
//     alert("Enter valid contact number first");
//     return;
//   }

//   try {
//     setPhoneOtpLoading(true);

//     await sendPhoneOtpApi({
//       contactNumber: phone,
//       role: "volunteer",
//     });

//     setPhoneOtpSent(true);
//   } catch (err) {
//     alert(err.response?.data?.message || "Failed to send phone OTP");
//   } finally {
//     setPhoneOtpLoading(false);
//   }
// };


//   // 📧 SEND EMAIL OTP
//   const sendEmailOtp = async () => {
//   if (emailOtpLoading || emailOtpSent) return;

//   const email = getValues("email");
//   const fullName = getValues("fullName");

//   if (!email) {
//     alert("Enter email first");
//     return;
//   }

//   try {
//     setEmailOtpLoading(true);

//     await sendEmailOtpApi({
//       email,
//       fullName,
//       role: "volunteer",
//     });

//     setEmailOtpSent(true);
//   } catch (err) {
//     alert(err.response?.data?.message || "Failed to send email OTP");
//   } finally {
//     setEmailOtpLoading(false);
//   }
// };



// const verifyPhone = async () => {
//   const contactNumber = getValues("contactNumber"); // 🔥 REQUIRED

//   if (!contactNumber || !phoneOtp) {
//     alert("Phone number & OTP required");
//     return;
//   }

//   setVerifying(true);
//   try {
//     await verifyPhoneOtpApi({
//       contactNumber,
//       otp: phoneOtp,
//     });
//     setPhoneVerified(true);
//   } finally {
//     setVerifying(false);
//   }
// };


// const verifyEmail = async () => {
//   const email = getValues("email"); // 🔥 REQUIRED

//   if (!email || !emailOtp) {
//     alert("Email & OTP required");
//     return;
//   }

//   setVerifying(true);
//   try {
//     await verifyEmailOtpApi({
//       email,
//       otp: emailOtp,
//     });
//     setEmailVerified(true);
//   } finally {
//     setVerifying(false);
//   }
// };


// const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       alert("File size must be < 5MB");
//       return;
//     }
//     setUploadedFile(file);
//   };

//   return {
//     submitVolunteer,
//     uploadedFile,
//     handleFileChange,
//     showSuccessModal,
//     setShowSuccessModal,

//     // phone
//     sendPhoneOtp,
//     verifyPhone,
//     phoneOtp,
//     setPhoneOtp,
//     phoneOtpSent,
//     phoneVerified,

//     // email
//     sendEmailOtp,
//     verifyEmail,
//     emailOtp,
//     setEmailOtp,
//     emailOtpSent,
//     emailVerified,
// phoneOtpLoading,
//   emailOtpLoading,

//     verifying,
//   };
// }




import { useEffect, useState } from "react";
import {
  sendEmailOtpApi,
  verifyEmailOtpApi,
  sendPhoneOtpApi,
  verifyPhoneOtpApi,
} from "../services/verificationService";
import { volunteerApi } from "../services/volunteerApi";

export function useVolunteerRegister({ reset, getValues }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // OTP values
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  // Status
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Loading
  const [phoneOtpLoading, setPhoneOtpLoading] = useState(false);
  const [emailOtpLoading, setEmailOtpLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Errors (🔥 IMPORTANT)
  const [phoneError, setPhoneError] = useState("");
  const [phoneOtpError, setPhoneOtpError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailOtpError, setEmailOtpError] = useState("");

  // Resend timers
  const [phoneTimer, setPhoneTimer] = useState(0);
  const [emailTimer, setEmailTimer] = useState(0);

  /* ================= REGISTER ================= */
  /* ================= REGISTER (Updated) ================= */
  const submitVolunteer = async (data, emailVerified, phoneVerified) => {
    const formData = new FormData();

    // Sabhi text fields ko add karein
    Object.keys(data).forEach((key) => {
      // ❌ file field ko skip karo
      if (key === "idProof") return;

      // ✅ DOB special handling
      if (key === "dob" && data[key]) {
        formData.append("dob", new Date(data[key]).toISOString());
        return;
      }

      // ❌ undefined / null skip
      if (data[key] === undefined || data[key] === null) return;

      // ✅ boolean ko string me convert karo
      if (typeof data[key] === "boolean") {
        formData.append(key, String(data[key]));
        return;
      }

      // ✅ normal text fields
      formData.append(key, data[key].toString());
    });


    // Verification flags ko Boolean se String bana kar bhejein (Backend readable)
    formData.append("isEmailVerified", String(emailVerified));
    formData.append("isPhoneVerified", String(phoneVerified));

    // File check
    if (uploadedFile) {
      formData.append("uploadIdProof", uploadedFile);
    }

    try {
      const response = await volunteerApi.register(formData);
      setShowSuccessModal(true);
      reset();
      setUploadedFile(null);
      return response;
    } catch (err) {
      // Isse aapko exact pata chalega backend kyu mana kar raha hai
      console.error("Server Response Error:", err.response?.data);
      throw err; // Isse page ka catch block trigger hoga
    }
  };

  //   // useVolunteerRegister.js mein submitVolunteer function

  //  const submitVolunteer = async (data) => {
  //     const formData = new FormData();

  //     // Baaki fields loop se append karein
  //     Object.keys(data).forEach((key) => {
  //         formData.append(key, data[key]);
  //     });

  //     // File check karein
  //     if (uploadedFile) {
  //         formData.append("uploadIdProof", uploadedFile);
  //     }

  //     // Yahan API call karein
  //     const response = await volunteerApi.register(formData);
  //     // ... rest of logic
  // };
  /* ================= PHONE OTP ================= */
  const sendPhoneOtp = async () => {
    if (phoneOtpLoading || phoneTimer > 0) return;

    const phone = getValues("contactNumber");
    setPhoneError("");
    setPhoneOtpError("");

    if (!phone || phone.length !== 10) {
      setPhoneError("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      setPhoneOtpLoading(true);
      await sendPhoneOtpApi({ contactNumber: phone, role: "volunteer" });
      setPhoneOtpSent(true);
      setPhoneTimer(30);
    } catch (err) {
      setPhoneError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setPhoneOtpLoading(false);
    }
  };

  const verifyPhone = async () => {
    const phone = getValues("contactNumber");
    setPhoneOtpError("");

    if (!phoneOtp) {
      setPhoneOtpError("Please enter OTP");
      return;
    }

    try {
      setVerifying(true);
      await verifyPhoneOtpApi({ contactNumber: phone, otp: phoneOtp });
      setPhoneVerified(true);
    } catch (err) {
      setPhoneOtpError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setVerifying(false);
    }
  };

  /* ================= EMAIL OTP ================= */
  const sendEmailOtp = async () => {
    if (emailOtpLoading || emailTimer > 0) return;

    const email = getValues("email");
    const fullName = getValues("fullName");
    setEmailError("");
    setEmailOtpError("");

    if (!email) {
      setEmailError("Please enter a valid email");
      return;
    }

    try {
      setEmailOtpLoading(true);
      await sendEmailOtpApi({ email, fullName, role: "volunteer" });
      setEmailOtpSent(true);
      setEmailTimer(30);
    } catch (err) {
      setEmailError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setEmailOtpLoading(false);
    }
  };

  const verifyEmail = async () => {
    const email = getValues("email");
    setEmailOtpError("");

    if (!emailOtp) {
      setEmailOtpError("Please enter OTP");
      return;
    }

    try {
      setVerifying(true);
      // await verifyEmailOtpApi({ email, otp: emailOtp });
      await verifyEmailOtpApi({
        email,
        otp: emailOtp,
        role: "volunteer",
      });
      setEmailVerified(true);
    } catch (err) {
      setEmailOtpError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setVerifying(false);
    }
  };

  /* ================= TIMER ================= */
  useEffect(() => {
    if (phoneTimer > 0) {
      const t = setTimeout(() => setPhoneTimer((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [phoneTimer]);

  useEffect(() => {
    if (emailTimer > 0) {
      const t = setTimeout(() => setEmailTimer((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [emailTimer]);

  // ... baaki saara logic upar ka same rahega ...

  return {
    // Registration & File
    submitVolunteer,
    uploadedFile,
    handleFileChange: (e) => {
      const file = e.target.files?.[0];
      if (file && file.size <= 5 * 1024 * 1024) {
        setUploadedFile(file);
      } else {
        alert("File size must be < 5MB");
      }
    },
    showSuccessModal,
    setShowSuccessModal,

    // Phone Verification State
    sendPhoneOtp,
    verifyPhone,
    phoneOtp,
    setPhoneOtp,
    phoneOtpSent,
    phoneVerified,
    phoneError,
    phoneOtpError,
    phoneTimer,
    phoneOtpLoading,

    // Email Verification State
    sendEmailOtp,
    verifyEmail,
    emailOtp,
    setEmailOtp,
    emailOtpSent,
    emailVerified,
    emailError,
    emailOtpError,
    emailTimer,
    emailOtpLoading,

    // General
    setPhoneError,
    setEmailError,
    verifying,
  };

}

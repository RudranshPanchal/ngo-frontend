import api from "../config/api";
//  Send OTP
export const sendOtp = (email, role) => {
  return api.post("/api/auth/forgotPassword", { email, role });
};

//  Verify OTP
export const verifyOtp = (email, otp, role) => {
  return api.post("/api/auth/verifyResetOtp", { email, otp, role });
};

//  Reset Password
export const resetPassword = (email, newPassword, role) => {
  return api.post("/api/auth/resetPassword", {
    email,
    newPassword,
    confirm_password: newPassword,
    role,
  });
};
//sinup APIs
export const sendSignupOtp = (data) => {
  return api.post("/api/auth/signup/send-otp", data);
};

export const verifySignupOtp = (data) => {
  return api.post("/api/auth/signup/verify-otp", data);
};

export const createPassword = (data) => {
  return api.post("/api/auth/signup/create-password", data);
};
/* ================= EMAIL OTP ================= */

// import api from "./api";

// 📧 EMAIL OTP
export const sendEmailOtpApi = ({ email, fullName, role }) => {
  return api.post("/api/auth/signup/send-otp", {
    email,
    fullName: fullName || "Volunteer",
    role: role || "volunteer",
  });
};

// export const verifyEmailOtpApi = ({ email, otp }) => {
//   return api.post("/api/auth/signup/verify-otp", {
//     email,
//     otp,
//   });
// };
export const verifyEmailOtpApi = ({ email, otp, role }) => { // <--- role add kiya
  return api.post("/api/auth/signup/verify-otp", {
    email,
    otp,
    role: role || "volunteer", // <--- Ye bhejoge tabhi backend match karega
  });
};

// 📱 PHONE OTP
export const sendPhoneOtpApi = ({ contactNumber, fullName, role }) => {
  return api.post("/api/auth/send-phone-otp", {
    contactNumber,
    fullName: fullName || "Volunteer",
    role: role || "volunteer",
  });
};

export const verifyPhoneOtpApi = ({ contactNumber, otp, role }) => { // <--- role add kiya
  return api.post("/api/auth/verify-phone-otp", {
    contactNumber,
    otp,
    role: role || "volunteer", // <--- Ye missing tha
  });
};
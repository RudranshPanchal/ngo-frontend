// import api from "../config/api";

// export const registerUser = (data) => {
//   return api.post(
//     `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
//     data
//   );
// };
import api from "../config/api";

// SIGNUP APIs

export const sendSignupOtp = (data) => {
  return api.post("/api/auth/signup/send-otp", data);
};

export const verifySignupOtp = (data) => {
  return api.post("/api/auth/signup/verify-otp", data);
};

export const createPassword = (data) => {
  return api.post("/api/auth/signup/create-password", data);
};

// import api from '../config/api.js';

// export const donorApi = { 
//   // GET /api/donor/profile
//   getProfile: async () => {
//     const response = await api.get('/api/donor/profile');
//     return response.data;
//   },

//   // PUT /api/donor/profile
//   updateProfile: async (profileData) => {
//     const response = await api.put('/api/donor/profile', profileData);
//     return response.data;
//   },

//   // GET /api/donor/donations
//   getDonations: async () => {
//     const response = await api.get('/api/donor/donations');
//     return response.data;
//   },

//   // GET /api/donor/dashboard
//   getDashboard: async () => {
//     const response = await api.get('/api/donor/dashboard');
//     return response.data;
//   }
// };
// import api from '../config/api.js';

// export const donorApi = {

//   // ================= PROFILE =================
//   getProfile: async () => {
//     const response = await api.get('/api/donor/profile');
//     return response.data;
//   },

//   updateProfile: async (profileData) => {
//     const response = await api.put('/api/donor/profile', profileData);
//     return response.data;
//   },

//   // ================= DONATION HISTORY =================
//   // 🔥 THIS WAS MISSING
//   getDonorHistory: async () => {
//     const response = await api.get('/api/donor/history');
//     return response.data;
//   },

//   // ================= DONATIONS (payment based) =================
//   getDonations: async () => {
//     const response = await api.get('/api/donor/donations');
//     return response.data;
//   },

//   // ================= DASHBOARD =================
//   getDashboard: async () => {
//     const response = await api.get('/api/donor/dashboard');
//     return response.data;
//   }
// };

// // ================= 🔥 DOWNLOAD RECEIPT =================
//   downloadReceipt: async (donationId) => {
//     const response = await api.get(
//       `/api/donor/receipt/${donationId}`,
//       {
//         responseType: "blob"   // 👈 IMPORTANT
//       }
//     );
//     return response;
//   };
import api from "../config/api.js";

export const donorApi = {
  // ================= PROFILE =================
  getProfile: async () => {
    const response = await api.get("/api/donor/profile");
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put("/api/donor/profile", profileData);
    return response.data;
  },

  // ================= DONATION HISTORY =================
  getDonorHistory: async () => {
    const response = await api.get("/api/donor/history");
    return response.data;
  },

  // ================= DASHBOARD =================
  getDashboard: async () => {
    const response = await api.get("/api/donor/dashboard");
    return response.data;
  },

  // ================= 🔥 DOWNLOAD RECEIPT =================
  downloadReceipt: async (donationId) => {
    const response = await api.get(
      `/api/donor/receipt/${donationId}`,
      {
        responseType: "blob"   // 👈 IMPORTANT
      }
    );
    return response;
  }
};

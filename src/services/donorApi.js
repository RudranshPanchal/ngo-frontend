import api from "../config/api.js";

export const donorApi = {
  // PROFILE
  getProfile: async () => {
    const response = await api.get("/api/donor/profile");
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put("/api/donor/profile", profileData);
    return response.data;
  },

  // DONATION HISTORY
  getDonorHistory: async () => {
    const response = await api.get("/api/donor/history");
    return response.data;
  },

  //DASHBOARD
  getDashboard: async () => {
    const response = await api.get("/api/donor/dashboard");
    return response.data;
  },

  //DOWNLOAD RECEIPT
  downloadReceipt: async (donationId) => {
    const response = await api.get(
      `/api/donor/receipt/${donationId}`,
      {
        responseType: "blob"  
      }
    );
    return response;
  }
};

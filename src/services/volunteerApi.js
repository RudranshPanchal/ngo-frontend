import api from "../config/api";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const volunteerApi = {
  register(formData) {
    return api.post(
      `${BASE_URL}/api/volunteer/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
};

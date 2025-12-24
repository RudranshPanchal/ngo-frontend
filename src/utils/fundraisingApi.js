import api from '../config/api.js';

export const fetchFundraising = async () => {
  try {
    const res = await api.get("/api/fundraising"); // GET not POST!!
    
    const json = res.data; // axios does not need res.json()

    return Array.isArray(json.data) ? json.data : [];

  } catch (err) {
    console.error("API ERROR:", err);
    return [];
  }
};
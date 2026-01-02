// import { useEffect, useState } from "react";
// import axios from "axios";
// import api from "../config/api";
// export const useFundraisingAdmin = () => {
//   const [funds, setFunds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // VITE_BACKEND_URL ke peeche slash check kar lena
//   const API = `${import.meta.env.VITE_BACKEND_URL}/api/fundraising`;

//   // GET ALL
//   const getFunds = async () => {
//     try {
//       const res = await api.get(API);
//       // Backend agar { success: true, data: [...] } bhej raha hai
//       setFunds(res.data.data || []);
//     } catch (err) {
//       console.error("FETCH ERROR:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // CREATE
//   const createFund = async (payload) => {
//     try {
//       const res = await api.post(API, payload);
//       if (res.data.success) {
//         // Naya data list mein add karein aur list refresh karein
//         await getFunds(); 
//         return { success: true };
//       }
//     } catch (err) {
//       console.error("CREATE ERROR:", err.response?.data || err.message);
//       return { success: false, error: err };
//     }
//   };

//   // UPDATE
//   const updateFund = async (id, payload) => {
//     try {
//       const res = await api.put(`${API}/${id}`, payload);
//       if (res.data.success) {
//         // State ko update karein ya seedha list refresh karein (Zyada safe hai)
//         await getFunds();
//         return { success: true };
//       }
//     } catch (err) {
//       console.error("UPDATE ERROR:", err.response?.data || err.message);
//       return { success: false, error: err };
//     }
//   };

//   // DELETE
//   const deleteFund = async (id) => {
//     try {
//       const res = await api.delete(`${API}/${id}`);
//       if (res.data.success) {
//         setFunds((prev) => prev.filter((item) => item._id !== id));
//       }
//     } catch (err) {
//       console.error("DELETE ERROR:", err);
//     }
//   };

//   useEffect(() => {
//     getFunds();
//   }, []);

//   // getFunds ko bhi return karein taaki zarurat padne par manual refresh ho sake
//   return { funds, loading, createFund, updateFund, deleteFund, getFunds };
// };
import { useEffect, useState, useCallback } from "react";
import api from "../config/api";

export const useFundraisingAdmin = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "/api/fundraising";

  const getFunds = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(API);
      setFunds(res.data.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createFund = async (payload) => {
    try {
      const res = await api.post(API, payload);
      if (res.data.success) {
        await getFunds();
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Create failed",
      };
    }
  };

  const updateFund = async (id, payload) => {
    try {
      const res = await api.put(`${API}/${id}`, payload);
      if (res.data.success) {
        await getFunds();
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Update failed",
      };
    }
  };

  const deleteFund = async (id) => {
    try {
      const res = await api.delete(`${API}/${id}`);
      if (res.data.success) {
        setFunds((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  useEffect(() => {
    getFunds();
  }, [getFunds]);

  return { funds, loading, createFund, updateFund, deleteFund, getFunds };
};

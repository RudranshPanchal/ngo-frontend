import { useEffect, useState } from "react";
import axios from "axios";

export const useFundraisingAdmin = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_BACKEND_URL + "/api/fundraising";

  // GET ALL
  const getFunds = async () => {
    try {
      const res = await axios.get(API);
      setFunds(res.data.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const createFund = async (payload) => {
    try {
      const res = await axios.post(API, payload);
      setFunds([...funds, res.data.data]);
    } catch (err) {
      console.error("CREATE ERROR:", err);
    }
  };

  // UPDATE
  const updateFund = async (id, payload) => {
    try {
      const res = await axios.put(`${API}/${id}`, payload);
      setFunds(funds.map((item) => (item._id === id ? res.data.data : item)));
    } catch (err) {
      console.error("UPDATE ERROR:", err);
    }
  };

  // DELETE
  const deleteFund = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setFunds(funds.filter((item) => item._id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  useEffect(() => {
    getFunds();
  }, []);

  return { funds, loading, createFund, updateFund, deleteFund };
};

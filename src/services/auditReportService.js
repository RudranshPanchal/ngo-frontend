import api from "../config/api";

export const generateReportAPI = async (formData) => {
  const res = await api.post("/api/report/generate", formData);
  return res.data;
};

export const downloadPDFAPI = async (payload) => {
  const res = await api.post("/api/report/pdf", payload, { responseType: "blob" });
  return res.data;
};
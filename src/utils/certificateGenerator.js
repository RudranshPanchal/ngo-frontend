import api from "../config/api";

// GET All Certificates
export const fetchAllCertificates = async () => {
  const resp = await api.get("/api/certificate/all");
  return resp.data.certificates || [];
};

// Create Certificate (THIS CREATES ENTRY + RETURNS JSON)
export const createCertificate = async (data) => {
  const resp = await api.post("/api/certificate/generate", data);
  return resp.data.certificate;
};

// Delete Certificate
export const deleteCertificate = async (id) => {
  const resp = await api.delete(`/api/certificate/delete/${id}`);
  return resp.data.success;
};

// Update Certificate Status (Issued)
export const updateCertificateStatus = async (id) => {
  const resp = await api.patch(`/api/certificate/update/${id}`, {
    status: "Issued",
  });

  return resp.data.certificate;
};

// ⭐ FIXED FUNCTION NAME — THIS MATCHES YOUR IMPORT
export const generateCertificatePDF = async (id) => {
  const resp = await api.get(`/api/certificate/pdf/${id}`, {
    responseType: "blob", // Very important
  });

  return resp.data; // PDF blob
};

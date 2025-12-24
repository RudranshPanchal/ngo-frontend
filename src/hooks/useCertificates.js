import { useState, useEffect } from "react";
import {
  fetchAllCertificates,
  createCertificate,
  deleteCertificate,
  updateCertificateStatus,
} from "../utils/certificateGenerator";

export const useCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCertificates = async () => {
    try {
      const data = await fetchAllCertificates();
      setCertificates(data);
    } catch (err) {
      console.error("Failed loading certificates", err);
    } finally {
      setLoading(false);
    }
  };

  const addCertificate = async (certData) => {
    try {
      const newCert = await createCertificate(certData);

      console.log("🚀 NEW CERT FROM BACKEND =", newCert);

      if (!newCert || !newCert._id) {
        console.error("❌ Invalid newCert returned:", newCert);
        return;
      }

      setCertificates((prev) => [newCert, ...prev]);
    } catch (err) {
      console.error("Failed creating certificate", err);
    }
  };

  const removeCertificate = async (id) => {
    try {
      await deleteCertificate(id);
      setCertificates((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const updateStatus = async (id) => {
    try {
      const updated = await updateCertificateStatus(id);
      setCertificates((prev) =>
        prev.map((cert) =>
          cert._id === id ? { ...cert, status: "Issued" } : cert
        )
      );
      return updated;
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  return { certificates, loading, addCertificate, removeCertificate, updateStatus };
};

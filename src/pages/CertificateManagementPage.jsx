
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Award, Search, Plus, Eye, FileText } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";


import { useCertificates } from "../hooks/useCertificates";
import api from "../config/api";

const CertificateManagementPage = () => {
  const [activeTab, setActiveTab] = useState("certificate-management");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const [newCert, setNewCert] = useState({
    recipient: "",
    email: "",
    issueDate: "",
    role: "",
  });

  const [previewCert, setPreviewCert] = useState(null);

  const { certificates, addCertificate, removeCertificate, updateStatus } =
    useCertificates();

  // ------------------------ CREATE ------------------------
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      recipientName: newCert.recipient,
      email: newCert.email,
      certificateType: newCert.course,
      issueDate: newCert.issueDate,
      description: "",
      role: newCert.role,   // ⭐ ADD ROLE HERE
      status: "Pending",
    };

    await addCertificate(payload);

    setNewCert({ recipient: "", email: "", course: "", role: "" });
    setShowForm(false);
  };

  // ------------------------ SEARCH ------------------------
  const filteredCertificates = certificates.filter((cert) =>
    (cert?.recipientName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cert?.certificateType || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cert?.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ------------------------ PDF + EMAIL SEND ------------------------
  const handlePDF = async (cert) => {
    try {
      const resp = await api.get(`/api/certificate/pdf/${cert._id}`, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(resp.data);
      window.open(url);

      // Update status
      await updateStatus(cert._id);

      // Email send with ROLE
      await api.post("/api/certificate/send-email", {
        email: cert.email,
        recipientName: cert.recipientName,
        certificateType: cert.certificateType,
        issueDate: cert.issueDate,
        role: cert.role,   // ⭐ IMPORTANT FOR DESIGN
      });

      alert("Certificate sent to " + cert.email);
    } catch (err) {
      console.error("PDF/Email Error:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Certificate Management</h1>
              <p className="text-gray-600">Manage all certificates & send emails</p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Certificates ({filteredCertificates.length})
                  </CardTitle>

                  <Button size="sm" onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Certificate
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {/* SEARCH */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    className="pl-10"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left">Recipient</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">Course</th>
                        <th className="py-3 px-4 text-left">Role</th>
                        <th className="py-3 px-4 text-left">Issue Date</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredCertificates.map((cert) => (
                        <tr key={cert._id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{cert.recipientName}</td>
                          <td className="py-3 px-4">{cert.email}</td>
                          <td className="py-3 px-4">{cert.certificateType}</td>
                          <td className="py-3 px-4 capitalize">{cert.role}</td>
                          <td className="py-3 px-4">{cert.issueDate}</td>

                          <td className="py-3 px-4">
                            {cert.status === "Issued" ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                Issued
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                                Pending
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setPreviewCert(cert)}>
                                <Eye className="h-4 w-4" />
                              </Button>

                              <Button variant="ghost" size="sm" onClick={() => handlePDF(cert)}>
                                <FileText className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleDelete(cert._id)}
                              >
                                ❌
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CREATE CERTIFICATE MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-gray-200 animate-[pop_0.25s_ease-out]">

            <h2 className="text-xl font-bold mb-4">Create Certificate</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                // --- VALIDATION ---
                if (!newCert.role) {
                  alert("Please select role.");
                  return;
                }
                if (!newCert.recipient.trim()) {
                  alert("Recipient Name is required.");
                  return;
                }
                if (!newCert.email.trim()) {
                  alert("Email is required.");
                  return;
                }
                // Email format validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(newCert.email)) {
                  alert("Invalid email format.");
                  return;
                }
                if (!newCert.issueDate) {
                  alert("Issue Date is required.");
                  return;
                }


                handleCreateSubmit(e);
              }}
              className="space-y-4"
            >

              {/* ⭐ ROLE FIELD AT TOP */}
              <select
                className="border p-2 rounded w-full"
                value={newCert.role}
                onChange={(e) => setNewCert({ ...newCert, role: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="donor">Donor Certificate</option>
                <option value="volunteer">Volunteer Certificate</option>
              </select>

              <Input
                placeholder="Recipient Name"
                value={newCert.recipient}
                onChange={(e) => setNewCert({ ...newCert, recipient: e.target.value })}
              />

              <Input
                placeholder="Recipient Email"
                value={newCert.email}
                onChange={(e) => setNewCert({ ...newCert, email: e.target.value })}
              />
              <Input
                type="date"
                value={newCert.issueDate}
                onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
              />


              <div className="flex justify-end gap-2">
                <Button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>


            </form>
          </div>
        </div>
      )}

      {/* PREVIEW CERTIFICATE MODAL */}
      {previewCert && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-gray-200 animate-[pop_0.25s_ease-out]">

            <h2 className="text-xl font-bold mb-4">Certificate Preview</h2>

            <div className="space-y-2">
              <p><strong>Name:</strong> {previewCert.recipientName}</p>
              <p><strong>Email:</strong> {previewCert.email}</p>
              <p><strong>Course:</strong> {previewCert.certificateType}</p>
              <p><strong>Role:</strong> {previewCert.role}</p>
              <p><strong>Issue Date:</strong> {previewCert.issueDate}</p>
              <p><strong>Status:</strong> {previewCert.status}</p>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={() => setPreviewCert(null)}>Close</Button>
            </div>

          </div>
        </div>
      )}
      <ConfirmDeleteModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          removeCertificate(deleteId);
          setShowDeleteConfirm(false);
        }}
      />
    </div>
  );
};

export default CertificateManagementPage;

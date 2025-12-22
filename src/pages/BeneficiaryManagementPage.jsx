import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Users, Search, Download, Plus, Edit, Trash2 } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader.jsx";
import Sidebar from "../components/Sidebar.jsx";
import api from "../config/api";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";

const BeneficiaryManagementPage = () => {
  const [activeTab, setActiveTab] = useState("beneficiary-management");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    contactNumber: "",
    address: "",
  });
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [deleteId, setDeleteId] = useState(null);
const handleDelete = (id) => {
  setDeleteId(id);
  setShowDeleteConfirm(true);
};
  // ⭐ Fetch All Beneficiaries
  const loadBeneficiaries = async () => {
    try {
      const resp = await api.get("/api/beneficiary/all");
      setBeneficiaries(resp.data.beneficiaries || []);
    } catch (err) {
      console.error("Failed loading beneficiaries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBeneficiaries();
  }, []);

  // ⭐ Search Filter
  const filtered = beneficiaries.filter((b) =>
    (b.fullName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ⭐ Export CSV
  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Gender,DOB,Phone,Address,Status\n" +
      filtered
        .map(
          (b) =>
            `${b.fullName},${b.gender},${b.dob},${b.contactNumber},${b.address},${b.status}`
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "beneficiaries.csv";
    link.click();
  };

  // ⭐ Update Status
  const updateStatus = async (id, status) => {
    try {
      const resp = await api.put(`/api/beneficiary/status/${id}`, { status });
      const updated = resp.data.beneficiary;

      setBeneficiaries((prev) =>
        prev.map((b) => (b._id === id ? updated : b))
      );
    } catch (err) {
      console.error("Status Update Failed", err);
    }
  };

  // ⭐ Delete Beneficiary
  const confirmDelete = async () => {
  try {
    await api.delete(`/api/beneficiary/delete/${deleteId}`);

    setBeneficiaries(prev => prev.filter(b => b._id !== deleteId));

    setShowDeleteConfirm(false);
    setDeleteId(null);

  } catch (err) {
    console.error("Delete failed", err);
  }
};


  // ⭐ Handle Create Beneficiary Submit
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const resp = await api.post("/api/beneficiary/register", formData);

      setBeneficiaries((prev) => [resp.data.beneficiary, ...prev]);

      setShowForm(false);
      setFormData({
        fullName: "",
        gender: "",
        dob: "",
        contactNumber: "",
        address: "",
      });
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">

            {/* HEADER */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Beneficiary Management</h1>
              <p className="text-gray-600">Manage beneficiaries and track their status</p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Beneficiaries ({filtered.length})
                  </CardTitle>

                  <div className="flex gap-2">
                    <Button onClick={exportData} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>

                    {/* OPEN CREATE MODAL */}
                    <Button size="sm" onClick={() => setShowForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Beneficiary
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">

                {/* SEARCH BAR */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search beneficiaries..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Gender</th>
                        <th className="py-3 px-4 text-left">Phone</th>
                        <th className="py-3 px-4 text-left">Address</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((b) => (
                        <tr key={b._id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{b.fullName}</td>
                          <td className="py-3 px-4">{b.gender}</td>
                          <td className="py-3 px-4">{b.contactNumber}</td>
                          <td className="py-3 px-4">{b.address}</td>

                          {/* STATUS BADGE */}
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                b.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : b.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>

                          {/* ACTION BUTTONS */}
                          <td className="py-3 px-4">
                            <div className="flex gap-3">

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateStatus(b._id, "approved")}
                              >
                                Approve
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateStatus(b._id, "rejected")}
                              >
                                Reject
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleDelete(b._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-6 text-gray-500">
                            No beneficiaries found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ⭐ CREATE MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Beneficiary</h2>

            <form onSubmit={handleCreate} className="space-y-4">

              <Input
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />

              <Input
                placeholder="Gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              />

              <Input
                placeholder="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                required
              />

              <Input
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                required
              />

              <Input
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
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
      {showDeleteConfirm && (
  <ConfirmDeleteModal
    show={showDeleteConfirm}
    onClose={() => setShowDeleteConfirm(false)}
    onConfirm={confirmDelete}
  />
)}

    </div>
  );
};

export default BeneficiaryManagementPage;

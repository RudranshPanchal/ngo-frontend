import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import AdminAddVolunteerModal from "../components/AdminAddVolunteerModel.jsx";
import {
  Users,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  UserCheck,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader.jsx";
import Sidebar from "../components/Sidebar.jsx";
import api from "../config/api.js";

const VolunteerManagementPage = () => {
  const [activeTab, setActiveTab] = useState("volunteer-management");
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [error, setError] = useState(null);

  const [addVolunteerOpen, setAddVolunteerOpen] = useState(false);

  // Modal state for admin-entered password
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [modalVolunteer, setModalVolunteer] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [modalError, setModalError] = useState("");

  const navigate = useNavigate();

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("api/volunteer/all");
      const data = res.data?.volunteers || [];

      setVolunteers(data);
      setFilteredVolunteers(data);
    } catch (err) {
      console.error("Error fetching volunteers:", err);
      setError("Failed to load volunteers. Please try again.");
      setVolunteers([]);
      setFilteredVolunteers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Filter by search + status whenever dependencies change
  useEffect(() => {
    let list = [...volunteers];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter((v) => {
        const name = (v.fullName || v.name || "").toLowerCase();
        const email = (v.email || "").toLowerCase();
        const phone = (v.contactNumber || "").toLowerCase();
        const area = (v.areaOfVolunteering || "").toLowerCase();
        return (
          name.includes(term) ||
          email.includes(term) ||
          phone.includes(term) ||
          area.includes(term)
        );
      });
    }

    if (statusFilter !== "all") {
      list = list.filter((v) => (v.status || "pending") === statusFilter);
    }

    setFilteredVolunteers(list);
  }, [searchTerm, statusFilter, volunteers]);

  const getStatusClasses = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  // new: open modal to collect admin-created password
  const openApproveModal = (vol) => {
    setModalVolunteer(vol);
    setAdminPassword("");
    setAdminConfirmPassword("");
    setModalError("");
    setPasswordModalOpen(true);
  };

  // new: confirm approval with provided password
  const confirmApprove = async () => {
    setModalError("");
    if (!adminPassword) {
      setModalError("Password is required.");
      return;
    }
    if (adminPassword.length < 6) {
      setModalError("Password must be at least 6 characters.");
      return;
    }
    if (adminPassword !== adminConfirmPassword) {
      setModalError("Passwords do not match.");
      return;
    }

    const id = modalVolunteer._id || modalVolunteer.id;
    if (!id) {
      setModalError("Volunteer id missing.");
      return;
    }

    try {
      setStatusLoadingId(id);
      // send status + password to backend
      await api.put(`api/volunteer/status/${id}`, {
        status: "approved",
        password: adminPassword,
      });

      // update local state
      setVolunteers((prev) =>
        prev.map((v) => (v._id === id || v.id === id ? { ...v, status: "approved" } : v))
      );
      setPasswordModalOpen(false);
    } catch (err) {
      console.error("Error approving volunteer:", err);
      setModalError("Failed to approve volunteer. Try again.");
    } finally {
      setStatusLoadingId(null);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    // For approve we open modal, for others (reject) call directly
    if (newStatus === "approved") {
      const vol = volunteers.find(v => v._id === id || v.id === id);
      if (!vol) {
        setError("Volunteer not found.");
        return;
      }
      openApproveModal(vol);
      return;
    }

    try {
      setStatusLoadingId(id);
      setError(null);

      await api.put(`api/volunteer/status/${id}`, { status: newStatus });

      setVolunteers((prev) =>
        prev.map((v) =>
          v._id === id || v.id === id ? { ...v, status: newStatus } : v
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update volunteer status. Please try again.");
    } finally {
      setStatusLoadingId(null);
    }
  };

  const handleView = (volunteer) => {
    const id = volunteer._id || volunteer.id;
    if (!id) return;
    navigate(`/volunteer-detail/${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Volunteer Management
              </h1>
              <p className="text-gray-600">
                Review and manage all registered volunteers
              </p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    Volunteers ({filteredVolunteers.length})
                  </CardTitle>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "all", label: "All" },
                      { key: "pending", label: "Pending" },
                      { key: "approved", label: "Approved" },
                      { key: "rejected", label: "Rejected" },
                    ].map((f) => {
                      const isActive = statusFilter === f.key;

                      return (
                        <Button
                          key={f.key}
                          size="sm"
                          variant="outline"
                          onClick={() => setStatusFilter(f.key)}
                          className={`text-xs sm:text-sm transition-all
    ${isActive
                              ? "bg-gray-200 text-gray-900 border-gray-400 hover:bg-gray-300"
                              : "bg-white text-black hover:bg-gray-100"
                            }
  `}
                        >
                          {f.label}
                        </Button>

                      );
                    })}

                    <Button
                      onClick={() => setAddVolunteerOpen(true)}
                      size="sm"
                      className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-xs sm:text-sm"
                    >
                      Add Volunteer
                    </Button>
                  </div>

                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Search */}
                <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <div className="relative max-w w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by name, email, phone, area..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      autoComplete="new-search"
                      name="searchQuery"
                      id="searchQuery"
                    />
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                    {error}
                  </div>
                )}

                {/* Loading state */}
                {loading ? (
                  <div className="py-10 flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-gray-600">
                        Loading volunteers...
                      </p>
                    </div>
                  </div>
                ) : filteredVolunteers.length === 0 ? (
                  <div className="py-10 text-center text-gray-500 text-sm">
                    No volunteers found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-300 bg-gray-100/60">
                          {["Name", "Email", "Contact", "Area of Volunteering", "Availability", "Status", "Actions"].map((col) => (
                            <th
                              key={col}
                              className="text-left py-3 px-4 font-semibold text-gray-800 whitespace-nowrap"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {filteredVolunteers.map((vol) => {
                          const id = vol._id || vol.id;
                          const status = vol.status || "pending";

                          return (
                            <tr
                              key={id}
                              className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                              <td className="py-3 px-4 font-medium text-gray-900">
                                {vol.fullName || vol.name || "Unnamed"}
                              </td>

                              <td className="py-3 px-4 text-gray-600">{vol.email || "-"}</td>

                              <td className="py-3 px-4 text-gray-600">{vol.contactNumber || "-"}</td>

                              <td className="py-3 px-4 text-gray-600 capitalize">
                                {vol.areaOfVolunteering || "-"}
                              </td>

                              <td className="py-3 px-4 text-gray-600 capitalize">
                                {vol.availability || "-"}
                              </td>

                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusClasses(
                                    status
                                  )}`}
                                >
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                              </td>

                              {/* ACTION BUTTONS */}
                              <td className="py-3 px-4 min-w-[220px]">
                                <div className="flex items-center gap-3 flex-wrap">

                                  {/* View */}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-700 hover:text-gray-900 p-2"
                                    onClick={() => handleView(vol)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>

                                  {/* Approve */}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="cursor-pointer text-green-700 hover:text-green-800 flex items-center gap-1.5 hover:bg-green-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={status === 'approved' || statusLoadingId === id}
                                    onClick={() => handleStatusChange(id, 'approved')}
                                  >
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span className="hidden sm:inline font-medium">Approve</span>
                                  </Button>

                                  {/* Reject */}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="cursor-pointer text-red-700 hover:text-red-800 flex items-center gap-1.5 hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={status === 'rejected' || statusLoadingId === id}
                                    onClick={() => handleStatusChange(id, 'rejected')}
                                  >
                                    <XCircle className="h-4 w-4" />
                                    <span className="hidden sm:inline font-medium">Reject</span>
                                  </Button>

                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Admin Add Volunteer Model */}
      <AdminAddVolunteerModal
        open={addVolunteerOpen}
        onClose={() => setAddVolunteerOpen(false)}
      />

      {/* Password Modal */}
      {passwordModalOpen && modalVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">

          {/* Modal Card */}
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-slideUp">
            <h3 className="text-lg font-semibold mb-3">Approve Volunteer</h3>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Set a temporary password for{" "}
              <strong>{modalVolunteer.fullName || modalVolunteer.email}</strong>.
              They will receive an email with login details and must change their password on first login.
            </p>

            <div className="space-y-3">
              {/* Password */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <Input
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  name="approvePass"
                  id="approvePass"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
                <Input
                  value={adminConfirmPassword}
                  onChange={(e) => setAdminConfirmPassword(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  name="approvePassConfirm"
                  id="approvePassConfirm"
                />
              </div>

              {modalError && (
                <p className="text-xs text-red-600 mt-1">{modalError}</p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setPasswordModalOpen(false)}
              >
                Cancel
              </Button>

              <Button onClick={confirmApprove} disabled={statusLoadingId !== null}>
                {statusLoadingId ? "Approving..." : "Approve & Send Email"}
              </Button>
            </div>
          </div>

          {/* Animation Styles */}
          <style>{`
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-slideUp {
        animation: slideUp 0.3s ease-out;
      }
    `}</style>
        </div>
      )}
    </div>
  );
};

export default VolunteerManagementPage;
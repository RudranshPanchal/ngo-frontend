import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import {
  Users,
  Search,
  Eye,
  CheckCircle,
  Clock,
  X,
  UserCheck,
  Mail,
  Phone,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader.jsx";
import Sidebar from "../components/Sidebar.jsx";

const API = "http://localhost:3000";

const MembershipApplicationsPage = () => {
  const [activeTab, setActiveTab] = useState("membership-applications");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvedMember, setApprovedMember] = useState(null);

  // LOAD APPLICATIONS (API)
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await fetch(`${API}/api/member/all`);
        const data = await res.json();
        setApplications(data.members || []);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  // UPDATE STATUS (API)
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API}/api/member/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setApplications((prev) =>
        prev.map((m) => (m._id === id ? data.member : m))
      );

      if (status === "approved") {
        setApprovedMember(data.member);
        setShowApprovalModal(true);
      }
    } catch (err) {
      alert(err.message || "Status update failed");
    }
  };

  // FILTERING
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-3 w-3" />;
      case "rejected":
        return <X className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Membership Applications
              </h1>
              <p className="text-gray-600">
                Review and manage membership applications
              </p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Applications ({filteredApplications.length})
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="mb-4 flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-10"
                      placeholder="Search by name or email"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <select
                    className="px-3 py-2 border rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {loading ? (
                  <div className="py-10 text-center text-gray-500">
                    Loading applications...
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr
                            key={app._id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 font-medium">
                              {app.fullName}
                            </td>
                            <td className="py-3 px-4">{app.email}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${getStatusColor(
                                  app.status
                                )}`}
                              >
                                {getStatusIcon(app.status)}
                                {app.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedApp(app)}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>

                                {app.status === "pending" && (
                                  <>
                                    <Button
                                      size="sm"
                                      className="bg-green-600"
                                      onClick={() =>
                                        updateStatus(app._id, "approved")
                                      }
                                    >
                                      <CheckCircle className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() =>
                                        updateStatus(app._id, "rejected")
                                      }
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}

                        {filteredApplications.length === 0 && (
                          <tr>
                            <td
                              colSpan="4"
                              className="py-6 text-center text-gray-500"
                            >
                              No applications found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Application Details</h2>
              <Button variant="ghost" onClick={() => setSelectedApp(null)}>
                <X />
              </Button>
            </div>

            <div className="space-y-3 text-sm">
              <p><strong>Name:</strong> {selectedApp.fullName}</p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {selectedApp.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> {selectedApp.phone || "N/A"}
              </p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
            </div>
          </div>
        </div>
      )}

      {/* APPROVAL MODAL */}
      {showApprovalModal && approvedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 text-center max-w-md w-full">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Approved</h3>
            <p className="text-gray-600 mb-6">
              {approvedMember.fullName} is now an approved member.
            </p>
            <Button
              className="w-full"
              onClick={() => setShowApprovalModal(false)}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipApplicationsPage;
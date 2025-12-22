// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card.jsx";
// import { Button } from "../components/ui/button.jsx";
// import { Input } from "../components/ui/input.jsx";
// import {
//   Users,
//   Search,
//   Eye,
//   CheckCircle,
//   Clock,
//   X,
//   UserCheck,
//   Mail,
//   Phone,
// } from "lucide-react";
// import DashboardHeader from "../components/DashboardHeader.jsx";
// import Sidebar from "../components/Sidebar.jsx";

// const KEY = "membershipApplications";

// const MembershipApplicationsPage = () => {
//   const [activeTab, setActiveTab] = useState("membership-applications");
//   const [applications, setApplications] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [showApprovalModal, setShowApprovalModal] = useState(false);
//   const [approvedMember, setApprovedMember] = useState(null);

//   // load + listeners
//   useEffect(() => {
//     const load = () => {
//       const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
//       setApplications(saved);
//     };
//     load();

//     const onStorage = (e) => {
//       if (e.key === KEY) load();
//     };
//     const onCustom = () => load();

//     window.addEventListener("storage", onStorage);
//     window.addEventListener("membershipApplications:updated", onCustom);

//     return () => {
//       window.removeEventListener("storage", onStorage);
//       window.removeEventListener("membershipApplications:updated", onCustom);
//     };
//   }, []);

//   const filteredApplications = applications.filter((app) => {
//     const matchesSearch =
//       (app.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (app.email || "").toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "All" || app.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const updateStatus = (id, newStatus) => {
//     const updated = applications.map((app) =>
//       app.id === id ? { ...app, status: newStatus } : app
//     );
//     setApplications(updated);
//     localStorage.setItem(KEY, JSON.stringify(updated));

//     console.log("id of the person", id);
    

//     if (newStatus === "Approved") {
//       const approvedApp = applications.find((a) => a.id === id);
//       if (approvedApp) {
//         const existingMembers = JSON.parse(localStorage.getItem("members") || "[]");
//         const newMember = {
//           _id: Date.now().toString(),
//           fullName: approvedApp.fullName,
//           email: approvedApp.email,
//           contactNumber: approvedApp.phoneNumber,
//           address: `${approvedApp.address || ""}, ${approvedApp.city || ""}, ${approvedApp.state || ""}`.trim(),
//           city: approvedApp.city,
//           state: approvedApp.state,
//           pinCode: approvedApp.pincode,
//           areaOfInterest: approvedApp.areaOfInterest,
//           occupation: approvedApp.occupation,
//           memberId: `MEM${String(existingMembers.length + 1).padStart(3, "0")}`,
//           createdBy: { fullName: "Admin User" },
//           createdAt: new Date().toISOString(),
//           role: "member",
//         };
//         const updatedMembers = [newMember, ...existingMembers];
//         localStorage.setItem("members", JSON.stringify(updatedMembers));
//         window.dispatchEvent(new Event("storage")); // notify other tabs if needed
//       }
//     }
//     // notify same tab
//     window.dispatchEvent(new CustomEvent("membershipApplications:updated"));
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Approved":
//         return "bg-green-100 text-green-800";
//       case "Rejected":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-yellow-100 text-yellow-800";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Approved":
//         return <CheckCircle className="h-3 w-3" />;
//       case "Rejected":
//         return <X className="h-3 w-3" />;
//       default:
//         return <Clock className="h-3 w-3" />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <DashboardHeader />

//         <div className="flex-1 overflow-auto p-4 sm:p-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="mb-6">
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Membership Applications</h1>
//               <p className="text-sm sm:text-base text-gray-600">Review and manage membership applications</p>
//             </div>

//             <Card className="border-0 shadow-sm">
//               <CardHeader className="border-b border-gray-100">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                   <CardTitle className="flex items-center gap-2">
//                     <Users className="h-5 w-5 text-purple-600" />
//                     Applications ({filteredApplications.length})
//                   </CardTitle>
//                   <div className="flex gap-2 text-xs">
//                     <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1"><Clock className="h-3 w-3" /> Pending: {applications.filter(a => a.status === "Pending").length}</span>
//                     <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Approved: {applications.filter(a => a.status === "Approved").length}</span>
//                   </div>
//                 </div>
//               </CardHeader>

//               <CardContent className="p-4 sm:p-6">
//                 <div className="mb-4 flex gap-4">
//                   <div className="flex-1 relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <Input placeholder="Search applications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
//                   </div>
//                   <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md">
//                     <option value="All">All Status</option>
//                     <option value="Pending">Pending</option>
//                     <option value="Approved">Approved</option>
//                     <option value="Rejected">Rejected</option>
//                   </select>
//                 </div>

//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-left py-3 px-4 text-sm">Name</th>
//                         <th className="text-left py-3 px-4 text-sm">Email</th>
//                         <th className="text-left py-3 px-4 text-sm">Phone</th>
//                         <th className="text-left py-3 px-4 text-sm">Interest</th>
//                         <th className="text-left py-3 px-4 text-sm">Status</th>
//                         <th className="text-left py-3 px-4 text-sm">Date</th>
//                         <th className="text-left py-3 px-4 text-sm">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredApplications.map((application) => (
//                         <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50">
//                           <td className="py-3 px-4 text-sm font-medium">{application.fullName}</td>
//                           <td className="py-3 px-4 text-sm">{application.email}</td>
//                           <td className="py-3 px-4 text-sm">{application.phoneNumber}</td>
//                           <td className="py-3 px-4 text-sm">{application.areaOfInterest}</td>
//                           <td className="py-3 px-4">
//                             <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(application.status)}`}>
//                               {getStatusIcon(application.status)} {application.status}
//                             </span>
//                           </td>
//                           <td className="py-3 px-4 text-sm">{application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : "-"}</td>
//                           <td className="py-3 px-4">
//                             <div className="flex gap-2">
//                               <Button size="sm" variant="outline" onClick={() => setSelectedApp(application)} className="h-8 px-2"><Eye className="h-3 w-3" /></Button>
//                               {application.status === "Pending" && (
//                                 <>
//                                   <Button size="sm" onClick={() => { updateStatus(application.id, "Approved"); setApprovedMember({ ...application, memberId: `MEM${String(applications.filter(a => a.status === "Approved").length + 1).padStart(3, "0")}` }); setShowApprovalModal(true); }} className="h-8 px-2 bg-green-600 hover:bg-green-700"><CheckCircle className="h-3 w-3" /></Button>
//                                   <Button size="sm" variant="destructive" onClick={() => updateStatus(application.id, "Rejected")} className="h-8 px-2"><X className="h-3 w-3" /></Button>
//                                 </>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredApplications.length === 0 && (
//                         <tr>
//                           <td colSpan="7" className="py-8 text-center text-gray-500">No applications found</td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Selected Application Modal */}
//       {selectedApp && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold">Application Details</h2>
//               <Button variant="ghost" onClick={() => setSelectedApp(null)}><X /></Button>
//             </div>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Full Name</label>
//                   <p className="text-gray-900">{selectedApp.fullName}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Status</label>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApp.status)}`}>{selectedApp.status}</span>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-700 flex items-center gap-1"><Mail className="h-3 w-3" /> Email</label>
//                   <p>{selectedApp.email}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-700 flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</label>
//                   <p>{selectedApp.phoneNumber}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Occupation</label>
//                   <p>{selectedApp.occupation || "Not specified"}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Area of Interest</label>
//                   <p>{selectedApp.areaOfInterest}</p>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700">Address</label>
//                 <p>{selectedApp.address || "Not provided"}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-700">Motivation</label>
//                 <p>{selectedApp.motivation || "Not provided"}</p>
//               </div>

//               {selectedApp.status === "Pending" && (
//                 <div className="flex gap-3 pt-4 border-t">
//                   <Button onClick={() => { updateStatus(selectedApp.id, "Approved"); setApprovedMember({ ...selectedApp, memberId: `MEM${String(applications.filter(a => a.status === "Approved").length + 1).padStart(3, "0")}` }); setSelectedApp(null); setShowApprovalModal(true); }} className="bg-green-600">Approve Application</Button>
                  
//                   <Button variant="destructive" onClick={() => { updateStatus(selectedApp.id, "Rejected"); setSelectedApp(null); }}>Reject Application</Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Approval Modal */}
//       {showApprovalModal && approvedMember && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full mx-4 shadow-2xl p-6 text-center">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
//                 <CheckCircle className="h-10 w-10 text-white" />
//               </div>
//             </div>
//             <h3 className="text-2xl font-bold">Application Approved! 🎉</h3>
//             <p className="text-gray-600 mb-6"><strong>{approvedMember.fullName}</strong> has been successfully approved and added as a member.</p>
//             <div className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg p-4 mb-6">
//               <div className="flex items-center justify-center gap-2 mb-3"><UserCheck className="h-5 w-5 text-purple-600" /><span className="font-semibold text-purple-800">New Member Created</span></div>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between"><span className="text-gray-600">Member ID:</span><span className="font-bold text-purple-700">{approvedMember.memberId}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-600">Name:</span><span className="font-medium">{approvedMember.fullName}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-600">Email:</span><span className="font-medium">{approvedMember.email}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-600">Interest:</span><span className="font-medium">{approvedMember.areaOfInterest}</span></div>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <Button onClick={() => { setShowApprovalModal(false); setApprovedMember(null); }} variant="outline" className="flex-1">Continue</Button>
//               <Button onClick={() => { setShowApprovalModal(false); setApprovedMember(null); window.open("/member-management", "_blank"); }} className="flex-1 bg-purple-600">View Members</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MembershipApplicationsPage;
///MEMBERSHIPAPPLICATIONS.PAGE



// import React, { useEffect, useState } from "react";
// import {
//   Card, CardContent, CardHeader, CardTitle
// } from "@/components/ui/card";
// import Sidebar from '../components/Sidebar.jsx';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Users, Search, Eye, CheckCircle, X, Filter, Download, RefreshCw, Mail, Phone, Calendar, MapPin, Briefcase, GraduationCap
// } from "lucide-react";

// const API = "http://localhost:3000";

// const MembershipApplicationsPage = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [approvedMember, setApprovedMember] = useState(null);
//   const [showApprovalModal, setShowApprovalModal] = useState(false);
//   const [processingId, setProcessingId] = useState(null);

//   useEffect(() => {
//     loadApplications();
//   }, []);

//   const loadApplications = () => {
//     setLoading(true);
//     fetch(`${API}/api/member/all`)
//       .then(res => res.json())
//       .then(data => {
//         setApplications(data.members || []);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Failed to load members", err);
//         setLoading(false);
//       });
//   };

//   const updateStatus = async (id, status) => {
//     setProcessingId(id);
//     try {
//       const res = await fetch(`${API}/api/member/status/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status })
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       setApplications(prev =>
//         prev.map(m => m._id === id ? data.member : m)
//       );

//       if (status === "approved") {
//         setApprovedMember(data.member);
//         setShowApprovalModal(true);
//       }
//     } catch (err) {
//       alert(err.message || "Status update failed");
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   const filtered = applications.filter(m => {
//     const matchSearch =
//       m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       m.email.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchStatus =
//       statusFilter === "all" || m.status === statusFilter;

//     return matchSearch && matchStatus;
//   });

//   const stats = {
//     total: applications.length,
//     pending: applications.filter(a => a.status === "pending").length,
//     approved: applications.filter(a => a.status === "approved").length,
//     rejected: applications.filter(a => a.status === "rejected").length
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-amber-50">
//       {/* Header Section */}
//       <div className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-amber-500 rounded-xl flex items-center justify-center">
//                 <Users className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Membership Applications</h1>
//                 <p className="text-sm text-gray-500">Review and manage membership requests</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={loadApplications}
//                 className="gap-2"
//               >
//                 <RefreshCw className="h-4 w-4" />
//                 Refresh
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="gap-2"
//               >
//                 <Download className="h-4 w-4" />
//                 Export
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="px-6 py-6 w-full">
//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 font-medium">Total Applications</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <Users className="h-6 w-6 text-blue-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-l-4 border-l-yellow-500 shadow-sm hover:shadow-md transition-shadow">
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 font-medium">Pending Review</p>
//                   <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                   <Filter className="h-6 w-6 text-yellow-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 font-medium">Approved</p>
//                   <p className="text-3xl font-bold text-green-600 mt-1">{stats.approved}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <CheckCircle className="h-6 w-6 text-green-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 font-medium">Rejected</p>
//                   <p className="text-3xl font-bold text-red-600 mt-1">{stats.rejected}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
//                   <X className="h-6 w-6 text-red-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content Card */}
//         <Card className="shadow-lg border-0">
//           <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-amber-50">
//             <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
//               <CardTitle className="flex items-center gap-2 text-xl">
//                 <Filter className="h-5 w-5 text-purple-600" />
//                 Filter Applications
//               </CardTitle>
//               <div className="text-sm text-gray-600">
//                 Showing <span className="font-semibold text-purple-600">{filtered.length}</span> of {applications.length} applications
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="p-6">
//             {/* Search & Filter Bar */}
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <Input
//                   className="pl-10 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
//                   placeholder="Search by name, email, or phone..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <select
//                 className="border border-gray-300 px-4 py-2.5 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer min-w-[160px]"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">⏳ Pending</option>
//                 <option value="approved">✓ Approved</option>
//                 <option value="rejected">✗ Rejected</option>
//               </select>
//             </div>

//             {/* Table */}
//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-16">
//                 <RefreshCw className="h-12 w-12 text-purple-600 animate-spin mb-4" />
//                 <p className="text-gray-500 text-lg">Loading applications...</p>
//               </div>
//             ) : filtered.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-16">
//                 <Users className="h-16 w-16 text-gray-300 mb-4" />
//                 <p className="text-gray-500 text-lg font-medium">No applications found</p>
//                 <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
//               </div>
//             ) : (
//               <div className="overflow-hidden rounded-xl border border-gray-200">
//                 <div className="overflow-x-auto">
                  
//                     <table className="min-w-full">

//                     <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                       <tr>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                           Applicant
//                         </th>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                           Contact
//                         </th>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {filtered.map((m, idx) => (
//                         <tr 
//                           key={m._id} 
//                           className="hover:bg-purple-50/50 transition-colors"
//                         >
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
//                                 {m.fullName.charAt(0).toUpperCase()}
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-gray-900">{m.fullName}</p>
//                                 <p className="text-xs text-gray-500">ID: {m._id.slice(-6)}</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="space-y-1">
//                               <div className="flex items-center gap-2 text-sm text-gray-600">
//                                 <Mail className="h-3.5 w-3.5 text-gray-400" />
//                                 {m.email}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold
//                               ${m.status === "approved" && "bg-green-100 text-green-700 border border-green-200"}
//                               ${m.status === "pending" && "bg-yellow-100 text-yellow-700 border border-yellow-200"}
//                               ${m.status === "rejected" && "bg-red-100 text-red-700 border border-red-200"}
//                             `}>
//                               {m.status === "approved" && "✓ "}
//                               {m.status === "pending" && "⏳ "}
//                               {m.status === "rejected" && "✗ "}
//                               {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex justify-end gap-2">
//                               <Button
//                                 size="sm"
//                                 variant="outline"
//                                 onClick={() => setSelectedApp(m)}
//                                 className="hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
//                               >
//                                 <Eye className="h-4 w-4 mr-1" />
//                                 View
//                               </Button>

//                               {m.status === "pending" && (
//                                 <>
//                                   <Button
//                                     size="sm"
//                                     className="bg-green-600 hover:bg-green-700 text-white"
//                                     onClick={() => updateStatus(m._id, "approved")}
//                                     disabled={processingId === m._id}
//                                   >
//                                     {processingId === m._id ? (
//                                       <RefreshCw className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <>
//                                         <CheckCircle className="h-4 w-4 mr-1" />
//                                         Approve
//                                       </>
//                                     )}
//                                   </Button>
//                                   <Button
//                                     size="sm"
//                                     variant="destructive"
//                                     onClick={() => updateStatus(m._id, "rejected")}
//                                     disabled={processingId === m._id}
//                                     className="hover:bg-red-700"
//                                   >
//                                     <X className="h-4 w-4 mr-1" />
//                                     Reject
//                                   </Button>
//                                 </>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Preview Modal - Enhanced */}
//       {selectedApp && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-2xl font-bold">
//                     {selectedApp.fullName.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold">{selectedApp.fullName}</h3>
//                     <p className="text-purple-100 text-sm">Application Details</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setSelectedApp(null)}
//                   className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Modal Content */}
//             <div className="p-6 space-y-6">
//               {/* Status Badge */}
//               <div className="flex justify-center">
//                 <span className={`inline-flex items-center px-6 py-2 rounded-full text-sm font-semibold
//                   ${selectedApp.status === "approved" && "bg-green-100 text-green-700 border-2 border-green-300"}
//                   ${selectedApp.status === "pending" && "bg-yellow-100 text-yellow-700 border-2 border-yellow-300"}
//                   ${selectedApp.status === "rejected" && "bg-red-100 text-red-700 border-2 border-red-300"}
//                 `}>
//                   {selectedApp.status === "approved" && "✓ "}
//                   {selectedApp.status === "pending" && "⏳ "}
//                   {selectedApp.status === "rejected" && "✗ "}
//                   Status: {selectedApp.status.charAt(0).toUpperCase() + selectedApp.status.slice(1)}
//                 </span>
//               </div>

//               {/* Information Table */}
//               <div className="bg-gradient-to-br from-purple-50 via-white to-amber-50 rounded-xl border border-purple-100 overflow-hidden">
//                 <table className="w-full">
//                   <tbody className="divide-y divide-gray-200">
//                     <tr className="hover:bg-white/50 transition-colors">
//                       <td className="px-6 py-4 text-sm font-semibold text-gray-700 bg-gray-50 w-1/3">
//                         Full Name
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">
//                         {selectedApp.fullName}
//                       </td>
//                     </tr>
//                     <tr className="hover:bg-white/50 transition-colors">
//                       <td className="px-6 py-4 text-sm font-semibold text-gray-700 bg-gray-50">
//                         Email Address
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">
//                         <div className="flex items-center gap-2">
//                           <Mail className="h-4 w-4 text-purple-600" />
//                           {selectedApp.email}
//                         </div>
//                       </td>
//                     </tr>
//                     <tr className="hover:bg-white/50 transition-colors">
//                       <td className="px-6 py-4 text-sm font-semibold text-gray-700 bg-gray-50">
//                         Application Status
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
//                           ${selectedApp.status === "approved" && "bg-green-100 text-green-700 border border-green-200"}
//                           ${selectedApp.status === "pending" && "bg-yellow-100 text-yellow-700 border border-yellow-200"}
//                           ${selectedApp.status === "rejected" && "bg-red-100 text-red-700 border border-red-200"}
//                         `}>
//                           {selectedApp.status === "approved" && "✓ "}
//                           {selectedApp.status === "pending" && "⏳ "}
//                           {selectedApp.status === "rejected" && "✗ "}
//                           {selectedApp.status.charAt(0).toUpperCase() + selectedApp.status.slice(1)}
//                         </span>
//                       </td>
//                     </tr>
//                     <tr className="hover:bg-white/50 transition-colors">
//                       <td className="px-6 py-4 text-sm font-semibold text-gray-700 bg-gray-50">
//                         Application ID
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4 text-amber-600" />
//                           <span className="font-mono text-sm text-gray-900">{selectedApp._id}</span>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               {/* Action Buttons */}
//               {selectedApp.status === "pending" && (
//                 <div className="flex gap-3 pt-4 border-t">
//                   <Button
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12"
//                     onClick={() => {
//                       updateStatus(selectedApp._id, "approved");
//                       setSelectedApp(null);
//                     }}
//                   >
//                     <CheckCircle className="h-5 w-5 mr-2" />
//                     Approve Application
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     className="flex-1 h-12"
//                     onClick={() => {
//                       updateStatus(selectedApp._id, "rejected");
//                       setSelectedApp(null);
//                     }}
//                   >
//                     <X className="h-5 w-5 mr-2" />
//                     Reject Application
//                   </Button>
//                 </div>
//               )}

//               <Button
//                 variant="outline"
//                 className="w-full h-12"
//                 onClick={() => setSelectedApp(null)}
//               >
//                 Close Preview
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Approval Success Modal - Enhanced */}
//       {showApprovalModal && approvedMember && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
//             {/* Success Header */}
//             <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-white text-center rounded-t-2xl">
//               <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CheckCircle className="h-12 w-12" />
//               </div>
//               <h3 className="text-3xl font-bold mb-2">Success! 🎉</h3>
//               <p className="text-green-100">Application Approved</p>
//             </div>

//             {/* Content */}
//             <div className="p-6 space-y-6">
//               <div className="text-center">
//                 <p className="text-gray-600 mb-2">
//                   <strong className="text-gray-900 text-lg">{approvedMember.fullName}</strong> has been successfully approved as a member.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-br from-purple-50 via-white to-amber-50 rounded-xl p-5 border border-purple-100">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between pb-3 border-b border-gray-200">
//                     <span className="text-sm text-gray-600 flex items-center gap-2">
//                       <Mail className="h-4 w-4" />
//                       Email
//                     </span>
//                     <span className="font-semibold text-gray-900">{approvedMember.email}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600 flex items-center gap-2">
//                       <Users className="h-4 w-4" />
//                       Status
//                     </span>
//                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
//                       ✓ Active Member
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <Button
//                   variant="outline"
//                   className="flex-1 h-11"
//                   onClick={() => setShowApprovalModal(false)}
//                 >
//                   Continue
//                 </Button>
//                 <Button
//                   className="flex-1 h-11 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600"
//                   onClick={() => window.open("/member-management", "_blank")}
//                 >
//                   <Users className="h-4 w-4 mr-2" />
//                   View Members
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MembershipApplicationsPage;

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

  // =========================
  // LOAD APPLICATIONS (API)
  // =========================
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

  // =========================
  // UPDATE STATUS (API)
  // =========================
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

  // =========================
  // FILTERING
  // =========================
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
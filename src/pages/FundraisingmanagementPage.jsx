import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Plus, Trash, Pencil } from "lucide-react";
import { Input } from "../components/ui/input.jsx";
import { useFundraisingAdmin } from "../hooks/useFundraisingAdmin.js";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";

const FundraisingManagementPage = () => {
  const [activeTab, setActiveTab] = useState("fundraising-management");
  const [showForm, setShowForm] = useState(false);
  const [editFund, setEditFund] = useState(null);
const [isSubmitting, setIsSubmitting] = useState(false);

  const { funds, loading, createFund, updateFund, deleteFund } =
    useFundraisingAdmin();

  const [form, setForm] = useState({
    name: "",
    city: "",
    payment: 0,
    limit: "",
    image: null,
    description: "",
    tags: "",
  });
  const [deleteId, setDeleteId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    const handleDelete = (id) => {
      setDeleteId(id);
      setShowDeleteConfirm(true);
    };
  

  // SUBMIT FORM
const handleSubmit = async (e) => {
  e.preventDefault();

  // ⛔ double submit guard
  if (isSubmitting) return;

  setIsSubmitting(true);

  try {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("city", form.city);
    fd.append("payment", form.payment);
    fd.append("limit", form.limit);
    fd.append("description", form.description);

    const tagsToSend = typeof form.tags === "string"
      ? form.tags.split(",").map((t) => t.trim())
      : form.tags;

    fd.append("tags", JSON.stringify(tagsToSend));

    if (form.image && typeof form.image !== "string") {
      fd.append("image", form.image);
    }

    if (editFund) {
      await updateFund(editFund._id, fd);
    } else {
      await createFund(fd);
    }

    setShowForm(false);
    setEditFund(null);
  } catch (err) {
    console.error("Submit failed:", err);
  } finally {
    setIsSubmitting(false); // ✅ unlock
  }
};


  const handleEdit = (fund) => {
    setEditFund(fund);
    setForm({
      name: fund.name,
      city: fund.city,
      payment: fund.payment,
      limit: fund.limit,
      image: fund.image,
      description: fund.description,
      tags: fund.tags.join(", "),
    });
    setShowForm(true);
  };
const confirmDelete = async () => {
  try {
    await deleteFund(deleteId);   // ⭐ hook ka function
    setShowDeleteConfirm(false);
    setDeleteId(null);
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Fundraising Management</h1>
              <p className="text-gray-600">Manage fundraising campaigns efficiently</p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg">Fundraising Items ({funds.length})</CardTitle>
                <Button size="sm" onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Fund
                </Button>
              </CardHeader>

              <CardContent>
                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : funds.length === 0 ? (
                  <p className="text-center text-gray-400 py-10">No Fundraising Data Available</p>
                ) : (
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-100 text-gray-700">
                          <th className="p-3 font-medium">Image</th>
                          <th className="p-3 font-medium">Name</th>
                          <th className="p-3 font-medium">City</th>
                          <th className="p-3 font-medium">Raised</th>
                          <th className="p-3 font-medium">Goal</th>
                          <th className="p-3 font-medium">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {funds.map((item) => (
                          <tr key={item._id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <img
                                src={item.image}
                                className="w-14 h-14 rounded object-cover border"
                              />
                            </td>
                            <td className="p-3">{item.name}</td>
                            <td className="p-3">{item.city}</td>
                            <td className="p-3 text-green-600 font-semibold">₹{item.payment}</td>
                            <td className="p-3">₹{item.limit}</td>

                            <td className="p-3 flex gap-2">
                              <Button variant="ghost" onClick={() => handleEdit(item)}>
                                <Pencil className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                onClick={() => handleDelete(item._id)}
                                className="text-red-500"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* MODAL FORM */}
    {showForm && (
  <div className="absolute inset-0 bg-white flex justify-center overflow-y-auto p-6">
    <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">

            <h2 className="text-xl font-bold mb-4">
              {editFund ? "Edit Fundraising Item" : "Create Fundraising Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* NAME */}
              <div>
                <label className="font-medium text-gray-700">Fund Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter fund name"
                />
              </div>

              {/* CITY */}
              <div>
                <label className="font-medium text-gray-700">City</label>
                <Input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Enter city"
                />
              </div>

              {/* PAYMENT + GOAL */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-700">Initial Amount</label>
                  <Input
                    type="number"
                    value={form.payment}
                    onChange={(e) => setForm({ ...form, payment: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-700">Goal Limit</label>
                  <Input
                    type="number"
                    value={form.limit}
                    onChange={(e) => setForm({ ...form, limit: e.target.value })}
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Upload Image</label>

                <input
                  type="file"
                  accept="image/*"
                  id="fundImage"
                  className="hidden"
                  onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                />

                <label
                  htmlFor="fundImage"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-fit mt-2"
                >
                  Choose Image
                </label>

                <p className="text-sm text-gray-500 mt-1">
                  {form.image ? (typeof form.image === "string" ? "Existing Image" : form.image.name)
                    : "No file selected"}
                </p>

                {/* PREVIEW */}
               {form.image && (
  <img
    src={
      typeof form.image === "string"
        ? form.image // ✨ Cloudinary ke liye sirf itna kaafi hai
        : URL.createObjectURL(form.image) // Nayi file ke liye same rahega
    }
    className="w-28 h-28 rounded object-cover mt-3 border shadow"
  />
)}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Write some details"
                />
              </div>

              {/* TAGS */}
              <div>
                <label className="font-medium text-gray-700">Tags (comma separated)</label>
                <Input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="e.g. health, education"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700"  disabled={isSubmitting}>
                  {editFund ? "Update" : "Create"}
                </Button>
              </div>

            </form>
          </div>
        </div>
      )} 
      <ConfirmDeleteModal
  show={showDeleteConfirm}
  onClose={() => setShowDeleteConfirm(false)}
  onConfirm={confirmDelete}
/>

    </div>
  );
};

export default FundraisingManagementPage;

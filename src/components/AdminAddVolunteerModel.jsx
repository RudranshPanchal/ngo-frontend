import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Users, X, Upload, CheckCircle2 } from "lucide-react";

/* ================= VALIDATION ================= */

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  gender: yup.string().required("Gender is required"),
  contactNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required(),
  email: yup.string().email().required(),
  profession: yup.string(),
  areaOfVolunteering: yup.string().required(),
  availability: yup.string().required(),
  tempPassword: yup.string().min(6).required(),
  confirmTempPassword: yup
    .string()
    .oneOf([yup.ref("tempPassword")], "Passwords do not match")
    .required(),
});

const AdminAddVolunteerModal = ({ open, onClose }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowSuccessModal(true);

    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "confirmTempPassword") {
          formData.append(key, data[key] || "");
        }
      });

      formData.append("password", data.tempPassword);

      if (uploadedFile) {
        formData.append("uploadIdProof", uploadedFile);
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/createVolunteerByAdmin`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      setShowSuccessModal(false);
      alert(err.response?.data?.message || "Failed to create volunteer");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-white shadow-lg relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X />
          </button>

          {/* Header */}
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>

            <CardTitle className="text-3xl font-bold text-purple-800">
              Add Volunteer
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Admin controlled volunteer onboarding
            </p>
          </CardHeader>

          {/* Content */}
          <CardContent className="px-8 pb-8 max-h-[65vh] overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input {...register("fullName")} />
                    {errors.fullName && (
                      <p className="text-xs text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value ?? ""} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Controller
                      name="contactNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="contactNumber"
                          type="tel"
                          {...field}
                          placeholder="Enter 10-digit number"
                          onChange={(e) => {
                            const filtered = e.target.value.replace(/\D/g, "").slice(0, 10);
                            field.onChange(filtered);
                          }}
                          className={errors.contactNumber ? "border-red-500" : ""}
                        />
                      )}
                    />
                    {errors.contactNumber && (
                      <p className="text-red-500 text-xs">{errors.contactNumber.message}</p>
                    )}
                  </div>



                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input {...register("email")} />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label>Profession</Label>
                    <Input {...register("profession")} />
                  </div>
                </div>
              </div>

              {/* Volunteering */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Volunteering Preferences</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Controller
                    name="areaOfVolunteering"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="fieldWork">Field Work</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="fundraising">Fundraising</SelectItem>
                          <SelectItem value="training">Training</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <Controller
                    name="availability"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                          <SelectItem value="weekend">Weekend</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Login Credentials</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input type="password" placeholder="Temporary Password" {...register("tempPassword")} />
                  <Input type="password" placeholder="Confirm Password" {...register("confirmTempPassword")} />
                </div>
              </div>

              {/* Emergency Contact Number */}
              <div className="space-y-2">
                <Label htmlFor="emergencyContactNumber">Emergency Contact Number *</Label>
                <Controller
                  name="emergencyContactNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="emergencyContactNumber"
                      type="tel"
                      {...field}
                      placeholder="Enter 10-digit number"
                      onChange={(e) => {
                        const filtered = e.target.value.replace(/\D/g, "").slice(0, 10);
                        field.onChange(filtered);
                      }}
                      className={errors.emergencyContactNumber ? "border-red-500" : ""}
                    />
                  )}
                />
                {errors.emergencyContactNumber && (
                  <p className="text-red-500 text-xs">{errors.emergencyContactNumber.message}</p>
                )}
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label>ID Proof</Label>
                <div className="flex items-center border rounded-md overflow-hidden relative">
                  <button
                    type="button"
                    onClick={() => document.getElementById("admin-id-proof").click()}
                    className="bg-purple-50 text-purple-700 px-4 py-2 font-semibold"
                  >
                    Choose File
                  </button>
                  <span className="flex-1 px-3 text-sm truncate">
                    {uploadedFile ? uploadedFile.name : "No file chosen"}
                  </span>
                  <Upload className="absolute right-3 text-gray-400" />
                </div>
                <input
                  id="admin-id-proof"
                  type="file"
                  hidden
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
              >
                {isSubmitting ? "Creating..." : "Add Volunteer"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Volunteer Created!</h3>
            <Button onClick={() => { setShowSuccessModal(false); onClose(); }}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddVolunteerModal;

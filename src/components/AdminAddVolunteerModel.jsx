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
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters"),

  gender: yup
    .string()
    .required("Gender is required"),

  dob: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Date of birth is required")
    .max(new Date(), "DOB cannot be in the future")
    .test("age", "Minimum age should be 16", (value) => {
      if (!value) return false;
      const today = new Date();
      const minDate = new Date(
        today.getFullYear() - 16,
        today.getMonth(),
        today.getDate()
      );
      return value <= minDate;
    }),

  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),

  skills: yup
    .string()
    .required("Skills are required")
    .min(2, "Please enter at least one skill"),

  profession: yup
    .string()
    .required("Profession is required")
    .min(2, "Profession must be at least 2 characters")
    .max(50, "Profession cannot exceed 50 characters"),

  areaOfVolunteering: yup
    .string()
    .required("Preferred area is required"),

  availability: yup
    .string()
    .required("Availability is required"),

  tempPassword: yup
    .string()
    .required("Temporary password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmTempPassword: yup
    .string()
    .required("Please confirm the password")
    .oneOf([yup.ref("tempPassword")], "Passwords do not match"),

  emergencyContactNumber: yup
    .string()
    .required("Emergency contact number is required")
    .matches(/^[0-9]{10}$/, "Emergency number must be 10 digits")
    .test(
      "different",
      "Emergency contact must be different from contact number",
      function (value) {
        return value !== this.parent.contactNumber;
      }
    ),

  idProof: yup
    .mixed()
    .required("ID proof is required")
    .test(
      "fileType",
      "Only PDF, JPG, JPEG, PNG files are allowed",
      (file) => {
        if (!file) return false;
        return ["application/pdf", "image/jpeg", "image/png"].includes(file.type);
      }
    ),
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
    defaultValues: {
      dob: null,
      idProof: null,
    },
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowSuccessModal(true);

    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "confirmTempPassword" && key !== "idProof") {
          formData.append(key, data[key] || "");
        }
      });

      formData.append("password", data.tempPassword);

      if (uploadedFile) {
        formData.append("uploadIdProof", uploadedFile);
      }

      let age = "";
      if (data.dob) {
        const today = new Date();
        const birthDate = new Date(data.dob);
        age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
      }

      formData.append("age", age);


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
            className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-600"
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
                    <Input {...register("fullName")} placeholder="Enter full name" />
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
                    {errors.gender && (
                      <p className="text-xs text-red-500">{errors.gender.message}</p>
                    )}

                  </div>

                  <div className="space-y-2">
                    <Label>Date of Birth *</Label>

                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="date"
                          {...field}
                          max={new Date().toISOString().split("T")[0]} // no future date
                          className={errors.dob ? "border-red-500" : ""}
                        />
                      )}
                    />

                    {errors.dob && (
                      <p className="text-xs text-red-500">{errors.dob.message}</p>
                    )}
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
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label>Address *</Label>
                    <textarea
                      {...register("address")}
                      rows={3}
                      placeholder="Enter full address"
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black ${errors.address ? "border-red-500" : "border-black-300"
                        }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Skills *</Label>
                    <Input
                      {...register("skills")}
                      placeholder="e.g. Teaching, IT, Marketing"
                    />
                    {errors.skills && (
                      <p className="text-xs text-red-500">{errors.skills.message}</p>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label>Profession</Label>
                    <Input {...register("profession")} placeholder="Enter profession" />
                    {errors.profession && (
                      <p className="text-xs text-red-500">{errors.profession.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Volunteering Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Volunteering Preferences</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Area of Volunteering */}
                  <div className="space-y-2">
                    <Label>Area of Volunteering *</Label>

                    <Controller
                      name="areaOfVolunteering"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value ?? ""} onValueChange={field.onChange}>
                          <SelectTrigger
                            className={errors.areaOfVolunteering ? "border-red-500" : ""}
                          >
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

                    {errors.areaOfVolunteering && (
                      <p className="text-xs text-red-500">
                        {errors.areaOfVolunteering.message}
                      </p>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="space-y-2">
                    <Label>Availability *</Label>

                    <Controller
                      name="availability"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value ?? ""} onValueChange={field.onChange}>
                          <SelectTrigger
                            className={errors.availability ? "border-red-500" : ""}
                          >
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

                    {errors.availability && (
                      <p className="text-xs text-red-500">
                        {errors.availability.message}
                      </p>
                    )}
                  </div>

                </div>
              </div>


              {/* Credentials */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Login Credentials</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input type="password" placeholder="Temporary Password" {...register("tempPassword")} />
                  {errors.tempPassword && (
                    <p className="text-xs text-red-500">{errors.tempPassword.message}</p>
                  )}

                  <Input type="password" placeholder="Confirm Password" {...register("confirmTempPassword")} />
                  {errors.confirmTempPassword && (
                    <p className="text-xs text-red-500">{errors.confirmTempPassword.message}</p>
                  )}
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
                <Label>ID Proof *</Label>

                <Controller
                  name="idProof"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        id="admin-id-proof"
                        type="file"
                        hidden
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          field.onChange(file);     // 🔥 RHF gets file
                          setUploadedFile(file);   // UI preview
                        }}
                      />

                      <div className={`flex items-center border rounded-md overflow-hidden relative
          ${errors.idProof ? "border-red-500" : "border-gray-300"}`}
                      >
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
                    </>
                  )}
                />

                {errors.idProof && (
                  <p className="text-xs text-red-500">{errors.idProof.message}</p>
                )}
              </div>


              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg cursor-pointer"
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

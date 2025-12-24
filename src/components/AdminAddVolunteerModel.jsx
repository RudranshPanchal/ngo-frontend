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
import { X } from "lucide-react";
import { CheckCircle2 } from "lucide-react";


/* ================= VALIDATION (same as volunteer form) ================= */

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
    tempPassword: yup
        .string()
        .required("Temporary password is required")
        .min(6, "Minimum 6 characters"),

    confirmTempPassword: yup
        .string()
        .oneOf([yup.ref("tempPassword")], "Passwords do not match")
        .required("Please confirm password"),
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
        setShowSuccessModal(true); // ⚡ show modal immediately

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

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/createVolunteerByAdmin`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Volunteer created successfully:", response.data);

        } catch (err) {
            console.error("Create volunteer error:", err);
            // ⚠️ If backend fails, show alert AND hide modal
            setShowSuccessModal(false);
            alert(err.response?.data?.message || "Failed to create volunteer");
        } finally {
            setIsSubmitting(false);
        }
    };


    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl relative overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-purple-600 to-amber-500">
                    <h2 className="text-lg font-semibold text-white">
                        Add Volunteer (Admin)
                    </h2>
                    <button onClick={onClose}>
                        <X className="h-5 w-5 text-white hover:opacity-80" />
                    </button>
                </div>

                {/* Body */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-8 max-h-[75vh] overflow-y-auto"
                >

                    {/* ================= PERSONAL INFO ================= */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label>Full Name *</Label>
                                <Input {...register("fullName")} />
                                {errors.fullName && (
                                    <p className="text-xs text-red-500">{errors.fullName.message}</p>
                                )}
                            </div>

                            {/* Gender */}
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

                            {/* Contact */}
                            <div className="space-y-2">
                                <Label>Contact Number *</Label>
                                <Input type="tel" id="contactNumber" {...register("contactNumber")} />
                                {errors.contactNumber && (
                                    <p className="text-xs text-red-500">
                                        {errors.contactNumber.message}
                                    </p>
                                )}

                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label>Email *</Label>
                                <Input type="email" {...register("email")} />
                            </div>

                            {/* Profession */}
                            <div className="space-y-2 sm:col-span-2">
                                <Label>Profession</Label>
                                <Input {...register("profession")} />
                            </div>
                        </div>
                    </div>

                    {/* ================= VOLUNTEERING ================= */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Volunteering Preferences
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Area */}
                            <div className="space-y-2">
                                <Label>Area of Volunteering *</Label>
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
                                {errors.availability && (
                                    <p className="text-xs text-red-500">
                                        {errors.availability.message}
                                    </p>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* ================= CREDENTIALS ================= */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Login Credentials
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Temp Password */}
                            <div className="space-y-2">
                                <Label>Temporary Password *</Label>
                                <Input type="password" {...register("tempPassword")} />
                                {errors.tempPassword && (
                                    <p className="text-xs text-red-500">
                                        {errors.tempPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm */}
                            <div className="space-y-2">
                                <Label>Confirm Temporary Password *</Label>
                                <Input type="password" {...register("confirmTempPassword")} />
                                {errors.confirmTempPassword && (
                                    <p className="text-xs text-red-500">
                                        {errors.confirmTempPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ================= FILE UPLOAD ================= */}
                    <div className="space-y-2">
                        <Label>ID Proof</Label>
                        <div className="flex items-center border rounded-md overflow-hidden">
                            <button
                                type="button"
                                onClick={() => document.getElementById("admin-id-proof").click()}
                                className="bg-purple-50 text-purple-700 px-4 py-2 text-sm font-semibold hover:bg-purple-100"
                            >
                                Choose File
                            </button>
                            <span className="flex-1 px-3 text-sm text-gray-600 truncate">
                                {uploadedFile ? uploadedFile.name : "No file chosen"}
                            </span>
                        </div>
                        <input
                            id="admin-id-proof"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => setUploadedFile(e.target.files[0])}
                        />
                    </div>

                    {/* ================= FOOTER ================= */}
                    <div className="flex justify-end gap-3 pt-6 border-t">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50">
                            {isSubmitting ? "Submitting..." : "Add Volunteer"}
                        </Button>
                    </div>
                </form>
            </div>
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="h-10 w-10 text-green-600" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Volunteer Created!
                            </h3>

                            <p className="text-gray-600 mb-6">
                                Volunteer account has been created successfully and login details
                                have been sent via email.
                            </p>

                            <Button
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    onClose();
                                }}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );

};

export default AdminAddVolunteerModal;

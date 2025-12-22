import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../components/ui/select.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { ArrowLeft, Users, Upload, CheckCircle2 } from "lucide-react";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Yup validation schema
const validationSchema = yup.object().shape({

  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),


  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["female", "male", "other"], "Please select a valid gender"),

  dob: yup
    .date()
    .typeError("Please enter a valid date") // ✅ helps catch string/invalid
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .test("age", "You must be at least 16 years old", function (value) {
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 16);
      return value && value <= cutoff;
    }),

  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
    .test("not-all-same", "Invalid phone number", (value) => {
      if (!value) return false;
      return !/^(\d)\1{9}$/.test(value);
    }),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email format"
    ),

  address: yup
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters"),

  skills: yup
    .string()
    .max(100, "Skills description must not exceed 100 characters"),

  profession: yup
    .string()
    .max(50, "Profession must not exceed 50 characters"),

  areaOfVolunteering: yup
    .string()
    .required("Please select preferred volunteering area")
    .oneOf(
      ["fieldWork", "online", "fundraising", "training"],
      "Please select a valid area"
    ),

  availability: yup
    .string()
    .required("Please select your availability")
    .oneOf(
      ["morning", "afternoon", "evening", "weekend"],
      "Please select a valid availability"
    ),

  emergencyContactNumber: yup
    .string()
    .required("Emergency contact number is required")
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
    .test("different", "Emergency contact must be different from your contact number",
      function (value) {
        return value !== this.parent.contactNumber;
      }
    ),

  whyJoinUs: yup
    .string()
    // .required("Please share why you want to join us")
    .min(20, "Please provide at least 20 characters")
    .max(500, "Response must not exceed 500 characters"),

  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const VolunteerRegistrationPage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dob, setDob] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // ✅ initialize both react-hook-form and local state in sync
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      gender: "",
      dob: "",
      contactNumber: "",
      email: "",
      address: "",
      skills: "",
      profession: "",
      areaOfVolunteering: "",
      availability: "",
      emergencyContactNumber: "",
      whyJoinUs: "",
      termsAccepted: false,
    },
  });

  // Note: we don't need a separate `formData` mirror — react-hook-form handles form state.
  const watchedDob = watch("dob");


  const onSubmit = async (data) => {
    const formDataToSend = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "dob" && data[key]) {
        formDataToSend.append("dob", new Date(data[key]).toISOString());
      } else {
        formDataToSend.append(key, data[key] || "");
      }
    });

    if (uploadedFile) {
      formDataToSend.append("uploadIdProof", uploadedFile);
    }

    // DEBUG
    const formDataToJSON = (formData) => {
      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      return obj;
    };
    console.log("formData---", formDataToJSON(formDataToSend));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/volunteer/register`,
        formDataToSend
      );
      console.log("response---", res);

      setShowSuccessModal(true);
      reset();
      setUploadedFile(null);
    } catch (err) {
      console.error("Backend error:", err);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setUploadedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-3 sm:px-4">
        <div className="mb-6">
          <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
            <ArrowLeft className="h-4 w-4" />
            <span onClick={() => navigate('/')} className="text-sm font-medium">Back to Home</span>
          </button>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-purple-800 mb-2">
              Volunteer Registration
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Join our mission to empower women through volunteering
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">


                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="fullName"
                          {...field}
                          placeholder="Enter your full name"
                          className={errors.fullName ? "border-red-500" : ""}
                          onChange={(e) => {
                            const filtered = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                            field.onChange(filtered);
                          }}
                        />
                      )}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs">{errors.fullName.message}</p>
                    )}
                  </div>


                  {/* Full Name */}

                  {/* <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="fullName"
                          name="fullName"
                          placeholder="Enter your full name"
                          onChange={(e) => handleChange(e, field)} // ✅ custom change
                        />
                      )}
                    />
                  </div> */}


                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="z-[60] bg-white border shadow-lg">
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <p className="text-red-500 text-xs">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      {...register("dob")}
                      className={errors.dob ? "border-red-500" : ""}
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-xs">
                        {errors.dob.message}
                      </p>
                    )}
                  </div> */}






                  <div className="space-y-2">
                    <Label>Date of Birth *</Label>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <ReactDatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="dd/mm/yyyy"
                          className="w-full border rounded p-2"
                          showYearDropdown
                          showMonthDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={100}
                        />
                      )}
                    />
                  </div>




                  {/* <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      {...register("contactNumber")}
                      inputMode="numeric"
                      maxLength={10}
                      className={errors.contactNumber ? "border-red-500" : ""}
                    />
                    {errors.contactNumber && (
                      <p className="text-red-500 text-xs">
                        {errors.contactNumber.message}
                      </p>
                    )}
                  </div> */}
                  {/* Contact Number */}
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
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession">Profession</Label>
                    <Input
                      id="profession"
                      {...register("profession")}
                      className={errors.profession ? "border-red-500" : ""}
                    />
                    {errors.profession && (
                      <p className="text-red-500 text-xs">
                        {errors.profession.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <textarea
                    id="address"
                    {...register("address")}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Interested Skills</Label>
                  <Input
                    id="skills"
                    {...register("skills")}
                    placeholder="e.g., Teaching, IT, Marketing"
                    className={errors.skills ? "border-red-500" : ""}
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-xs">
                      {errors.skills.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Volunteering Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Volunteering Preferences
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="areaOfVolunteering">Preferred Area *</Label>
                    <Controller
                      name="areaOfVolunteering"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className={errors.areaOfVolunteering ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select area" />
                          </SelectTrigger>
                          <SelectContent className="z-[60] bg-white border shadow-lg">
                            <SelectItem value="fieldWork">Field Work</SelectItem>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="fundraising">Fundraising</SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.areaOfVolunteering && (
                      <p className="text-red-500 text-xs">
                        {errors.areaOfVolunteering.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability *</Label>
                    <Controller
                      name="availability"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className={errors.availability ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent className="z-[60] bg-white border shadow-lg">
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                            <SelectItem value="evening">Evening</SelectItem>
                            <SelectItem value="weekend">Weekend</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.availability && (
                      <p className="text-red-500 text-xs">
                        {errors.availability.message}
                      </p>
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


                <div className="space-y-2">
                  <Label htmlFor="uploadIdProof">Upload ID Proof</Label>
                  <input
                    id="uploadIdProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden relative">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("uploadIdProof").click()
                      }
                      className="bg-purple-50 text-purple-700 font-semibold px-4 py-2 text-sm hover:bg-purple-100"
                    >
                      Choose File
                    </button>
                    <span className="flex-1 px-3 text-gray-600 text-sm truncate select-none">
                      {uploadedFile ? uploadedFile.name : "No file chosen"}
                    </span>
                    <div className="absolute right-3 pointer-events-none">
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Accepted formats: PDF, JPG, JPEG, PNG (Max 5MB)
                  </p>
                </div>
              </div>

              {/* Why Join Us */}
              <div className="space-y-2">
                <Label htmlFor="whyJoinUs">Why do you want to join us? *</Label>
                <textarea
                  id="whyJoinUs"
                  {...register("whyJoinUs")}
                  rows={3}
                  placeholder="Tell us what motivates you to be a volunteer..."
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${errors.whyJoinUs ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.whyJoinUs && (
                  <p className="text-red-500 text-xs">
                    {errors.whyJoinUs.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("termsAccepted")}
                    className="w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the terms and conditions and commit to
                    volunteering responsibly
                  </span>
                </label>
                {errors.termsAccepted && (
                  <p className="text-red-500 text-xs">
                    {errors.termsAccepted.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? "Registering..." : "Register as Volunteer"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
     {showSuccessModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-8 max-w-md w-full">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Welcome!
        </h3>
        <p className="text-gray-600 mb-6">
          Your volunteer registration has been submitted successfully!
        </p>
        <Button
          onClick={() => setShowSuccessModal(false)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
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

export default VolunteerRegistrationPage;
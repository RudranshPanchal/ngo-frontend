import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

/* UI COMPONENTS (JSX me use ho rahe hain) */
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../components/ui/card.jsx";

import { ArrowLeft, Users, Upload, CheckCircle2 } from "lucide-react";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* custom hook */
import { useVolunteerRegister } from "../hooks/useVolunteerRegister";

/* ===============================
   VALIDATION SCHEMA (TOP ONLY)
================================ */
const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2)
    .max(50)
    .matches(/^[a-zA-Z\s]+$/, "Only letters allowed"),

  gender: yup.string().required(),

  dob: yup
    .date()
    .required()
    .max(new Date())
    .test("age", "Minimum age 16", (value) => {
      const d = new Date();
      d.setFullYear(d.getFullYear() - 16);
      return value && value <= d;
    }),

  contactNumber: yup
    .string()
  .required("Contact number is required")
  .length(10, "Enter a valid 10-digit mobile number"),
email: yup
  .string()
  .required("Email is required")
  .email("Please enter a valid email"),
    // email: yup.string().required().email(),

  address: yup.string().min(10).max(200),
  skills: yup.string().max(100),
  profession: yup.string().max(50),

  areaOfVolunteering: yup.string().required(),
  availability: yup.string().required(),

  emergencyContactNumber: yup
    .string()
    .required()
    .matches(/^[0-9]{10}$/)
    .test("different", "Must be different", function (v) {
      return v !== this.parent.contactNumber;
    }),

  whyJoinUs: yup.string().min(20).max(500),

  termsAccepted: yup.boolean().oneOf([true]),
});

/* ===============================
   COMPONENT START
================================ */
const VolunteerRegistrationPage = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    clearErrors,
    watch,
    trigger,
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

  const {
  submitVolunteer,
  uploadedFile,
  handleFileChange,
  showSuccessModal,
  setShowSuccessModal,

  // PHONE OTP
  phoneOtp,
  setPhoneOtp,
  phoneOtpSent,
  phoneVerified,
  sendPhoneOtp,
  phoneOtpLoading,   
setEmailError,
  // EMAIL OTP
  emailOtp,
  setEmailOtp,
  emailOtpSent,
  emailVerified,
  sendEmailOtp,
  emailOtpLoading,
 phoneTimer,   
 phoneError,
 emailTimer,
  emailError,
  phoneOtpError,
  setPhoneError,
  verifyEmail,
  verifyPhone,
  emailOtpError,
  verifying,
} = useVolunteerRegister({ reset, getValues });

  const onSubmit = async (data) => {
    try {
      await submitVolunteer(data);
    } catch (err) {
      console.error("Volunteer registration failed", err);
    }
  };

  const watchedDob = watch("dob");
const handleSendPhoneOtp = async () => {
  const phone = getValues("contactNumber");

  //  invalid
  if (!phone || phone.length !== 10) {
    trigger("contactNumber");
    return;
  }

  // valid → errors hatao
  clearErrors("contactNumber");
  setPhoneError("");

  //  IMPORTANT: number pass karo
  await sendPhoneOtp(phone);
};

const handleSendEmailOtp = async () => {
  const email = getValues("email");

  if (!email) {
    trigger("email");
    return;
  }

  clearErrors("email");
  setEmailError("");

  await sendEmailOtp(email);
};

  /* ⬇️ JSX RETURN YAHAN SE START HOTA HAI */

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
                  {/* Contact Number
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
                  </div> */}

                  {/* PHONE OTP
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-600">Phone OTP (optional)</Label>

                    {!phoneOtpSent && (
                      <Button
                        type="button"
                        onClick={sendPhoneOtp}
                        variant="outline"
                        className="w-full"
                      >
                        Send OTP
                      </Button>
                    )}

                    {phoneOtpSent && !phoneVerified && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          placeholder="Enter Phone OTP"
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                        />
                        <Button
                          type="button"
                          onClick={verifyPhone}
                          disabled={verifying || !phoneOtp}
                        >
                          Verify
                        </Button>
                      </div>
                    )}

                    {phoneVerified && (
                      <p className="text-green-600 text-sm font-medium">✔ Phone Verified</p>
     
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
        disabled={phoneVerified}   
        onChange={(e) => {
          const filtered = e.target.value.replace(/\D/g, "").slice(0, 10);
          field.onChange(filtered);
           if (filtered.length === 10) {
  clearErrors("contactNumber");
  trigger("contactNumber");
  setPhoneError("");   // 👈 OTP error clear
}
        }}
        className={errors.contactNumber || phoneError ? "border-red-500" : ""}
          
      />
    )}
  />
  {(errors.contactNumber || phoneError) && (
      <p className="text-xs text-red-600">
        {errors.contactNumber?.message || phoneError}
      </p>
    )}
</div>

{/* PHONE VERIFICATION */}
<div className="space-y-2">
  {/* LABEL — sirf text */}
  <p className="text-sm text-gray-600">
    Phone Verification (optional)
  </p>

  {/* BUTTON — hamesha next line me */}
  {!phoneOtpSent && (
    <Button
      type="button"
      onClick={handleSendPhoneOtp}
      disabled={phoneOtpLoading || phoneTimer > 0}
      className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-fit"
    >
      {phoneOtpLoading ? "Sending..." : "Send OTP(for pone verification)"}
    </Button>
  )}

  {/* {phoneError && <p className="text-xs text-red-600">{phoneError}</p>} */}

  {phoneOtpSent && !phoneVerified && (
    <>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Enter 6 digit OTP"
           maxLength={6}       
          value={phoneOtp}
          onChange={(e) => setPhoneOtp(e.target.value)}
        />
        <Button
          type="button"
          onClick={verifyPhone}
          disabled={verifying}
          variant="outline"
          className="bg-purple-600 text-white  hover:bg-purple-700"
        >
          Verify
        </Button>
      </div>

      {phoneOtpError && (
        <p className="text-xs text-red-600">{phoneOtpError}</p>
      )}

      {phoneTimer > 0 ? (
        <p className="text-xs text-gray-500">
          Resend OTP in {phoneTimer}s
        </p>
      ) : (
        <button
          type="button"
          onClick={sendPhoneOtp}
          className="text-xs text-purple-600 hover:underline"
        >
          Resend OTP
        </button>
      )}
    </>
  )}

  {phoneVerified && (
    <p className="text-sm text-green-600 font-medium">
      ✔ Phone number verified
    </p>
  )}
</div>

                  {/* Email
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email.message}</p>
                    )}
                  </div> */}

                  {/* EMAIL OTP
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-600">Email OTP (optional)</Label>

                    {!emailOtpSent && (
                      <Button
                        type="button"
                        onClick={sendEmailOtp}
                        variant="outline"
                        className="w-full"
                      >
                        Send OTP
                      </Button>
                    )}

                    {emailOtpSent && !emailVerified && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          placeholder="Enter Email OTP"
                          value={emailOtp}
                          onChange={(e) => setEmailOtp(e.target.value)}
                        />
                        <Button
                          type="button"
                          onClick={verifyEmail}
                          disabled={verifying || !emailOtp}
                        >
                          Verify
                        </Button>
                      </div>
                    )}

                    {emailVerified && (
                      <p className="text-green-600 text-sm font-medium">✔ Email Verified</p>
                    )}
                  </div> */}
{/* Email */}
<div className="space-y-2">
  <Label htmlFor="email">Email *</Label>
  <Input
    id="email"
    type="email"
    disabled={emailVerified}
    {...register("email")}
    className={errors.email || emailError ? "border-red-500" : ""}
  />
{(errors.email || emailError) && (
      <p className="text-xs text-red-600">
        {errors.email?.message || emailError}
      </p>
    )}  
</div>

{/* EMAIL VERIFICATION */}
<div className="space-y-2">
  <p className="text-sm text-gray-600">Email Verification (optional)</p>

  {!emailOtpSent && (
    <Button
      type="button"
      onClick={handleSendEmailOtp}
      disabled={emailOtpLoading || emailTimer > 0}
      variant="outline"
      className="w-full sm:w-fit bg-purple-600 hover:bg-purple-700 text-white"
    >
      {emailOtpLoading ? "Sending..." : "Send OTP(for email verification)"}
    </Button>
  )}

  {/* {emailError && <p className="text-xs text-red-600">{emailError}</p>} */}

  {emailOtpSent && !emailVerified && (
    <>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Enter 6 digit OTP"
           maxLength={6}       
          value={emailOtp}
          onChange={(e) => setEmailOtp(e.target.value)}
        />
        <Button
          type="button"
          onClick={verifyEmail}
          disabled={verifying}
          variant="outline"
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          Verify
        </Button>
      </div>

      {emailOtpError && (
        <p className="text-xs text-red-600">{emailOtpError}</p>
      )}

      {emailTimer > 0 ? (
        <p className="text-xs text-gray-500">
          Resend OTP in {emailTimer}s
        </p>
      ) : (
        <button
          type="button"
          onClick={sendEmailOtp}
          className="text-xs text-purple-600 hover:underline"
        >
          Resend OTP
        </button>
      )}
    </>
  )}

  {emailVerified && (
    <p className="text-sm text-green-600 font-medium">
      ✔ Email verified
    </p>
  )}
</div>

                  {/* <div className="space-y-2">
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
                  </div> */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <textarea
                    id="address"
                    {...register("address")}
                    rows={3}
                    className={`w-full px-3 py-2 border-2 rounded-md focus:ring-2 focus:ring-purple-500 ${errors.address ? "border-red-500" : "border-gray-300"
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


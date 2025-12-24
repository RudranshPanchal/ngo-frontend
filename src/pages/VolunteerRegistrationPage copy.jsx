import React, { useState } from "react";
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
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import { ArrowLeft, Users, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";
import Modal from "../components/ui/modal.jsx";

const VolunteerRegistrationPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppContext();
  const [formData, setFormData] = useState({
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
    uploadIdProof: null,
    whyJoinUs: "",
    termsAccepted: false,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState("");

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.dob) errors.dob = "Date of birth is required";
    if (!formData.contactNumber)
      errors.contactNumber = "Contact number is required";
    else if (!/^[0-9]{10}$/.test(formData.contactNumber))
      errors.contactNumber = "Enter a valid 10-digit number";
    if (!formData.email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Enter a valid email address";
    if (!formData.areaOfVolunteering)
      errors.areaOfVolunteering = "Select preferred volunteering area";
    if (!formData.availability)
      errors.availability = "Select your availability";
    if (!formData.emergencyContactNumber)
      errors.emergencyContactNumber = "Emergency contact is required";
    else if (!/^[0-9]{10}$/.test(formData.emergencyContactNumber))
      errors.emergencyContactNumber = "Enter a valid 10-digit number";
    if (!formData.whyJoinUs.trim())
      errors.whyJoinUs = "Please share why you want to join";
    if (!formData.termsAccepted)
      errors.termsAccepted = "You must accept the terms";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Save volunteer data to localStorage for dashboard access
    const volunteerData = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.contactNumber,
      address: formData.address,
      gender: formData.gender,
      dob: formData.dob,
      skills: formData.skills,
      profession: formData.profession,
      areaOfVolunteering: formData.areaOfVolunteering,
      availability: formData.availability,
      emergencyContactNumber: formData.emergencyContactNumber,
      whyJoinUs: formData.whyJoinUs,
      role: "volunteer",
      registrationDate: new Date().toISOString(),
      joinDate: new Date().toLocaleDateString(),
      tasksCompleted: 0,
      eventsAttended: 0,
      hoursVolunteered: 0,
    };

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) formDataToSend.append(key, value);
      });
      console.log("formdata----", formData);

      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/volunteer/register",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Backend registration successful");
        }
      }
    } catch (error) {
      console.log(
        "Backend unavailable, proceeding with local storage:",
        error.message
      );
    }

    // Always save to localStorage and proceed
    localStorage.setItem("volunteerData", JSON.stringify(volunteerData));
    localStorage.setItem("userData", JSON.stringify(volunteerData));
    localStorage.setItem("authToken", "volunteer_" + Date.now());
    localStorage.setItem("role", "volunteer");

    setCurrentUser(volunteerData);
    setShowSuccessModal(true);

    setFormData({
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
      uploadIdProof: null,
      whyJoinUs: "",
      termsAccepted: false,
    });
    setValidationErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-3 sm:px-4">
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-[#6b21a8] mb-2">
              Volunteer Registration
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Join our mission to empower women through volunteering
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* --- Personal Info --- */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        const onlyLetters = e.target.value.replace(
                          /[^a-zA-Z\s]/g,
                          ""
                        );
                        setFormData((prev) => ({
                          ...prev,
                          fullName: onlyLetters,
                        }));
                      }}
                      required
                    />
                    {validationErrors.fullName && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.fullName}
                      </p>
                    )}
                  </div> */}
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...register("fullName")}
                      placeholder="Enter your full name"
                      className={errors.fullName ? "border-red-500" : ""}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // ✅ allow only letters and spaces
                      }}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs">{errors.fullName.message}</p>
                    )}
                  </div>



                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="z-[60] bg-white border shadow-lg">
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.gender && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.gender}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                    {validationErrors.dob && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.dob}
                      </p>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        if (onlyDigits.length <= 10) {
                          setFormData((prev) => ({
                            ...prev,
                            contactNumber: onlyDigits,
                          }));
                        }
                      }}
                      required
                      inputMode="numeric"
                      maxLength={10}
                    />
                    {validationErrors.contactNumber && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.contactNumber}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession">Profession</Label>
                    <Input
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Interested Skills</Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g., Teaching, IT, Marketing, etc."
                  />
                </div>
              </div>

              {/* --- Volunteering Preferences --- */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Volunteering Preferences
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="areaOfVolunteering">
                      Preferred Area *
                    </Label>
                    <Select
                      value={formData.areaOfVolunteering}
                      onValueChange={(value) =>
                        handleSelectChange("areaOfVolunteering", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent className="z-[60] bg-white border shadow-lg">
                        <SelectItem value="fieldWork">Field Work</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="fundraising">
                          Fundraising
                        </SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.areaOfVolunteering && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.areaOfVolunteering}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability *</Label>
                    <Select
                      value={formData.availability}
                      onValueChange={(value) =>
                        handleSelectChange("availability", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent className="z-[60] bg-white border shadow-lg">
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                        <SelectItem value="weekend">Weekend</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.availability && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.availability}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactNumber">
                    Emergency Contact Number *
                  </Label>
                  <Input
                    id="emergencyContactNumber"
                    name="emergencyContactNumber"
                    type="tel"
                    value={formData.emergencyContactNumber}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      if (onlyDigits.length <= 10) {
                        setFormData((prev) => ({
                          ...prev,
                          emergencyContactNumber: onlyDigits,
                        }));
                      }
                    }}
                    required
                    inputMode="numeric"
                    maxLength={10}
                  />
                  {validationErrors.emergencyContactNumber && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.emergencyContactNumber}
                    </p>
                  )}
                </div>

                {/* --- Upload --- */}
                <div className="space-y-2">
                  <Label htmlFor="uploadIdProof">Upload ID Proof</Label>
                  <input
                    id="uploadIdProof"
                    name="uploadIdProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleChange}
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
                      {formData.uploadIdProof
                        ? formData.uploadIdProof.name
                        : "No file chosen"}
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

              {/* --- Why Join Us --- */}
              <div className="space-y-2">
                <Label htmlFor="whyJoinUs">Why do you want to join us? *</Label>
                <textarea
                  id="whyJoinUs"
                  name="whyJoinUs"
                  value={formData.whyJoinUs}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us what motivates you to be a volunteer..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  required
                />
                {validationErrors.whyJoinUs && (
                  <p className="text-red-500 text-xs">
                    {validationErrors.whyJoinUs}
                  </p>
                )}
              </div>

              {/* --- Terms --- */}
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the terms and conditions and commit to
                    volunteering responsibly
                  </span>
                </label>
                {validationErrors.termsAccepted && (
                  <p className="text-red-500 text-xs">
                    {validationErrors.termsAccepted}
                  </p>
                )}
              </div>

              {/* --- Submit --- */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
                >
                  Register as Volunteer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* --- Modals --- */}
      <Modal
        isOpen={!!showErrorModal}
        onClose={() => setShowErrorModal("")}
        title="Validation Error"
      >
        <div className="text-center">
          <p className="text-gray-700 mb-6">{showErrorModal}</p>
          <Button
            onClick={() => setShowErrorModal("")}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            OK
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/dashboard");
        }}
        title="Registration Successful"
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome! 🎉</h3>
          <p className="text-gray-600 mb-6">
            Your volunteer registration has been submitted successfully!
          </p>
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/dashboard");
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-3"
          >
            Go to Dashboard
          </Button>
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/");
            }}
            variant="outline"
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default VolunteerRegistrationPage;

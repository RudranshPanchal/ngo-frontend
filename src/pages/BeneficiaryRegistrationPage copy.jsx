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
import { ArrowLeft, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";

const BeneficiaryRegistrationPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    contactNumber: "",
    address: "",
    familyDetails: "",
    typesOfSupport: [],
    governmentId: "",
    specialRequirement: "",
    consent: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save beneficiary data to localStorage
    const beneficiaryData = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email || "",
      phone: formData.contactNumber,
      address: formData.address,
      gender: formData.gender,
      age: formData.dob
        ? new Date().getFullYear() - new Date(formData.dob).getFullYear()
        : "",
      occupation: "Beneficiary",
      joinDate: new Date().toLocaleDateString(),
      programsEnrolled: 0,
      certificatesEarned: 0,
      eventsAttended: 0,
      role: "beneficiary",
      typesOfSupport: formData.typesOfSupport,
      specialRequirement: formData.specialRequirement,
      registrationDate: new Date().toISOString(),
    };

    try {
      // Try backend first
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/beneficiary/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
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
    localStorage.setItem("beneficiaryData", JSON.stringify(beneficiaryData));
    localStorage.setItem("userData", JSON.stringify(beneficiaryData));
    localStorage.setItem("authToken", "beneficiary_" + Date.now());
    localStorage.setItem("role", "beneficiary");

    // Set current user in context
    setCurrentUser(beneficiaryData);

    alert("Registration successful! We will contact you soon.");
    setFormData({
      fullName: "",
      gender: "",
      dob: "",
      contactNumber: "",
      address: "",
      familyDetails: "",
      typesOfSupport: [],
      governmentId: "",
      specialRequirement: "",
      consent: false,
    });
    // Redirect to beneficiary dashboard after successful registration
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupportChange = (support) => {
    setFormData((prev) => ({
      ...prev,
      typesOfSupport: prev.typesOfSupport.includes(support)
        ? prev.typesOfSupport.filter((s) => s !== support)
        : [...prev.typesOfSupport, support],
    }));
  };

  const supportTypes = ["training", "education", "health", "livelihood"];

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
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-[#6b21a8] mb-2">
              Beneficiary Registration
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Register to receive support and empowerment services
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      onChange={handleChange}
                      required
                    />
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        const onlyLetters = e.target.value.replace(
                          /[^a-zA-Z\s]/g,
                          ""
                        ); // remove numbers & special chars
                        setFormData((prev) => ({
                          ...prev,
                          fullName: onlyLetters,
                        }));
                      }}
                      required
                    />
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
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, ""); // remove all non-digits
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
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="familyDetails">Family Details</Label>
                  <textarea
                    id="familyDetails"
                    name="familyDetails"
                    value={formData.familyDetails}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Family size, dependents, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Support Requirements
                </h3>

                <div className="space-y-3">
                  <Label>Type of Support Needed *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {supportTypes.map((support) => (
                      <label
                        key={support}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.typesOfSupport.includes(support)}
                          onChange={() => handleSupportChange(support)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {support}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="governmentId">Government ID (Optional)</Label>
                  <Input
                    id="governmentId"
                    name="governmentId"
                    value={formData.governmentId}
                    onChange={handleChange}
                    placeholder="Aadhaar, Voter ID, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequirement">
                    Special Requirements/Notes
                  </Label>
                  <textarea
                    id="specialRequirement"
                    name="specialRequirement"
                    value={formData.specialRequirement}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any specific needs or requirements"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I consent to sharing my information for program eligibility
                    and support services
                  </span>
                </label>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
                >
                  Register as Beneficiary
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BeneficiaryRegistrationPage;

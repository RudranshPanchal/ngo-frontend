import React, { useEffect, useState, useRef } from "react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Card, CardContent, CardHeader, CardTitle, } from "../components/ui/card.jsx";
import { Heart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/ui/modal.jsx";
import payImage from "../assets/pay.jpeg";

const DonorRegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amountData = location.state;
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    organisationName: "",
    contactNumber: "",
    email: "",
    address: "",
    panNumber: "",
    gstNumber: "",
    donationAmount: amountData || "",
    uploadPaymentProof: null,
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (showSuccessModal) {
      setCountdown(5);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowSuccessModal(false);
            navigate(-1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showSuccessModal, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let newValue = value;

    switch (name) {
      case "fullName":
        newValue = value.replace(/[^A-Za-z\s]/g, "");
        break;
      case "organisationName":
        newValue = value.replace(/[^A-Za-z0-9\s&.,]/g, "");
        break;
      case "contactNumber":
        newValue = value.replace(/\D/g, "").slice(0, 10);
        break;
      case "email":
        newValue = value.replace(/[^a-z0-9@._-]/gi, "").toLowerCase();
        break;
      case "panNumber":
        newValue = value.replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 10);
        break;
      case "gstNumber":
        newValue = value.replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 15);
        break;
      case "donationAmount":
        newValue = value.replace(/\D/g, "");
        break;
      default:
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : newValue,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        uploadPaymentProof: file,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Only letters and spaces allowed.";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be exactly 10 digits.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Please enter a valid Gmail address.";
    }

    if (formData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = "Invalid PAN format (e.g. ABCDE1234F).";
    }

    if (formData.gstNumber && !/^[0-9A-Z]{15}$/.test(formData.gstNumber)) {
      newErrors.gstNumber = "Invalid GST number (15 characters).";
    }

    if (!formData.donationAmount || formData.donationAmount <= 0) {
      newErrors.donationAmount = "Donation amount must be greater than 0.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowErrorModal("Please correct the highlighted errors before submitting.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      }
      
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/donor/regesterDonor", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setShowSuccessModal(true);
          // Reset form
          setFormData({
            fullName: "",
            organisationName: "",
            contactNumber: "",
            email: "",
            address: "",
            panNumber: "",
            gstNumber: "",
            donationAmount: "",
            uploadPaymentProof: null,
          });
          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } else {
          setShowErrorModal(data.message || "Something went wrong!");
        }
      } else {
        setShowErrorModal("Server error. Please try again later.");
      }
    } catch (error) {
      console.log("Backend unavailable:", error.message);
      setShowErrorModal("Unable to connect to the backend. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-8">
      <div className="max-w-2xl w-full mx-auto px-4">
        <Card className="bg-white shadow-lg border-0">
          {amountData && (
            <button 
              className="px-3 py-1 mt-2 ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-sm" 
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          )}

          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <CardTitle className="text-3xl font-bold text-purple-700 mb-2">
              Donor Registration
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Support our mission to empower women through skills development
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donor Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Donor Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Organisation */}
                  <div className="space-y-2">
                    <Label htmlFor="organisationName">Organization</Label>
                    <Input
                      id="organisationName"
                      name="organisationName"
                      value={formData.organisationName}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact *</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      maxLength={10}
                    />
                    {errors.contactNumber && (
                      <p className="text-xs text-red-500">{errors.contactNumber}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* PAN */}
                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN</Label>
                    <Input
                      id="panNumber"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      placeholder="ABCDE1234F"
                    />
                    {errors.panNumber && (
                      <p className="text-xs text-red-500">{errors.panNumber}</p>
                    )}
                  </div>

                  {/* GST */}
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST</Label>
                    <Input
                      id="gstNumber"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      placeholder="15-character GST"
                    />
                    {errors.gstNumber && (
                      <p className="text-xs text-red-500">{errors.gstNumber}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Optional"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Donation Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Donation Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donationAmount">Amount *</Label>
                    <Input
                      id="donationAmount"
                      name="donationAmount"
                      type="number"
                      value={formData.donationAmount}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      disabled={!!amountData}
                      className={amountData ? "bg-gray-100 cursor-not-allowed" : ""}
                    />
                    {errors.donationAmount && (
                      <p className="text-xs text-red-500">{errors.donationAmount}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* QR Code Payment Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Options</h3>
                <div className="bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200 rounded-lg p-4 sm:p-6">
                  <div className="text-center">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Scan QR Code to Donate</h4>
                    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border-2 border-purple-200">
                        <img src={payImage} alt="Payment QR Code" className="w-60 h-60 sm:w-48 sm:h-48 object-contain" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">Use any UPI app to scan and pay</p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
                          <p className="text-xs sm:text-sm font-medium text-green-800">Donations are covered under 80G of Income Tax Act</p>
                          <p className="text-xs text-green-600 mt-1">Get tax exemption on your donation amount</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Proof */}
              <div className="space-y-2">
                <Label htmlFor="uploadPaymentProof">Upload Payment Proof</Label>
                <div className="flex flex-col items-start">
                  <input
                    ref={fileInputRef}
                    id="uploadPaymentProof"
                    name="uploadPaymentProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-gray-600 text-sm truncate max-w-xs mt-2">
                    {formData.uploadPaymentProof
                      ? formData.uploadPaymentProof.name
                      : "No file chosen"}
                  </span>
                  <label
                    htmlFor="uploadPaymentProof"
                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold mt-3"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold rounded-lg"
              >
                Donate Now
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Error Modal */}
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

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate(-1);
        }}
        title="Registration Successful"
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Thank You!
          </h3>
          <p className="text-gray-600 mb-6">
            Your donation registration has been submitted successfully!
          </p>
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
          <p className="text-xs text-purple-600 mt-4 font-medium">
            Auto-redirecting in {countdown} seconds...
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default DonorRegistrationPage;
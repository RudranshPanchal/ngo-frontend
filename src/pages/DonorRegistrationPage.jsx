import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Heart, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/ui/modal.jsx";
import payImage from "../assets/pay.jpeg";
import api from "../config/api";

// Validation Schema with Yup
const donorSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  organisationName: yup
    .string()
    .required("organisationName is required")
    .matches(/^[A-Za-z0-9\s&.,]*$/, "Only letters, numbers, and &., are allowed")
    .max(200, "Organization name must not exceed 200 characters"),

  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(/^\d{10}$/, "Contact number must be exactly 10 digits"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"),

  address: yup
    .string()
    .max(500, "Address must not exceed 500 characters"),

  panNumber: yup
    .string()
    .required("Pan Number is required")
    .matches(/^([A-Z]{5}[0-9]{4}[A-Z]{1})?$/, "Invalid PAN format (e.g., ABCDE1234F)")
    .test('pan-optional-length', 'PAN must be exactly 10 characters', function (value) {
      if (!value || value.length === 0) return true;
      return value.length === 10;
    }),

  gstNumber: yup
    .string()
    .required("GST Number is required")
    .matches(/^([0-9A-Z]{15})?$/, "Invalid GST number (must be 15 characters)")
    .test('gst-optional-length', 'GST must be exactly 15 characters', function (value) {
      if (!value || value.length === 0) return true;
      return value.length === 15;
    }),

  donationAmount: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .positive("Donation amount must be greater than 0")
    .integer("Donation amount must be a whole number")
    .min(1, "Minimum donation is ₹1")
    .max(10000000, "Maximum donation is ₹1,00,00,000"),

  uploadPaymentProof: yup
    .mixed()
    .test('fileSize', 'File size must be less than 5MB', function (value) {
      if (!value || !value[0]) return true;
      return value[0].size <= 5242880; // 5MB
    })
    .test('fileType', 'Only PDF, JPG, JPEG, PNG files are allowed', function (value) {
      if (!value || !value[0]) return true;
      return ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(value[0].type);
    })
});

const DonorRegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amountData = location.state;

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState("");
  const [countdown, setCountdown] = useState(5);

  // ✅ Handle Input Change for all fields
  const handleChange = (e, field) => {
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

    if (type === "file") {
      field.onChange(files);
    } else {
      field.onChange(newValue);
    }
  };

  // React Hook Form with Yup validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(donorSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      organisationName: "",
      contactNumber: "",
      email: "",
      address: "",
      panNumber: "",
      gstNumber: "",
      donationAmount: amountData?.presetAmount || "",
      uploadPaymentProof: [],
    }
  });

  const uploadedFile = watch("uploadPaymentProof");

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

  // Handle form submission
 const onSubmit = async (data) => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "uploadPaymentProof" && value && value[0]) {
        formData.append("uploadPaymentProof", value[0]);
      } else {
        formData.append(key, value);
      }
    });

    formData.append("fundraisingId", amountData?.fundraisingId || "");

    const response = await api.post(
      "/api/donor/regesterDonor",
      formData
    );

    console.log("Backend response:", response.data);

    if (response.data.success) {
      setShowSuccessModal(true);
      reset();
    } else {
      setShowErrorModal("Server error. Please try again later.");
    }
  } catch (error) {
    console.error("Submit error:", error);
    setShowErrorModal(
      error.response?.data?.message || "Unable to connect to backend"
    );
  }
};


  // const onSubmit = async (data) => {
  //   try {
  //     console.log("data-----", data.uploadPaymentProof);
  //     const response = await axios.post(
  //       import.meta.env.VITE_BACKEND_URL + "/api/donor/regesterDonor", data);

  //     if (response.data.success) {
  //       if (response.data.success) {
  //         setShowSuccessModal(true);
  //         reset();
  //       }
  //     } else {
  //       setShowErrorModal("Server error. Please try again later.");
  //     }

  //   } catch (error) {
  //     console.log("Backend unavailable:", error.message);
  //   }
  // };





  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-8">
      <div className="max-w-2xl w-full mx-auto">
        <Card className="bg-white shadow-lg border-0">
          {amountData && (
            <button
              className="flex gap-2 px-3 py-1 mt-2 ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Donor Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Donor Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="fullName" name="fullName" placeholder="Enter your name" onChange={(e) => handleChange(e, field)} />
                      )}
                    />

                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                  </div>

                  {/* Organisation */}
                  <div className="space-y-2">
                    <Label htmlFor="organisationName">Organization</Label>
                    <Controller
                      name="organisationName"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="organisationName" name="organisationName" placeholder="Organization name" onChange={(e) => handleChange(e, field)} />
                      )}
                    />
                    {errors.organisationName && <p className="text-xs text-red-500">{errors.organisationName.message}</p>}
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact *</Label>
                    <Controller
                      name="contactNumber"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="contactNumber" name="contactNumber" type="tel" placeholder="10-digit number" onChange={(e) => handleChange(e, field)} />
                      )}
                    />
                    {errors.contactNumber && <p className="text-xs text-red-500">{errors.contactNumber.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="email" name="email" type="email" placeholder="example@gmail.com" onChange={(e) => handleChange(e, field)} />
                      )}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>

                  {/* PAN */}
                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN</Label>
                    <Controller
                      name="panNumber"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="panNumber" name="panNumber" placeholder="ABCDE1234F" onChange={(e) => handleChange(e, field)} />
                      )}
                    />
                    {errors.panNumber && <p className="text-xs text-red-500">{errors.panNumber.message}</p>}
                  </div>

                  {/* GST */}
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST</Label>
                    <Controller
                      name="gstNumber"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="gstNumber" name="gstNumber" placeholder="15-character GST" onChange={(e) => handleChange(e, field)} />
                      )}
                    />
                    {errors.gstNumber && <p className="text-xs text-red-500">{errors.gstNumber.message}</p>}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <textarea {...field} id="address" rows={3} placeholder="Enter your address" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500" />
                    )}
                  />
                  {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                </div>
              </div>

              {/* Donation Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Donation Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donationAmount">Amount *</Label>
                    <Controller
                      name="donationAmount"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="donationAmount" name="donationAmount" type="number" placeholder="Enter amount" disabled={amountData?.presetAmount ? true : false} onChange={(e) => handleChange(e, field)} />
                      )}
                    />
                    {errors.donationAmount && <p className="text-xs text-red-500">{errors.donationAmount.message}</p>}
                  </div>
                </div>
              </div>

              {/* QR Payment Section */}
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
                <Label htmlFor="uploadPaymentProof">Upload Payment Proof (Optional)</Label>
                <div className="flex flex-col items-start">
                  <Controller
                    name="uploadPaymentProof"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="uploadPaymentProof"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => field.onChange(e.target.files)}
                        className="hidden"
                      />
                    )}
                  />

                  <span className="text-gray-600 text-sm truncate max-w-xs mt-2">
                    {uploadedFile && uploadedFile[0] ? uploadedFile[0].name : "No file chosen"}
                  </span>
                  <label htmlFor="uploadPaymentProof" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold mt-3">
                    Choose File
                  </label>
                  {errors.uploadPaymentProof && <p className="text-xs text-red-500 mt-1">{errors.uploadPaymentProof.message}</p>}
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold rounded-lg">
                Donate Now
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Error Modal */}
      <Modal isOpen={!!showErrorModal} onClose={() => setShowErrorModal("")} title="Validation Error">
        <div className="text-center">
          <p className="text-gray-700 mb-6">{showErrorModal}</p>
          <Button onClick={() => setShowErrorModal("")} className="w-full bg-red-600 hover:bg-red-700 text-white">
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
            <Heart className="h-10 w-10 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Thank you for your generous contribution!
          </h3>
          <p className="text-gray-600 mb-4">
            You’ll be redirected in {countdown} seconds...
          </p>
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              navigate(-1);
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Go Back Now
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DonorRegistrationPage;
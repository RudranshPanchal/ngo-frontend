import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Yup validation (simplified for preview)
const validateField = (name, value, formData) => {
  const errors = {};
  
  switch(name) {
    case 'fullName':
      if (!value) errors.fullName = "Full name is required";
      else if (value.length < 2) errors.fullName = "Name must be at least 2 characters";
      else if (value.length > 50) errors.fullName = "Name must not exceed 50 characters";
      else if (!/^[a-zA-Z\s]+$/.test(value)) errors.fullName = "Name can only contain letters and spaces";
      break;
    
    case 'gender':
      if (!value) errors.gender = "Gender is required";
      break;
    
    case 'dob':
      if (!value) errors.dob = "Date of birth is required";
      else {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (birthDate > today) errors.dob = "Date of birth cannot be in the future";
        else if (age < 1) errors.dob = "You must be at least 1 year old";
      }
      break;
    
    case 'contactNumber':
      if (!value) errors.contactNumber = "Contact number is required";
      else if (!/^[0-9]{10}$/.test(value)) errors.contactNumber = "Contact number must be exactly 10 digits";
      break;
    
    case 'address':
      if (!value) errors.address = "Address is required";
      else if (value.length < 10) errors.address = "Address must be at least 10 characters";
      else if (value.length > 200) errors.address = "Address must not exceed 200 characters";
      break;
    
    case 'familyDetails':
      if (value && value.length > 500) errors.familyDetails = "Family details must not exceed 500 characters";
      break;
    
    case 'typesOfSupport':
      if (!value || value.length === 0) errors.typesOfSupport = "Please select at least one type of support";
      break;
    
    case 'governmentId':
      if (value && !/^[a-zA-Z0-9\s-]*$/.test(value)) errors.governmentId = "Invalid government ID format";
      else if (value && value.length > 20) errors.governmentId = "Government ID must not exceed 20 characters";
      break;
    
    case 'specialRequirement':
      if (value && value.length > 500) errors.specialRequirement = "Special requirements must not exceed 500 characters";
      break;
    
    case 'consent':
      if (!value) errors.consent = "You must consent to proceed";
      break;
  }
  
  return errors;
};

const BeneficiaryRegistrationPage = () => {
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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const fieldErrors = validateField(fieldName, formData[fieldName], formData);
    setErrors((prev) => ({ ...prev, ...fieldErrors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    let allErrors = {};
    Object.keys(formData).forEach(key => {
      const fieldErrors = validateField(key, formData[key], formData);
      allErrors = { ...allErrors, ...fieldErrors };
    });

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      const allTouched = {};
      Object.keys(formData).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
      
      alert("Please fix all errors before submitting");
      return;
    }

    alert("Registration successful! (This is a preview)");
    console.log("Form Data:", formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (touched[name]) {
      const fieldErrors = validateField(name, newValue, formData);
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (Object.keys(fieldErrors).length === 0) {
          delete newErrors[name];
        } else {
          Object.assign(newErrors, fieldErrors);
        }
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const fieldErrors = validateField(name, value, formData);
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (Object.keys(fieldErrors).length === 0) {
          delete newErrors[name];
        } else {
          Object.assign(newErrors, fieldErrors);
        }
        return newErrors;
      });
    }
  };

  const handleSupportChange = (support) => {
    const newSupports = formData.typesOfSupport.includes(support)
      ? formData.typesOfSupport.filter((s) => s !== support)
      : [...formData.typesOfSupport, support];
    
    setFormData((prev) => ({
      ...prev,
      typesOfSupport: newSupports,
    }));

    if (touched.typesOfSupport) {
      const fieldErrors = validateField("typesOfSupport", newSupports, formData);
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (Object.keys(fieldErrors).length === 0) {
          delete newErrors.typesOfSupport;
        } else {
          Object.assign(newErrors, fieldErrors);
        }
        return newErrors;
      });
    }
  };

  const supportTypes = ["training", "education", "health", "livelihood"];

  const showError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-3 sm:px-4">
        <div className="mb-6">
          <button  onClick={()=>navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg">
          <div className="text-center pb-8 pt-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-purple-800 mb-2">
              Beneficiary Registration
            </h1>
            <p className="text-gray-600 text-lg">
              Register to receive support and empowerment services
            </p>
          </div>

          <div className="px-8 pb-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                        setFormData((prev) => ({ ...prev, fullName: onlyLetters }));
                        if (touched.fullName) {
                          const fieldErrors = validateField("fullName", onlyLetters, formData);
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            if (Object.keys(fieldErrors).length === 0) {
                              delete newErrors.fullName;
                            } else {
                              Object.assign(newErrors, fieldErrors);
                            }
                            return newErrors;
                          });
                        }
                      }}
                      onBlur={() => handleBlur("fullName")}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${
                        showError("fullName") ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {showError("fullName") && (
                      <p className="text-red-500 text-sm">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => {
                        handleSelectChange("gender", e.target.value);
                        setTouched((prev) => ({ ...prev, gender: true }));
                      }}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${
                        showError("gender") ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                    {showError("gender") && (
                      <p className="text-red-500 text-sm">{errors.gender}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                    <input
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      onBlur={() => handleBlur("dob")}
                      max={new Date().toISOString().split('T')[0]}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${
                        showError("dob") ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {showError("dob") && (
                      <p className="text-red-500 text-sm">{errors.dob}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Contact Number *</label>
                    <input
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        if (onlyDigits.length <= 10) {
                          setFormData((prev) => ({ ...prev, contactNumber: onlyDigits }));
                          if (touched.contactNumber) {
                            const fieldErrors = validateField("contactNumber", onlyDigits, formData);
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              if (Object.keys(fieldErrors).length === 0) {
                                delete newErrors.contactNumber;
                              } else {
                                Object.assign(newErrors, fieldErrors);
                              }
                              return newErrors;
                            });
                          }
                        }
                      }}
                      onBlur={() => handleBlur("contactNumber")}
                      maxLength={10}
                      placeholder="Enter 10 digit number"
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${
                        showError("contactNumber") ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {showError("contactNumber") && (
                      <p className="text-red-500 text-sm">{errors.contactNumber}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={() => handleBlur("address")}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${
                      showError("address") ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {showError("address") && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Family Details</label>
                  <textarea
                    name="familyDetails"
                    value={formData.familyDetails}
                    onChange={handleChange}
                    onBlur={() => handleBlur("familyDetails")}
                    rows={3}
                    placeholder="Family size, dependents, etc."
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${
                      showError("familyDetails") ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {showError("familyDetails") && (
                    <p className="text-red-500 text-sm">{errors.familyDetails}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Support Requirements
                </h3>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Type of Support Needed *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {supportTypes.map((support) => (
                      <label
                        key={support}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.typesOfSupport.includes(support)}
                          onChange={() => {
                            handleSupportChange(support);
                            setTouched((prev) => ({ ...prev, typesOfSupport: true }));
                          }}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {support}
                        </span>
                      </label>
                    ))}
                  </div>
                  {showError("typesOfSupport") && (
                    <p className="text-red-500 text-sm">{errors.typesOfSupport}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Government ID (Optional)</label>
                  <input
                    name="governmentId"
                    value={formData.governmentId}
                    onChange={handleChange}
                    onBlur={() => handleBlur("governmentId")}
                    placeholder="Aadhaar, Voter ID, etc."
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${
                      showError("governmentId") ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {showError("governmentId") && (
                    <p className="text-red-500 text-sm">{errors.governmentId}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Special Requirements/Notes</label>
                  <textarea
                    name="specialRequirement"
                    value={formData.specialRequirement}
                    onChange={handleChange}
                    onBlur={() => handleBlur("specialRequirement")}
                    rows={3}
                    placeholder="Any specific needs or requirements"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${
                      showError("specialRequirement") ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {showError("specialRequirement") && (
                    <p className="text-red-500 text-sm">{errors.specialRequirement}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={(e) => {
                      handleChange(e);
                      setTouched((prev) => ({ ...prev, consent: true }));
                    }}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    I consent to sharing my information for program eligibility
                    and support services
                  </span>
                </label>
                {showError("consent") && (
                  <p className="text-red-500 text-sm">{errors.consent}</p>
                )}
              </div>

              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold rounded-md transition-colors"
                >
                  Register as Beneficiary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryRegistrationPage;
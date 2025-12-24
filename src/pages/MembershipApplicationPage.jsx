import React, { useEffect, useState } from "react";
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
import { ArrowLeft, UserPlus, CheckCircle, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MembershipApplicationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",        
    age: "",           
    contactNumber: "", 
    email: "",         
    address: "",       
    area: "",
    state: "",
    pinCode: "",       
    typesOfSupport: [],
    specialRequirement: "",
  });

  // local file state for governmentIdProof
  const [govIdFile, setGovIdFile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const TYPES = [
    { label: "Training", value: "training" },
    { label: "Education", value: "education" },
    { label: "Health", value: "health" },
    { label: "Livelihood", value: "livelihood" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((p) => {
      const exists = p.typesOfSupport.includes(value);
      return {
        ...p,
        typesOfSupport: exists ? p.typesOfSupport.filter(v => v !== value) : [...p.typesOfSupport, value]
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setGovIdFile(file || null);
  };

  const validateRequired = () => {
    const required = ["fullName","gender","age","contactNumber","email","address"];
    for (const k of required) {
      if (!formData[k] || (typeof formData[k] === 'string' && formData[k].trim() === "")) {
        return { ok: false, field: k };
      }
    }
    // basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) return { ok: false, field: "email" };
    return { ok: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateRequired();
    if (!validation.ok) {
      alert(`Please fill required field: ${validation.field}`);
      return;
    }

    // Prepare payload fields exactly matching model keys
    const payloadFields = {
      fullName: formData.fullName,
      gender: formData.gender,
      age: Number(formData.age),
      contactNumber: formData.contactNumber,
      email: formData.email,
      address: formData.address,
      area: formData.area || "",
      state: formData.state || "",
      pinCode: formData.pinCode || "",
      typesOfSupport: formData.typesOfSupport, 
      specialRequirement: formData.specialRequirement || "",
      status: "pending" 
    };

    try {
      const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      let response;
      if (govIdFile) {
        const fd = new FormData();
        Object.keys(payloadFields).forEach(k => {
          if (Array.isArray(payloadFields[k])) {
            payloadFields[k].forEach(item => fd.append(k, item));
          } else {
            fd.append(k, payloadFields[k]);
          }
        });
        fd.append("governmentIdProof", govIdFile);

        response = await fetch(`${BACKEND}/api/member/register`, {
          method: "POST",
          body: fd,
        });
      } else {
        response = await fetch(`${BACKEND}/api/member/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadFields),
        });
      }

      const data = await response.json().catch(()=>({}));
      if (response.ok) {
        console.log("Member registration success:", data);
        setShowSuccessModal(true);
        const KEY = "membershipApplications";
        const memberDataClient = {
          id: Date.now().toString(),
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.contactNumber,
          occupation: "",
          address: formData.address,
          city: formData.area,
          state: formData.state,
          pincode: formData.pinCode,
          areaOfInterest: formData.typesOfSupport.join(", "),
          motivation: formData.specialRequirement || "",
          status: "Pending",
          submittedAt: new Date().toISOString(),
        };
        const existing = JSON.parse(localStorage.getItem(KEY) || "[]");
        existing.unshift(memberDataClient);
        localStorage.setItem(KEY, JSON.stringify(existing));
        window.dispatchEvent(new CustomEvent("membershipApplications:updated", { detail: memberDataClient }));
        // reset form
        setFormData({
          fullName: "",
          gender: "",
          age: "",
          contactNumber: "",
          email: "",
          address: "",
          area: "",
          state: "",
          pinCode: "",
          typesOfSupport: [],
          specialRequirement: ""
        });
        setGovIdFile(null);
      } else {
        console.error("Register failed:", data);
        alert("Server error: " + (data?.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("Network error while registering:", err);
      alert("Network/server error. Check backend or console.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 py-4 sm:py-8 lg:py-15">
      <div className="max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto px-4">
        <div className="mb-4 sm:mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
                  <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
            </div>

            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#6b21a8] mb-2">
              Apply for Membership
            </CardTitle>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-2">
              Join Orbosis Foundation and be part of women empowerment
            </p>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Personal Information */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-xs sm:text-sm font-medium text-gray-700">Full Name *</Label>
                    <Input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" required />
                  </div>

                  <div>
                    <Label htmlFor="gender" className="text-xs sm:text-sm font-medium text-gray-700">Gender *</Label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm" required>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-xs sm:text-sm font-medium text-gray-700">Age *</Label>
                    <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} placeholder="e.g., 25" min={10} required />
                  </div>

                  <div>
                    <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">Contact Number *</Label>
                    <Input id="contactNumber" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} placeholder="9876543210" required />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" required />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Details</h3>
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address *</Label>
                  <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Street, locality, etc." className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="area" className="text-sm font-medium text-gray-700">Area</Label>
                    <Input id="area" name="area" value={formData.area} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="pinCode" className="text-sm font-medium text-gray-700">Pin Code</Label>
                    <Input id="pinCode" name="pinCode" value={formData.pinCode} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Interests + Support Types */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Types of Support (choose any)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {TYPES.map(t => (
                    <label key={t.value} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={formData.typesOfSupport.includes(t.value)} onChange={() => handleCheckboxChange(t.value)} />
                      <span className="capitalize">{t.label}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <Label htmlFor="specialRequirement" className="text-sm font-medium text-gray-700">Special Requirement</Label>
                  <textarea id="specialRequirement" name="specialRequirement" value={formData.specialRequirement} onChange={handleChange} rows={3} placeholder="Any special requirement" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none" />
                </div>

                <div>
                  <Label htmlFor="governmentIdProof" className="text-sm font-medium text-gray-700">Government ID Proof (optional)</Label>
                  <input id="governmentIdProof" name="governmentIdProof" type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
                  <p className="text-xs text-gray-500 mt-1">If you upload a file, it will be sent to the server (multipart form).</p>
                </div>
              </div>

              <div className="pt-6">
                <Button type="submit" className="w-full bg-purple-600 text-white hover:bg-purple-700 ">Submit Application</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 relative shadow-lg p-6 text-center">
              <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4">
                <X />
              </button>
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Application Submitted Successfully!</h3>
              <p className="mb-4">We will review your application and contact you soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipApplicationPage;
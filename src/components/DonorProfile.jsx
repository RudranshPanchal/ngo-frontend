import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, Heart, AlertTriangle, CheckCircle } from 'lucide-react'; // Added icons
import axios from 'axios';


const Card = ({ className = '', children, ...props }) => (
  <div className={`rounded-xl border bg-white text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);
const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);
const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);
const CardContent = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);
const Button = ({ className = '', variant, children, ...props }) => {
  let baseStyle = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 shadow-md';

  // Original styles retained
  if (!variant || variant === 'default') {
    baseStyle += ' bg-purple-600 text-white hover:bg-purple-700';
  }
  if (variant === 'outline') {
    baseStyle += ' border border-gray-300 bg-white text-gray-700 hover:bg-gray-100';
  }

  // Specific styles from the original component
  if (className.includes('bg-green-600')) {
    baseStyle = baseStyle.replace('bg-purple-600', 'bg-green-600').replace('hover:bg-purple-700', 'hover:bg-green-700');
  }

  return (
    <button className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
const Input = ({ className = '', type = 'text', ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 focus-visible:outline-none transition ${className}`}
    {...props}
  />
);
const Label = ({ className = '', children, ...props }) => (
  <label className={`text-sm font-medium leading-none text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);

// Simple component to display errors below inputs
const ErrorMessage = ({ error, className = '' }) => {
  if (!error) return null;
  return (
    <p className={`text-xs text-red-500 mt-1 flex items-center gap-1 ${className}`}>
      <AlertTriangle className="h-3 w-3" />
      {error}
    </p>
  );
};

const mockDonorApi = {
  updateProfile: (data) => new Promise(resolve => {
    // In a real app, this would be an axios.put/patch call
    console.log('Mock API: Profile updated', data);
    setTimeout(() => resolve({ success: true }), 500);
  }),
};



const validateProfile = (data) => {
  const newErrors = {};

  // 1. Full Name Validation: Required
  if (!data.fullName || String(data.fullName).trim() === '') {
    newErrors.fullName = 'Full Name is required.';
  }

  // 2. Email Validation: Valid format required
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    newErrors.email = 'Please enter a valid email address.';
  }

  // 3. Phone Number Validation: Mandatory 10 numeric digits only
  const phoneValue = data.phone ? String(data.phone).trim() : '';
  const phoneRegex = /^\d{10}$/;

  if (phoneValue.length === 0) {
    newErrors.phone = 'Phone number is required.';
  } else if (!phoneRegex.test(phoneValue)) {
    newErrors.phone = 'Phone must be exactly 10 numeric digits and contain only numbers.';
  }

  // 4. Address Validation: Required
  if (!data.address || String(data.address).trim() === '') {
    newErrors.address = 'Street Address is required.';
  }

  // 5. City Validation: Required
  if (!data.city || String(data.city).trim() === '') {
    newErrors.city = 'City is required.';
  }

  // 6. State Validation: Required
  if (!data.state || String(data.state).trim() === '') {
    newErrors.state = 'State is required.';
  }

  return newErrors;
};



const DonorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [editedProfile, setEditedProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({}); // State for validation errors
  const [message, setMessage] = useState(null); // State for success/failure messages

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      console.log("loffoo")
      const token = await localStorage.getItem('authToken');
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');

      if (!token) {
        console.log("no token found")
        setError('No authentication token found');
        setIsLoading(false);
        return;
      }
      console.log("-------------", token)
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL +'/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then((res)=>{
        console.log('---',res.data)
          const data = res.data;          
          setProfile(data.user);
          setEditedProfile(data.user);
      })
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback to localStorage data
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      setProfile(userData);
      setEditedProfile(userData);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSave = async () => {
    setMessage(null);

    // 1. Run validation before saving
    // Note: We use editedProfile.fullName etc, which may not match API field names (e.g., 'name')
    // but preserves the provided component's internal state structure.
    const validationErrors = validateProfile(editedProfile);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage({ type: 'error', text: 'Please correct the highlighted errors before saving.' });
      return;
    }

    setErrors({}); // Clear errors if validation passes

    try {
      // Using mockApi for update to satisfy compiler, replace with actual donorApi.updateProfile in your environment
      await mockDonorApi.updateProfile(editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
      // Retaining original use of alert()
      alert('Profile updated successfully!');
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      // Retaining original use of alert()
      alert('Failed to update profile. Please try again.');
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setErrors({}); // Clear errors on cancel
    setMessage(null); // Clear messages on cancel
  };

  const handleInputChange = (field, value) => {
    setErrors(prev => ({ ...prev, [field]: undefined })); // Clear error for the field being edited

    let newValue = value;

    // Specific input restriction for phone number: allow only digits and limit to 10
    if (field === 'phone') {
      // This filters out non-digit characters and limits length client-side
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    // Specific input restriction for pan and gst to allow alphanumeric
    if (['panNumber', 'gstNumber'].includes(field)) {
      // Allow alphanumeric, spaces, and hyphens (common for these fields)
      newValue = value.toUpperCase().replace(/[^A-Z0-9- ]/g, '');
    }


    setEditedProfile(prev => ({ ...prev, [field]: newValue }));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Profile...</h3>
          </div>
        </div>
      </div>
    );
  }

  const avgDonation = profile.donationsCount > 0
    ? Math.round(profile.totalDonated / profile.donationsCount).toLocaleString()
    : '0';

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your donor profile information.</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Status Message Display */}
        {message && (
          <div className={`p-4 mb-6 rounded-lg shadow-md flex items-center ${message.type === 'success'
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-3" />
            ) : (
              <AlertTriangle className="h-5 w-5 mr-3" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {profile.fullName?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.fullName}</h2>
                    <p className="text-gray-600">Valued Donor</p>
                    <p className="text-sm text-gray-500">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    {isEditing ? (
                      <>
                        <Input
                          id="fullName"
                          value={editedProfile.fullName || ''}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className={errors.fullName ? 'border-red-500' : ''}
                        />
                        <ErrorMessage error={errors.fullName} />
                      </>
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{profile.fullName}</span>
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <>
                        <Input
                          id="email"
                          type="email"
                          value={editedProfile.email || ''}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        <ErrorMessage error={errors.email} />
                      </>
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{profile.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <>
                        <Input
                          id="phone"
                          type="tel"
                          value={editedProfile.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          maxLength={10} // Enforce max length visually
                          className={errors.phone ? 'border-red-500' : ''}
                          placeholder="10 Digits only"
                        />
                        <ErrorMessage error={errors.phone} />
                      </>
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Filler to keep grid layout clean */}
                  <div></div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Street Address Field */}
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      {isEditing ? (
                        <>
                          <Input
                            id="address"
                            value={editedProfile.address || ''}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className={errors.address ? 'border-red-500' : ''}
                          />
                          <ErrorMessage error={errors.address} />
                        </>
                      ) : (
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{profile.address}</span>
                        </div>
                      )}
                    </div>

                    {/* City Field */}
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      {isEditing ? (
                        <>
                          <Input
                            id="city"
                            value={editedProfile.city || ''}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={errors.city ? 'border-red-500' : ''}
                          />
                          <ErrorMessage error={errors.city} />
                        </>
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">
                          <span>{profile.city}</span>
                        </div>
                      )}
                    </div>

                    {/* State Field */}
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      {isEditing ? (
                        <>
                          <Input
                            id="state"
                            value={editedProfile.state || ''}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className={errors.state ? 'border-red-500' : ''}
                          />
                          <ErrorMessage error={errors.state} />
                        </>
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">
                          <span>{profile.state}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donation Details Section */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  Donation Registration Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Organization</Label>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <span>{profile.organization || 'Not specified'}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Donation Amount</Label>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <span className="font-semibold text-green-600">₹{profile.totalDonated?.toLocaleString() || '0'}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Donation Frequency</Label>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <span>{profile.donationFrequency}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Mode</Label>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <span>{profile.donationMode}</span>
                    </div>
                  </div>

                  {profile.panNumber && (
                    <div className="space-y-2">
                      <Label>PAN Number</Label>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <span>{profile.panNumber}</span>
                      </div>
                    </div>
                  )}

                  {profile.gstNumber && (
                    <div className="space-y-2">
                      <Label>GST Number</Label>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <span>{profile.gstNumber}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Registration Date</span>
                    <span className="font-semibold">{profile.joinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Donation Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600 mb-1">₹{profile.totalDonated?.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Contributed</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Donations</span>
                    <span className="font-semibold">{profile.donationsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Donation</span>
                    <span className="font-semibold">₹{avgDonation}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preferred Causes</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredCauses?.map((cause, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Clock,
  Edit,
  Save,
  X,
  Star,
  TrendingUp,
  FileText,
  Briefcase
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext.jsx';
import axios from 'axios';

const VolunteerProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [editedProfile, setEditedProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      console.log("Volunteer Profile Fetching");
      const token = await localStorage.getItem('authToken');
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');

      if (!token) {
        console.log("no token found")
        setError('No authentication token found');
        setIsLoading(false);
        return;
      }
      console.log("-------------", token)
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then((res) => {
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Authentication required');
        return;
      }
      console.log("---", token)
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + '/api/auth/updateProfile',
        editedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("respone-edit", response)
      if (response.statusText == "OK") {
        const data = response;
        setProfile(editedProfile);
        // Update localStorage
        localStorage.setItem('userData', JSON.stringify(editedProfile));
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
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
            <p className="text-gray-500">Please wait while we fetch your profile data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your volunteer profile and track your impact.</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture and Basic Info */}
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {(profile.fullName || profile.name || 'U')?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{profile.fullName || profile.name || 'User'}</h2>
                      <Badge className="bg-green-100 text-green-800">{profile.role || 'Volunteer'}</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{profile.profession || 'Not specified'}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Recently'}
                      </span>
                      <Badge className="bg-purple-100 text-purple-800">Active Member</Badge>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{profile.email || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="contactNumber"
                        type="tel"
                        value={editedProfile.contactNumber || ''}
                        onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{profile.contactNumber || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        id="dob"
                        type="date"
                        value={editedProfile.dob || ''}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{profile.dob ? new Date(profile.dob).toLocaleDateString() : 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    {isEditing ? (
                      <select
                        id="gender"
                        value={editedProfile.gender || ''}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-md">
                        <span>{profile.gender || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession">Profession</Label>
                    {isEditing ? (
                      <Input
                        id="profession"
                        value={editedProfile.profession || ''}
                        onChange={(e) => handleInputChange('profession', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                        <span>{profile.profession || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactNumber">Emergency Contact</Label>
                    {isEditing ? (
                      <Input
                        id="emergencyContactNumber"
                        type="tel"
                        value={editedProfile.emergencyContactNumber || ''}
                        onChange={(e) => handleInputChange('emergencyContactNumber', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{profile.emergencyContactNumber || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      {isEditing ? (
                        <textarea
                          id="address"
                          value={editedProfile.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      ) : (
                        <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-md min-h-[60px]">
                          <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                          <span>{profile.address || 'Not provided'}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="area">Area</Label>
                      {isEditing ? (
                        <Input
                          id="area"
                          value={editedProfile.area || ''}
                          onChange={(e) => handleInputChange('area', e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">
                          <span>{profile.area || 'Not provided'}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      {isEditing ? (
                        <Input
                          id="state"
                          value={editedProfile.state || ''}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">
                          <span>{profile.state || 'Not provided'}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pinCode">Pin Code</Label>
                      {isEditing ? (
                        <Input
                          id="pinCode"
                          value={editedProfile.pinCode || ''}
                          onChange={(e) => handleInputChange('pinCode', e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">
                          <span>{profile.pinCode || 'Not provided'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  {isEditing ? (
                    <Input
                      id="skills"
                      value={Array.isArray(editedProfile.skills) ? editedProfile.skills.join(', ') : (editedProfile.skills || '')}
                      onChange={(e) => handleInputChange('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                      placeholder="e.g., Teaching, IT, Marketing (comma separated)"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(profile.skills) ? profile.skills : (profile.skills ? profile.skills.split(',').map(s => s.trim()) : [])).map((skill, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800">
                          {skill}
                        </Badge>
                      ))}
                      {(!profile.skills || (Array.isArray(profile.skills) && profile.skills.length === 0)) && (
                        <span className="text-gray-500 text-sm">No skills added</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Volunteer Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="areaOfVolunteering">Preferred Area</Label>
                    {isEditing ? (
                      <select
                        id="areaOfVolunteering"
                        value={editedProfile.areaOfVolunteering || ''}
                        onChange={(e) => handleInputChange('areaOfVolunteering', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select Area</option>
                        <option value="fieldWork">Field Work</option>
                        <option value="online">Online</option>
                        <option value="fundraising">Fundraising</option>
                        <option value="training">Training</option>
                      </select>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-md">
                        <span>{profile.areaOfVolunteering || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    {isEditing ? (
                      <select
                        id="availability"
                        value={editedProfile.availability || ''}
                        onChange={(e) => handleInputChange('availability', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select Availability</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                        <option value="weekend">Weekend</option>
                      </select>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-md">
                        <span>{profile.availability || 'Not specified'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Information */}
          <div className="space-y-6">
            {/* Account Details */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">User ID</span>
                    <span className="font-semibold text-sm">{profile._id?.slice(-8) || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Member ID</span>
                    <span className="font-semibold text-sm">{profile.memberId || 'Not assigned'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Role</span>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">{profile.role || 'Member'}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Account Status</span>
                    {profile.phoneVerified && profile.emailVerified ? (
                      <Badge className="bg-green-100 text-green-800 text-xs">verified</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">verification pending</Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="font-semibold text-sm">{profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'Recently'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {/* <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View My Tasks
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Browse Events
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => alert('Feature coming soon!')}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    View Certificates
                  </Button>
                </div>
              </CardContent>
            </Card> */}

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Certificates
                  </Button></div></CardContent></Card>


          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;
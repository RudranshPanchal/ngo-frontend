import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, Briefcase, Clock, Award, FileText, X } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader.jsx';
import api from '../config/api.js';

const VolunteerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [volunteer, setVolunteer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImagePopup, setShowImagePopup] = useState(false);

  // Fetch volunteer details from API
  // const fetchVolunteerDetails = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);

  //     // First get all volunteers to find the specific one
  //     const response = await api.get('api/auth/getAllVolunteers');
  //     const volunteers = response.data.volunteers || [];

  //     // Find the volunteer with matching ID
  //     const foundVolunteer = volunteers.find(v => v._id === id || v.id === id);

  //     if (foundVolunteer) {
  //       setVolunteer(foundVolunteer);
  //     } else {
  //       setError('Volunteer not found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching volunteer details:', error);
  //     setError('Failed to load volunteer details');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchVolunteerDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.get(`api/volunteer/${id}`);


      if (res.data?.volunteer) {
        console.log("ID PROOF URL FROM API:", res.data.volunteer.uploadIdProof);

        setVolunteer(res.data.volunteer);
      } else {
        setError("Volunteer not found");
      }


    } catch (err) {
      console.error("Error fetching volunteer:", err);
      setError("Failed to load volunteer details");
    } finally {
      setIsLoading(false);
    }
  };


  const handleBack = () => {
    navigate('/volunteer-management');
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust if the current date is before the birthday in the current year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const openImagePopup = () => {
    setShowImagePopup(true);
  };

  const closeImagePopup = () => {
    setShowImagePopup(false);
  };

  const skillsArray = volunteer?.skills
    ? Array.isArray(volunteer.skills)
      ? volunteer.skills
      : typeof volunteer.skills === "string"
        ? volunteer.skills.split(",").map(s => s.trim())
        : []
    : [];



  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVolunteerDetails();
  }, [id]);
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <DashboardHeader />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Volunteer Details...</h3>
              <p className="text-gray-500">Please wait while we fetch the volunteer information.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <DashboardHeader />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Volunteer</h3>
              <p className="text-gray-500 mb-6">{error}</p>
              <Button onClick={handleBack} className="cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Volunteers
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No volunteer found
  if (!volunteer) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <DashboardHeader />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Volunteer Not Found</h3>
              <p className="text-gray-500 mb-6">The requested volunteer could not be found.</p>
              <Button onClick={handleBack} className="cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Volunteers
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <DashboardHeader />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              onClick={handleBack}
              className="flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Volunteers
            </Button>
          </div>

          {/* Volunteer Header */}
          <Card className="bg-white shadow-sm border-0 mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Avatar */}

                {/* Basic Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{volunteer.fullName || volunteer.name || 'Unknown'}</h1>
                  <p className="text-lg text-gray-600 mb-4">{volunteer.profession || 'Not specified'}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{volunteer.email || 'No email'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{volunteer.contactNumber || volunteer.phone || 'No contact'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {volunteer.address && volunteer.state
                          ? `${volunteer.address}, ${volunteer.state}`
                          : volunteer.location || 'No location'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-col gap-2">
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium text-center">
                    {volunteer.areaOfVolunteering || 'Field Work'}
                  </span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium text-center">
                    {volunteer.availability || 'Not specified'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900 capitalize">{volunteer.gender || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-gray-900">{volunteer.dob ?  `${calculateAge(volunteer.dob)} years` : 'Not specified'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Volunteer ID</label>
                  <p className="text-gray-900 font-mono">{volunteer.volunteerId || 'Not assigned'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                  <p className="text-gray-900">{volunteer.emergencyContact || volunteer.emergencyContactNumber || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Joined Date</label>
                  <p className="text-gray-900">
                    {volunteer.createdAt
                      ? new Date(volunteer.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                      : volunteer.joinDate
                        ? new Date(volunteer.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                        : 'Unknown'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Profession</label>
                  <p className="text-gray-900">{volunteer.profession || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Skills</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsArray.length > 0 ? (
                      skillsArray.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No skills listed</span>
                    )}
                  </div>

                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Area of Volunteering</label>
                  <p className="text-gray-900 capitalize">{volunteer.areaOfVolunteering || volunteer.preferredArea || 'Field Work'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Availability</label>
                  <p className="text-gray-900 capitalize">{volunteer.availability || 'Not specified'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-gray-900">{volunteer.email || 'No email'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-gray-900">{volunteer.contactNumber || volunteer.phone || 'No contact'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900">
                    {volunteer.address && volunteer.state
                      ? `${volunteer.address}, ${volunteer.state}`
                      : volunteer.location || 'No address'
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                  <p className="text-gray-900">{volunteer.emergencyContact || volunteer.emergencyContactNumber || 'Not provided'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="text-sm font-medium text-gray-500">ID Proof</label>
                  {volunteer.uploadIdProof ? (
                    <div className="mt-2">
                      <div
                        className="cursor-pointer"
                        onClick={openImagePopup}
                      >
                        <img
                          src={volunteer.uploadIdProof}
                          alt="ID Proof"
                          className="w-full max-w-xs h-32 object-cover rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                        />
                      </div>
                      <p
                        className="text-sm text-gray-500 mt-2 cursor-pointer hover:text-blue-600"
                        onClick={openImagePopup}
                      >
                        Click to view full size
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No ID proof uploaded</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Simple Image Popup */}
      {showImagePopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeImagePopup}
        >
          <div
            className="relative bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImagePopup}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 cursor-pointer"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            {/* Image */}
            <img
              src={volunteer.uploadIdProof}
              alt="ID Proof - Full Size"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDetailPage;

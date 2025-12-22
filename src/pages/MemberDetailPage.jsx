import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { ArrowLeft, Mail, Phone, MapPin, User } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader.jsx";

const MemberDetailPage = () => {
  const navigate = useNavigate();
  const { member } = useLocation().state || { member: {} };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => navigate('/member-management');

  const fullName = member?.fullName || member?.name || 'Unknown Member';
  const initials = (fullName || 'M').split(' ').map(n => n[0]).join('');

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardHeader />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button onClick={handleBack} className="flex items-center gap-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
              Back to Members
            </Button>
          </div>

          {/* Member Header - matches volunteer style */}
          <Card className="bg-white shadow-sm border-0 mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">

                {/* Basic Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{fullName}</h1>
                  <p className="text-lg text-gray-600 mb-4 capitalize">{member?.role || 'member'}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{member?.email || 'No email'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{member?.contactNumber || 'No contact'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{member?.address || member?.area ? `${member?.address || ''}${member?.address && member?.area ? ', ' : ''}${member?.area || ''}` : 'No address'}</span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-col gap-2">
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium text-center">
                    {member?.role || 'member'}
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
                  <User className="h-5 w-5 text-purple-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900 capitalize">{member?.gender || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-gray-900">{member?.age ? `${member.age} years` : 'Not specified'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Member ID</label>
                  <p className="text-gray-900 font-mono">{member?.memberId || 'Not assigned'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Joined Date</label>
                  <p className="text-gray-900">{member?.createdAt ? new Date(member.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-gray-900">{member?.email || 'No email'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-gray-900">{member?.contactNumber || 'No contact'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900">{member?.address || member?.area ? `${member?.address || ''}${member?.address && member?.area ? ', ' : ''}${member?.area || ''}` : 'No address'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailPage;

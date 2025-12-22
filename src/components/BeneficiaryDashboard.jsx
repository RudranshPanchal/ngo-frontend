import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { 
  Users, 
  Award, 
  Calendar, 
  BookOpen, 
  Heart, 
  TrendingUp,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';

const BeneficiaryDashboard = () => {
  const [beneficiaryData, setBeneficiaryData] = useState({
    programs: [],
    certificates: [],
    events: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load beneficiary data from localStorage
    const programs = JSON.parse(localStorage.getItem('beneficiaryPrograms') || '[]');
    const certificates = JSON.parse(localStorage.getItem('beneficiaryCertificates') || '[]');
    const events = JSON.parse(localStorage.getItem('availableEvents') || '[]');

    // If no data exists, create demo data
    if (programs.length === 0 && certificates.length === 0 && events.length === 0) {
      const demoPrograms = [
        {
          id: '1',
          title: 'Women Empowerment Program',
          status: 'Active',
          progress: 75,
          startDate: '2024-01-15',
          endDate: '2024-06-15'
        },
        {
          id: '2',
          title: 'Digital Literacy Course',
          status: 'Completed',
          progress: 100,
          startDate: '2023-10-01',
          endDate: '2023-12-31'
        }
      ];

      const demoCertificates = [
        {
          id: '1',
          title: 'Digital Literacy Certificate',
          issuedDate: '2023-12-31',
          status: 'Issued'
        }
      ];

      const demoEvents = [
        {
          id: '1',
          title: 'Career Guidance Workshop',
          date: '2024-02-15',
          time: '10:00 AM',
          location: 'Community Center'
        }
      ];

      setBeneficiaryData({
        programs: demoPrograms,
        certificates: demoCertificates,
        events: demoEvents
      });
    } else {
      setBeneficiaryData({ programs, certificates, events });
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Dashboard...</h3>
          </div>
        </div>
      </div>
    );
  }

  const activePrograms = beneficiaryData.programs.filter(p => p.status === 'Active').length;
  const completedPrograms = beneficiaryData.programs.filter(p => p.status === 'Completed').length;
  const totalCertificates = beneficiaryData.certificates.length;
  const upcomingEvents = beneficiaryData.events.length;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard!</h1>
          <p className="text-gray-600">Track your programs, certificates, and upcoming events.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-blue-100">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{activePrograms}</p>
                  <p className="text-sm text-gray-600">Active Programs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{completedPrograms}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-yellow-100">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{totalCertificates}</p>
                  <p className="text-sm text-gray-600">Certificates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-purple-100">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{upcomingEvents}</p>
                  <p className="text-sm text-gray-600">Upcoming Events</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Programs */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Active Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {beneficiaryData.programs.filter(p => p.status === 'Active').map((program) => (
                  <div key={program.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{program.title}</h3>
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        {program.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{program.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${program.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Ends: {new Date(program.endDate).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {Math.ceil((new Date(program.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {beneficiaryData.programs.filter(p => p.status === 'Active').length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No active programs</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Certificates */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Recent Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {beneficiaryData.certificates.map((certificate) => (
                  <div key={certificate.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{certificate.title}</h3>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {certificate.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Issued: {new Date(certificate.issuedDate).toLocaleDateString()}</span>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
                {beneficiaryData.certificates.length === 0 && (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No certificates yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDashboard;

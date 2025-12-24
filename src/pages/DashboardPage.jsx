import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Users, Heart, Award, TrendingUp, Calendar, FileText, UserPlus, Image, Plus, ArrowUpRight, Activity, Clock, CheckCircle, Download } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';
import SimpleChart from '../components/SimpleChart.jsx';
import VolunteerDashboard from '../components/VolunteerDashboard.jsx';
import MyTasks from '../components/MyTasks.jsx';
import VolunteerProfile from '../components/VolunteerProfile.jsx';
import VolunteerEvents from '../components/VolunteerEvents.jsx';
import DonorDashboard from '../components/DonorDashboard.jsx';
import DonationHistory from '../components/DonationHistory.jsx';
import DonorProfile from '../components/DonorProfile.jsx';
import DonorImpact from '../components/DonorImpact.jsx';
import BeneficiaryDashboard from '../components/BeneficiaryDashboard.jsx';
import BeneficiaryProfile from '../components/BeneficiaryProfile.jsx';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.jsx';
import api from '../config/api.js';
import { reportGenerator } from '../utils/reportGenerator.js';
import DonorRegistrationPage from './DonorRegistrationPage.jsx';

const DashboardPage = () => { 
  const navigate = useNavigate();
  const { sidebarOpen, currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [beneficiaryData, setBeneficiaryData] = useState({
    programs: [],
    certificates: [],
    events: []
  });
  const [dataLoading, setDataLoading] = useState(true);



  const loadRealTimeData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/auth/getAdminDashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setDashboard(data.data);
        }
      }
      
      // Fetch recent activities
      const activityResponse = await fetch(import.meta.env.VITE_BACKEND_URL +'/api/auth/getRecentActivity', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        if (activityData.success) {
          setRecentActivities(activityData.data || []);
        }
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Fallback to empty data
      setDashboard({
        totalMembers: 0,
        totalVolunteers: 0,
        totalCertificates: 0,
        donationAmount: 0,
        pendingApplications: 0,
        approvedApplications: 0
      });
      setRecentActivities([]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    loadRealTimeData();
    setIsLoading(false);
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadRealTimeData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadRealTimeData, 30000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Fetch beneficiary data when user is beneficiary
  useEffect(() => {
          if(currentUser?.role ==='admin'){
        setDataLoading(false)
      }
    if (currentUser?.role === 'beneficiary') {
      const fetchBeneficiaryData = async () => {
        try {
          setDataLoading(true);
          const programs = JSON.parse(localStorage.getItem('beneficiaryPrograms') || '[]');
          const certificates = JSON.parse(localStorage.getItem('beneficiaryCertificates') || '[]');
          const events = JSON.parse(localStorage.getItem('availableEvents') || '[]');
          
          setBeneficiaryData({ programs, certificates, events });
        } catch (error) {
          console.error('Error fetching beneficiary data:', error);
        } finally {
          setDataLoading(false);
        }
      };

      
      fetchBeneficiaryData();
    }
  }, [currentUser?.role, activeTab]);



  const stats = [
    {
      title: 'Total Members',
      value: String(dashboard?.totalMembers ?? 0),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Total Volunteers',
      value: String(dashboard?.totalVolunteers ?? 0),
      icon: UserPlus,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Certificates Issued',
      value: String(dashboard?.totalCertificates ?? 0),
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      trend: '+25%',
      trendUp: true
    },
    {
      title: 'Donations',
      value: `₹${(dashboard?.donationAmount ?? 0).toLocaleString('en-IN')}`,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      trend: '+15%',
      trendUp: true
    }
  ];
  

  // Full-page loading state
  if (isLoading) {
    return (
      <div className="bg-gray-50">
        <DashboardHeader />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Dashboard...</h3>
              <p className="text-gray-500">Please wait while we fetch the latest data.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render content based on active tab and user role
  const renderContent = () => {
    // Volunteer-specific content
    if (currentUser?.role === 'volunteer') {
      switch (activeTab) {
        case 'my-tasks':
          return <MyTasks />;
        case 'volunteer-profile':
          return <VolunteerProfile />;
        case 'volunteer-events':
          return <VolunteerEvents />;
        case 'dashboard':
        default:
          return <VolunteerDashboard />;
      }
    }
    
    // Donor-specific content
    if (currentUser?.role === 'donor') {
      switch (activeTab) {
        case 'donation-history':
          return <DonationHistory />;
        case 'donor-profile':
          return <DonorProfile />;
        case 'donor-registration':
          return <DonorRegistrationPage />
        case 'donor-impact':
          return <DonorImpact />;
        case 'dashboard':
        default:
          return <DonorDashboard />;
      }
    }
    
    // Beneficiary-specific content
    if (currentUser?.role === 'beneficiary') {
      switch (activeTab) {
        case 'beneficiary-profile':
          return <BeneficiaryProfile />;
        case 'dashboard':
        default:
          return <BeneficiaryDashboard />;
      }
    }

    // Admin dashboard (existing content)
    if (currentUser?.role === 'admin') {
      if (dataLoading) {
        return (
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Loading...</h3>
                <p className="text-gray-500">Please wait while we fetch your data.</p>
              </div>
            </div>
          </div>
        );
      }

      switch (activeTab) {
        case 'my-programs':
          return (
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">My Programs</h1>
                  <p className="text-gray-600">View your enrolled programs and services.</p>
                </div>
                {beneficiaryData.programs.length === 0 ? (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-12 text-center">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Programs Found</h3>
                      <p className="text-gray-500">You are not enrolled in any programs yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {beneficiaryData.programs.map((program) => (
                      <Card key={program.id} className="border-0 shadow-sm">
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-gray-900 mb-2">{program.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                          <div className="flex justify-between items-center">
                            <span className={`text-xs px-2 py-1 rounded ${
                              program.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {program.status}
                            </span>
                            <span className="text-xs text-gray-500">Progress: {program.progress}%</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        case 'my-certificates':
          return (
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certificates</h1>
                  <p className="text-gray-600">View and download your earned certificates.</p>
                </div>
                {beneficiaryData.certificates.length === 0 ? (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-12 text-center">
                      <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates Found</h3>
                      <p className="text-gray-500">You haven't earned any certificates yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {beneficiaryData.certificates.map((certificate) => (
                      <Card key={certificate.id} className="border-0 shadow-sm">
                        <CardContent className="p-6 text-center">
                          <div className="p-3 rounded-full bg-yellow-100 w-fit mx-auto mb-4">
                            <Award className="h-6 w-6 text-yellow-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">{certificate.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">Completed: {new Date(certificate.completedDate).toLocaleDateString()}</p>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        case 'available-events':
          return (
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Events</h1>
                  <p className="text-gray-600">Discover and register for upcoming events and workshops.</p>
                </div>
                {beneficiaryData.events.length === 0 ? (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-12 text-center">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
                      <p className="text-gray-500">There are no upcoming events at the moment.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {beneficiaryData.events.map((event) => (
                      <Card key={event.id} className="border-0 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                              <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                                <span>{event.time}</span>
                              </div>
                            </div>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              Register
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        case 'dashboard':
        default:
          return (
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Admin!</h1>
                  <p className="text-gray-600">Access your programs and support services.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('my-programs')}>
                    <CardContent className="p-6 text-center">
                      <div className="p-3 rounded-full bg-blue-100 w-fit mx-auto mb-4">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">My Programs</h3>
                      <p className="text-sm text-gray-600">View enrolled programs and services</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('my-certificates')}>
                    <CardContent className="p-6 text-center">
                      <div className="p-3 rounded-full bg-green-100 w-fit mx-auto mb-4">
                        <Award className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">My Certificates</h3>
                      <p className="text-sm text-gray-600">View earned certificates</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('available-events')}>
                    <CardContent className="p-6 text-center">
                      <div className="p-3 rounded-full bg-purple-100 w-fit mx-auto mb-4">
                        <Calendar className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Upcoming Events</h3>
                      <p className="text-sm text-gray-600">View available events and workshops</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          );
      }
    }
    
    // Admin dashboard (existing content)
    return (
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Message */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
            <p className="text-sm sm:text-base text-gray-600">Here's what's happening with your organization today.</p>
          </div>

        {/* Stats Grid (API-driven) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs sm:text-sm ${
                      stat.trendUp ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <ArrowUpRight className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        stat.trendUp ? '' : 'rotate-180'
                      }`} />
                      {stat.trend}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Application Status */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Review</span>
                  <span className="text-sm font-medium text-orange-600">{dashboard?.pendingApplications || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approved</span>
                  <span className="text-sm font-medium text-green-600">{dashboard?.approvedApplications || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Members</span>
                  <span className="text-sm font-medium text-blue-600">{dashboard?.totalMembers || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Stats */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Live Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Donations</span>
                  <span className="text-sm font-medium text-green-600">₹{(dashboard?.donationAmount || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Certificates</span>
                  <span className="text-sm font-medium text-yellow-600">{dashboard?.totalCertificates || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Volunteers</span>
                  <span className="text-sm font-medium text-purple-600">{dashboard?.totalVolunteers || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Status</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm font-medium text-gray-600">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Monthly Registration Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleChart 
                title="Last 6 Months"
                color="purple"
                data={[
                  { label: 'Jan', value: 45 },
                  { label: 'Feb', value: 52 },
                  { label: 'Mar', value: 38 },
                  { label: 'Apr', value: 67 },
                  { label: 'May', value: 73 },
                  { label: 'Jun', value: 89 }
                ]}
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Donation Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleChart 
                title="By Category"
                color="green"
                data={[
                  { label: 'Education', value: 45000 },
                  { label: 'Healthcare', value: 32000 },
                  { label: 'Food', value: 28000 },
                  { label: 'Shelter', value: 15000 },
                  { label: 'Others', value: 8000 }
                ]}
              />
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Activities */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Recent Activities
              </CardTitle>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                View All
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {recentActivities.length > 0 ? recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.user}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No recent activities</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Plus className="h-5 w-5 text-gray-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigate('/member-management')} 
                  className="group p-3 text-left rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <Users className="h-6 w-6 text-purple-600 mb-2" />
                  <p className="font-medium text-gray-900 text-sm mb-1">Members</p>
                  <p className="text-xs text-gray-600">Manage members</p>
                </button>
                
                <button 
                  onClick={() => navigate('/volunteer-management')} 
                  className="group p-3 text-left rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <UserPlus className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="font-medium text-gray-900 text-sm mb-1">Volunteers</p>
                  <p className="text-xs text-gray-600">Manage volunteers</p>
                </button>
                
                <button 
                  onClick={() => navigate('/gallery-management')}
                  className="group p-3 text-left rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <Image className="h-6 w-6 text-green-600 mb-2" />
                  <p className="font-medium text-gray-900 text-sm mb-1">Gallery</p>
                  <p className="text-xs text-gray-600">Upload images</p>
                </button>
                
                <button 
                  onClick={() => navigate('/certificate-management')}
                  className="group p-3 text-left rounded-lg border border-gray-200 hover:bg-orange-50 hover:border-orange-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <Award className="h-6 w-6 text-orange-600 mb-2" />
                  <p className="font-medium text-gray-900 text-sm mb-1">Certificates</p>
                  <p className="text-xs text-gray-600">Issue certificates</p>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Reports Section */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                Generate Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  onClick={() => {
                    const reportData = reportGenerator.generateMonthlyReport([], [], []);
                    reportGenerator.exportToExcel(reportData, 'monthly-report');
                  }}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Monthly Report
                </Button>
                <Button 
                  onClick={() => reportGenerator.generateCSV([{name: 'Sample', email: 'test@test.com'}], 'sample-data')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Donors */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Recent Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {(() => {
                  const allDonors = JSON.parse(localStorage.getItem('allDonors') || '[]');
                  const recentDonors = allDonors.slice(0, 5);
                  
                  if (recentDonors.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">No donors registered yet</p>
                      </div>
                    );
                  }
                  
                  return recentDonors.map((donor) => (
                    <div key={donor.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                        <Heart className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{donor.name}</p>
                        <p className="text-sm text-gray-600 truncate">{donor.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Donated ₹{donor.donationAmount?.toLocaleString() || '0'} • {donor.donationFrequency}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(donor.registrationDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Dashboard Header */}
        <DashboardHeader />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="min-h-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
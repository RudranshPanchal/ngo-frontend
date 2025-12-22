import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  Users, 
  Award, 
  TrendingUp,
  FileText,
  MapPin,
  Star,
  Target,
  Activity
} from 'lucide-react';



const VolunteerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    // Simulate API call with demo data
    setTimeout(() => {
      setTasks([
        {
          id: 1,
          title: 'Conduct Skills Training Session',
          description: 'Lead a 2-hour training session on digital literacy for women',
          status: 'pending',
          priority: 'high',
          dueDate: '2024-01-20',
          location: 'Community Center, Mumbai',
          estimatedHours: 3
        },
        {
          id: 2,
          title: 'Distribute Educational Materials',
          description: 'Help distribute learning materials to beneficiaries',
          status: 'in-progress',
          priority: 'medium',
          dueDate: '2024-01-18',
          location: 'Field Office, Pune',
          estimatedHours: 2
        },
        {
          id: 3,
          title: 'Mentor New Volunteers',
          description: 'Guide and support newly joined volunteers',
          status: 'completed',
          priority: 'medium',
          dueDate: '2024-01-15',
          location: 'Online',
          estimatedHours: 1.5
        }
      ]);

      setEvents([
        {
          id: 1,
          title: 'Women Empowerment Workshop',
          date: '2024-01-25',
          time: '10:00 AM',
          location: 'Delhi Community Hall',
          participants: 45,
          status: 'upcoming'
        },
        {
          id: 2,
          title: 'Skill Development Fair',
          date: '2024-02-02',
          time: '9:00 AM',
          location: 'Mumbai Exhibition Center',
          participants: 120,
          status: 'registered'
        }
      ]);

      setStats({
        totalTasks: 12,
        completedTasks: 8,
        hoursContributed: 45,
        eventsAttended: 6,
        impactScore: 92,
        certificatesEarned: 3
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Dashboard...</h3>
            <p className="text-gray-500">Please wait while we fetch your volunteer data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Volunteer!</h1>
          <p className="text-gray-600">Here's your impact summary and upcoming tasks.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}/{stats.totalTasks}</p>
                  <p className="text-sm text-gray-600">Tasks Completed</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(stats.completedTasks / stats.totalTasks) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-green-100">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stats.hoursContributed}</p>
                  <p className="text-sm text-gray-600">Hours Contributed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-purple-100">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stats.impactScore}</p>
                  <p className="text-sm text-gray-600">Impact Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* My Tasks */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                My Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <div className="flex gap-2">
                        <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                          {task.status}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {task.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.estimatedHours}h
                        </span>
                      </div>
                      {/* {task.status === 'pending' && (
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                          Start Task
                        </Button>
                      )} */}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                {/* <Button variant="outline" className="w-full">
                  View All Tasks
                </Button> */}
                <Button
  variant="outline"
  className="w-full"
  onClick={() => navigate("/MyTasks")}   // ✅ onClick added
>
  View All Task
</Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        {event.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {event.participants} participants expected
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      {/* <Button size="sm" variant="outline">
                        View Details
                      </Button> */}
                      {event.status === 'upcoming' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Register
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                {/* <Button variant="outline" className="w-full">
                  View All Events
                </Button> */}
<Button
  variant="outline"
  className="w-full"
  onClick={() => navigate("/VolunteerEvents")}   // ✅ onClick added
>
  View All Events
</Button>



              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 rounded-full bg-orange-100 w-fit mx-auto mb-4">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stats.eventsAttended}</p>
              <p className="text-sm text-gray-600">Events Attended</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 rounded-full bg-yellow-100 w-fit mx-auto mb-4">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stats.certificatesEarned}</p>
              <p className="text-sm text-gray-600">Certificates Earned</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 rounded-full bg-green-100 w-fit mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">Top 10%</p>
              <p className="text-sm text-gray-600">Volunteer Ranking</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Input } from './ui/input.jsx';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  MoreVertical
} from 'lucide-react';
import Modal from './ui/modal.jsx';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockTasks = [
        {
          id: 1,
          title: 'Conduct Skills Training Session',
          description: 'Lead a 2-hour training session on digital literacy for women in the community center',
          status: 'pending',
          priority: 'high',
          dueDate: '2024-01-20',
          location: 'Community Center, Mumbai',
          estimatedHours: 3,
          assignedBy: 'Admin User',
          category: 'Training'
        },
        {
          id: 2,
          title: 'Distribute Educational Materials',
          description: 'Help distribute learning materials and books to beneficiaries in rural areas',
          status: 'in-progress',
          priority: 'medium',
          dueDate: '2024-01-18',
          location: 'Field Office, Pune',
          estimatedHours: 2,
          assignedBy: 'Field Coordinator',
          category: 'Distribution'
        },
        {
          id: 3,
          title: 'Mentor New Volunteers',
          description: 'Guide and support newly joined volunteers through orientation process',
          status: 'completed',
          priority: 'medium',
          dueDate: '2024-01-15',
          location: 'Online',
          estimatedHours: 1.5,
          assignedBy: 'HR Manager',
          category: 'Mentoring'
        },
        {
          id: 4,
          title: 'Data Collection Survey',
          description: 'Conduct surveys to collect impact data from program beneficiaries',
          status: 'pending',
          priority: 'low',
          dueDate: '2024-01-25',
          location: 'Various Locations',
          estimatedHours: 4,
          assignedBy: 'Research Team',
          category: 'Research'
        },
        {
          id: 5,
          title: 'Workshop Preparation',
          description: 'Prepare materials and setup for upcoming women empowerment workshop',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2024-01-22',
          location: 'Delhi Community Hall',
          estimatedHours: 2.5,
          assignedBy: 'Event Manager',
          category: 'Event'
        }
      ];
      setTasks(mockTasks);
      setFilteredTasks(mockTasks);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        (task.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.category || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter]);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Play className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Tasks...</h3>
            <p className="text-gray-500">Please wait while we fetch your tasks.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">Manage and track your assigned volunteer tasks.</p>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              <p className="text-sm text-gray-600">Total Tasks</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'pending').length}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'in-progress').length}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Tasks Found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'No tasks match your current filters.' 
                    : 'You have no assigned tasks at the moment.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority} priority
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800 text-xs">
                            {task.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{task.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{task.estimatedHours}h estimated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Assigned by: {task.assignedBy}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {task.status === 'pending' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleStatusChange(task.id, 'in-progress')}
                      >
                        Start Task
                      </Button>
                    )}
                    {task.status === 'in-progress' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleStatusChange(task.id, 'completed')}
                        >
                          Mark Complete
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusChange(task.id, 'pending')}
                        >
                          Pause
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedTask(task)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Task Details Modal */}
        <Modal 
          isOpen={!!selectedTask} 
          onClose={() => setSelectedTask(null)}
          title="Task Details"
        >
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{selectedTask.title}</h4>
                <p className="text-gray-600 text-sm">{selectedTask.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Due Date:</span>
                  <p className="text-gray-600">{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <p className="text-gray-600">{selectedTask.location}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Estimated Hours:</span>
                  <p className="text-gray-600">{selectedTask.estimatedHours}h</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Assigned By:</span>
                  <p className="text-gray-600">{selectedTask.assignedBy}</p>
                </div>
              </div>
              
              <Button 
                onClick={() => setSelectedTask(null)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Close
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MyTasks;
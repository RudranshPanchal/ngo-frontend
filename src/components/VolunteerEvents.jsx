import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Input } from './ui/input.jsx';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Search, 
  Filter,
  CheckCircle,
  AlertCircle,
  Star,
  ExternalLink
} from 'lucide-react';
import Modal from './ui/modal.jsx';

const VolunteerEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockEvents = [
        {
          id: 1,
          title: 'Women Empowerment Workshop',
          description: 'A comprehensive workshop focusing on skill development and entrepreneurship for women in rural areas.',
          date: '2024-01-25',
          time: '10:00 AM - 4:00 PM',
          location: 'Delhi Community Hall, Sector 15',
          participants: 45,
          maxParticipants: 60,
          status: 'upcoming',
          category: 'Workshop',
          organizer: 'NGO Team Delhi',
          requirements: ['Teaching experience', 'Communication skills'],
          registrationDeadline: '2024-01-22',
          isRegistered: false,
          priority: 'high'
        },
        {
          id: 2,
          title: 'Skill Development Fair',
          description: 'Annual fair showcasing various skill development programs and connecting beneficiaries with opportunities.',
          date: '2024-02-02',
          time: '9:00 AM - 6:00 PM',
          location: 'Mumbai Exhibition Center, Bandra',
          participants: 120,
          maxParticipants: 150,
          status: 'registered',
          category: 'Fair',
          organizer: 'Mumbai Chapter',
          requirements: ['Event management', 'Crowd handling'],
          registrationDeadline: '2024-01-30',
          isRegistered: true,
          priority: 'medium'
        },
        {
          id: 3,
          title: 'Digital Literacy Training',
          description: 'Training session to teach basic computer skills and digital literacy to women beneficiaries.',
          date: '2024-01-30',
          time: '2:00 PM - 5:00 PM',
          location: 'Pune Learning Center',
          participants: 25,
          maxParticipants: 30,
          status: 'upcoming',
          category: 'Training',
          organizer: 'Education Team',
          requirements: ['Computer knowledge', 'Patience'],
          registrationDeadline: '2024-01-28',
          isRegistered: true,
          priority: 'high'
        },
        {
          id: 4,
          title: 'Community Health Camp',
          description: 'Free health checkup and awareness camp for women and children in underserved communities.',
          date: '2024-01-20',
          time: '8:00 AM - 2:00 PM',
          location: 'Rural Health Center, Nashik',
          participants: 80,
          maxParticipants: 100,
          status: 'completed',
          category: 'Health',
          organizer: 'Health Team',
          requirements: ['Healthcare background preferred'],
          registrationDeadline: '2024-01-18',
          isRegistered: true,
          priority: 'medium'
        },
        {
          id: 5,
          title: 'Fundraising Gala',
          description: 'Annual fundraising event to support our women empowerment programs.',
          date: '2024-02-14',
          time: '7:00 PM - 11:00 PM',
          location: 'Grand Ballroom, Hotel Taj',
          participants: 200,
          maxParticipants: 250,
          status: 'upcoming',
          category: 'Fundraising',
          organizer: 'Fundraising Committee',
          requirements: ['Formal attire', 'Event coordination'],
          registrationDeadline: '2024-02-10',
          isRegistered: false,
          priority: 'low'
        }
      ];
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        (event.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.category || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      if (statusFilter === 'registered') {
        filtered = filtered.filter(event => event.isRegistered);
      } else {
        filtered = filtered.filter(event => event.status === statusFilter);
      }
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, statusFilter]);

  const getStatusColor = (status, isRegistered) => {
    if (isRegistered && status !== 'completed') {
      return 'bg-blue-100 text-blue-800';
    }
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch ((category || '').toLowerCase()) {
      case 'workshop': return 'bg-purple-100 text-purple-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-green-100 text-green-800';
      case 'health': return 'bg-red-100 text-red-800';
      case 'fundraising': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRegister = (eventId) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, isRegistered: true, participants: event.participants + 1 } : event
    ));
    setShowRegisterModal('Successfully registered for the event!');
  };

  const handleUnregister = (eventId) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, isRegistered: false, participants: event.participants - 1 } : event
    ));
    setShowRegisterModal('Successfully unregistered from the event.');
  };

  const isRegistrationOpen = (event) => {
    const deadline = new Date(event.registrationDeadline);
    const today = new Date();
    return today <= deadline && event.participants < event.maxParticipants && event.status === 'upcoming';
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Events...</h3>
            <p className="text-gray-500">Please wait while we fetch upcoming events.</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
          <p className="text-gray-600">Discover and register for upcoming volunteer events and activities.</p>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search events..."
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
                  <option value="all">All Events</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="registered">My Registrations</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              <p className="text-sm text-gray-600">Total Events</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{events.filter(e => e.status === 'upcoming').length}</p>
              <p className="text-sm text-gray-600">Upcoming</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{events.filter(e => e.isRegistered).length}</p>
              <p className="text-sm text-gray-600">Registered</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{events.filter(e => e.status === 'completed' && e.isRegistered).length}</p>
              <p className="text-sm text-gray-600">Attended</p>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'No events match your current filters.' 
                    : 'There are no events available at the moment.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card key={event.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-3">{event.description}</p>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Badge className={`text-xs ${getStatusColor(event.status, event.isRegistered)}`}>
                            {event.isRegistered && event.status !== 'completed' ? 'Registered' : event.status}
                          </Badge>
                          <Badge className={`text-xs ${getCategoryColor(event.category)}`}>
                            {event.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{event.participants}/{event.maxParticipants} participants</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Organizer:</strong> {event.organizer}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Registration Deadline:</strong> {new Date(event.registrationDeadline).toLocaleDateString()}
                        </p>
                        {event.requirements.length > 0 && (
                          <div className="mb-2">
                            <p className="text-sm text-gray-600 mb-1"><strong>Requirements:</strong></p>
                            <div className="flex flex-wrap gap-1">
                              {event.requirements.map((req, index) => (
                                <Badge key={index} className="bg-gray-100 text-gray-700 text-xs">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Registration Progress</span>
                          <span>{Math.round((event.participants / event.maxParticipants) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:w-48">
                      {event.status === 'completed' ? (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4" />
                          <span>Event Completed</span>
                        </div>
                      ) : event.isRegistered ? (
                        <>
                          <div className="flex items-center gap-2 text-blue-600 text-sm mb-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>You're registered!</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUnregister(event.id)}
                          >
                            Unregister
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </>
                      ) : isRegistrationOpen(event) ? (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleRegister(event.id)}
                          >
                            Register Now
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedEvent(event)}
                          >
                            View Details
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-red-600 text-sm mb-2">
                            <AlertCircle className="h-4 w-4" />
                            <span>Registration Closed</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedEvent(event)}
                          >
                            View Details
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Registration Success Modal */}
        <Modal 
          isOpen={!!showRegisterModal} 
          onClose={() => setShowRegisterModal('')}
          title="Registration Status"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-gray-700 mb-6">{showRegisterModal}</p>
            <Button 
              onClick={() => setShowRegisterModal('')}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              OK
            </Button>
          </div>
        </Modal>

        {/* Event Details Modal */}
        <Modal 
          isOpen={!!selectedEvent} 
          onClose={() => setSelectedEvent(null)}
          title="Event Details"
        >
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{selectedEvent.title}</h4>
                <p className="text-gray-600 text-sm">{selectedEvent.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <p className="text-gray-600">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Time:</span>
                  <p className="text-gray-600">{selectedEvent.time}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <p className="text-gray-600">{selectedEvent.location}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Organizer:</span>
                  <p className="text-gray-600">{selectedEvent.organizer}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="font-medium text-gray-700">Participants:</span>
                <p className="text-gray-600">{selectedEvent.participants}/{selectedEvent.maxParticipants}</p>
              </div>
              
              <Button 
                onClick={() => setSelectedEvent(null)}
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

export default VolunteerEvents;
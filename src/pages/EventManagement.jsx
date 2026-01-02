import React, { useState, useEffect, useMemo } from 'react';
import EventHeader from '../components/EventManagement/EventHeader';
import EventStatsBar from '../components/EventManagement/EventStatsBar';
import EventFilters from '../components/EventManagement/EventFilters';
import EventTable from '../components/EventManagement/EventTable';
import EventSkeleton from '../components/EventManagement/EventSkeleton';
import EventEmptyState from '../components/EventManagement/EventEmptyState';
import api from '../config/api';
import DashboardLayout from '../layouts/DashboardLayout';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  // const [stats, setStats] = useState({
  //   total: 0,
  //   upcoming: 0,
  //   completed: 0,
  //   cancelled: 0
  // });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('api/event/admin/list');

      const result = response.data;

      if (result.success && Array.isArray(result.data)) {
        setEvents(result.data);
        // setStats(calculateStats(result.data) || { total: 0, upcoming: 0, completed: 0 });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to load events'
      );

      setEvents([]);
      // setStats({ total: 0, upcoming: 0, completed: 0 });

    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (events) => {
    const total = events.length;
    const upcoming = events.filter(event => event.status === 'upcoming').length;
    const completed = events.filter(event => event.status === 'completed').length;
    const cancelled = events.filter(event => event.status === 'cancelled').length;
    return { total, upcoming, completed, cancelled };
  }

  const handleCreateClick = () => {
    console.log('Create event clicked');
    // Implement navigation to create event page
  };

  const getFilteredEvents = () => {
    if (!Array.isArray(events)) return [];

    let filtered = events;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(event =>
        event.title && event.title.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    return filtered;
  };

  const filteredEvents = getFilteredEvents();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <EventHeader onCreateClick={handleCreateClick} />

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 font-medium mb-2">
              Error loading events
            </div>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchEvents}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = useMemo(() => {
    return calculateStats(filteredEvents);
  }, [filteredEvents]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <EventHeader onCreateClick={handleCreateClick} />

          <EventStatsBar stats={stats} isLoading={isLoading} />

          {!isLoading && events.length > 0 && (
            <EventFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
          )}

          {isLoading ? (
            <EventSkeleton />
          ) : events.length === 0 ? (
            <EventEmptyState onCreateClick={handleCreateClick} />
          ) : filteredEvents.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-600">No events match your filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <EventTable events={filteredEvents} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventManagement;
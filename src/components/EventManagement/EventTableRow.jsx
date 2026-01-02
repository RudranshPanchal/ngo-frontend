import React from 'react';
import { MapPin, Users, CalendarDays, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import EventActions from './EventActions';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    upcoming: { 
      classes: "bg-blue-50 text-blue-700 border border-blue-200", 
      label: "Upcoming",
      icon: CalendarDays
    },
    completed: { 
      classes: "bg-green-50 text-green-700 border border-green-200", 
      label: "Completed",
      icon: CheckCircle2
    },
    cancelled: { 
      classes: "bg-red-50 text-red-700 border border-red-200", 
      label: "Cancelled",
      icon: XCircle
    }
  };

  const config = statusConfig[status] || statusConfig.upcoming;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg ${config.classes}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

const CategoryBadge = ({ category }) => {
  if (!category) return null;

  const categoryColors = {
    Workshop: 'bg-purple-50 text-purple-700 border-purple-200',
    Training: 'bg-orange-50 text-orange-700 border-orange-200',
    Health: 'bg-teal-50 text-teal-700 border-teal-200',
    Fundraising: 'bg-pink-50 text-pink-700 border-pink-200',
    Fair: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    Seminar: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Other: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const colorClass = categoryColors[category] || 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-md border ${colorClass} mt-1.5`}>
      {category}
    </span>
  );
};

const EventTableRow = ({ event }) => {
  if (!event) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    return time;
  };

  const location = event.location || {};
  const locationText = [location.venue, location.area, location.city]
    .filter(Boolean)
    .join(', ') || 'N/A';

  const currentParticipants = event.currentParticipants || 0;
  const maxParticipants = event.maxParticipants || 0;
  const participantsText = maxParticipants > 0 
    ? `${currentParticipants} / ${maxParticipants}`
    : currentParticipants.toString();

  const participantPercentage = maxParticipants > 0 
    ? (currentParticipants / maxParticipants) * 100 
    : 0;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-150 group">
      <td className="px-6 py-4">
        <div className="font-semibold text-gray-900 text-sm mb-1">
          {event.title || 'Untitled Event'}
        </div>
        <CategoryBadge category={event.category} />
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
          <CalendarDays className="w-4 h-4 text-gray-400" />
          {formatDate(event.eventDate)}
        </div>
        {event.startTime && event.endTime && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {formatTime(event.startTime)} - {formatTime(event.endTime)}
          </div>
        )}
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-start gap-2 text-sm text-gray-700 max-w-xs">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2">{locationText}</span>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
          <Users className="w-4 h-4 text-gray-400" />
          {participantsText}
        </div>
        {maxParticipants > 0 && (
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(participantPercentage, 100)}%` }}
            />
          </div>
        )}
      </td>
      
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border ${
          event.isRegistrationOpen 
            ? 'bg-green-50 text-green-700 border-green-200' 
            : 'bg-gray-50 text-gray-600 border-gray-200'
        }`}>
          {event.isRegistrationOpen ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Open
            </>
          ) : (
            <>
              <XCircle className="w-3.5 h-3.5" />
              Closed
            </>
          )}
        </span>
      </td>
      
      <td className="px-6 py-4">
        <StatusBadge status={event.status} />
      </td>
      
      <td className="px-6 py-4">
        <EventActions event={event} />
      </td>
    </tr>
  );
};

export default EventTableRow;
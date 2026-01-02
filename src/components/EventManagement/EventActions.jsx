import React from 'react';
import { Eye, Edit3, MoreVertical } from 'lucide-react';

const EventActions = ({ event }) => {
  if (!event) return null;

  const handleView = () => {
    console.log('View event:', event._id);
  };

  const handleEdit = () => {
    console.log('Edit event:', event._id);
  };

  const isCompleted = event.status === 'completed';

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={handleView}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110 group relative"
        title="View details"
      >
        <Eye className="w-4 h-4" />
      </button>
      {!isCompleted && (
        <button
          onClick={handleEdit}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110 group relative"
          title="Edit event"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      )}
      <button
        className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
        title="More options"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
    </div>
  );
};

export default EventActions;
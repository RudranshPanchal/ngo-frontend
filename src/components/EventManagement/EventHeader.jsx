import React from 'react';

const EventHeader = ({ onCreateClick }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage programs & volunteer activities
        </p>
      </div>
      <button
        onClick={onCreateClick}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Event
      </button>
    </div>
  );
};

export default EventHeader;
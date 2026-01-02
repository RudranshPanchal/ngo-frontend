import React from 'react';
import { Calendar, Sparkles, Plus } from 'lucide-react';

const EventEmptyState = ({ onCreateClick }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No events created yet
        </h3>
        
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          Get started by creating your first event to manage programs and volunteer activities. 
          Build engagement and track participation effortlessly.
        </p>
        
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Create Your First Event
        </button>
      </div>
    </div>
  );
};

export default EventEmptyState;
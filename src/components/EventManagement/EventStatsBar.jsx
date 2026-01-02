import React from 'react';
import { TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, gradient, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-100 rounded-lg animate-pulse mb-3"></div>
            <div className="h-8 w-16 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-12 h-12 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const EventStatsBar = ({ stats, isLoading }) => {
  const safeStats = stats || { total: 0, upcoming: 0, completed: 0 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        label="Total Events" 
        value={safeStats.total} 
        icon={TrendingUp}
        gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        isLoading={isLoading} 
      />
      <StatCard 
        label="Upcoming" 
        value={safeStats.upcoming} 
        icon={Calendar}
        gradient="bg-gradient-to-br from-purple-500 to-purple-600"
        isLoading={isLoading} 
      />
      <StatCard 
        label="Completed" 
        value={safeStats.completed} 
        icon={CheckCircle2}
        gradient="bg-gradient-to-br from-green-500 to-green-600"
        isLoading={isLoading} 
      />
    </div>
  );
};

export default EventStatsBar;
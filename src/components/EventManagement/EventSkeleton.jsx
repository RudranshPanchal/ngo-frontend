import React from 'react';
import { Calendar, MapPin, Users, Clock, CheckCircle2, Zap } from 'lucide-react';

const EventSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Event
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  Date & Time
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Location
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  Participants
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-500" />
                  Registration
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gray-500" />
                  Status
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="px-6 py-4">
                  <div className="h-4 w-40 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-5 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded-md animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-28 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-3 w-24 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-1.5 w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-full animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-7 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-7 w-24 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse"></div>
                    <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse"></div>
                    <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventSkeleton;
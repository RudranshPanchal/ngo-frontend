import React from 'react';

const SimpleChart = ({ data, title, color = 'purple' }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  const colorClasses = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-16 text-xs text-gray-600 text-right">
              {item.label}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
              <div 
                className={`h-2 rounded-full ${colorClasses[color]} transition-all duration-500`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <div className="w-8 text-xs text-gray-600 text-right">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleChart;
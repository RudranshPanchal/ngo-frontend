import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { CheckCircle, X } from 'lucide-react';

const RealTimeNotification = ({ userId }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(import.meta.env.VITE_BACKEND_URL );
    socket.emit('join-donor-room', userId);

    socket.on('donor-update', (update) => {
      if (update.type === 'donation-completed') {
        setNotification({
          id: Date.now(),
          type: 'success',
          title: 'Donation Completed!',
          message: `Your donation of ₹${update.data.amount.toLocaleString()} has been successfully processed.`,
          timestamp: update.timestamp
        });

        // Auto-hide after 5 seconds
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    });

    return () => socket.disconnect();
  }, [userId]);

  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 animate-slide-in">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealTimeNotification;
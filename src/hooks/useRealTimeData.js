import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useRealTimeData = (userId, apiEndpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    // Initialize socket connection
    socketRef.current = io(import.meta.env.VITE_BACKEND_URL);
    
    // Join donor room for real-time updates
    socketRef.current.emit('join-donor-room', userId);

    // Listen for real-time updates
    socketRef.current.on('donor-update', (update) => {
      if (update.type === 'donation-completed') {
        // Refresh data when donation is completed
        fetchData();
      }
    });

    // Initial data fetch
    fetchData();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId, apiEndpoint]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(import.meta.env.VITE_BACKEND_URL +`/api/donation${apiEndpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch: fetchData };
};

export default useRealTimeData;
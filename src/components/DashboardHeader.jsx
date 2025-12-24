import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Menu, User, LogOut, Settings } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const { currentUser, setSidebarOpen, setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const notifications = [
    { id: 1, message: 'New volunteer registered', time: '2 min ago', unread: true },
    { id: 2, message: 'Monthly report generated', time: '1 hour ago', unread: true },
    { id: 3, message: 'Certificate issued', time: '3 hours ago', unread: false }
  ];
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setCurrentUser(null);
    navigate('/');
  };
  
  const handleProfile = () => {
    setShowProfileMenu(false);
    navigate('/profile');
  };
  
  const handleSettings = () => {
    setShowProfileMenu(false);
    navigate('/settings');
  };
  
  return (
    <div className="border-b border-gray-200 bg-white px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 sm:p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Welcome back, {currentUser?.name}!</p>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm w-32 xl:w-48"
            />
          </div>
          
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.filter(n => n.unread).length}
              </span>
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 sm:p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}>
                      <p className="text-xs sm:text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-100">
                  <button className="text-xs sm:text-sm text-purple-600 hover:text-purple-700">View All</button>
                </div>
              </div>
            )}
          </div>
          
          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <span className="text-white font-medium text-xs sm:text-sm">
                {currentUser?.name?.charAt(0)?.toUpperCase()}
              </span>
            </button>
            
            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2 sm:p-3 border-b border-gray-100">
                  <p className="font-medium text-gray-900 text-sm truncate">{currentUser?.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{currentUser?.email}</p>
                  <p className="text-xs text-purple-600 capitalize">{currentUser?.role}</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={handleProfile}
                    className="w-full flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Profile
                  </button>
                  {/* <button 
                    onClick={handleSettings}
                    className="w-full flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Settings
                  </button> */}
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

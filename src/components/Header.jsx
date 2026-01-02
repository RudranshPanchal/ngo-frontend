import React, { useState, useEffect } from 'react';
import { Button } from './ui/button.jsx';
import { Menu, IndianRupee, X, Globe, User, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAppContext } from '../contexts/AppContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Foundation2 from '../assets/Foundation2.png';

const Header = () => {
  // Local State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  // Global Context
  const { language, toggleLanguage } = useLanguage();
  const { currentUser, authLoading, setCurrentUser, setSidebarOpen, sidebarOpen } = useAppContext();

  // NAVIGATION HOOK
  const navigate = useNavigate();

  // Menu Items
  const menuItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#mission', label: 'Mission & Vision' },
    { href: '#team', label: 'Our Team' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' }
  ];


  // Check for token on component mount and when currentUser changes
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    // Only set hasToken to true if both token and userData exist
    setHasToken(!!(token && userData));
  }, [currentUser]);

  // // Initialize hasToken state on component mount
  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   const userData = localStorage.getItem('userData');
  //   setHasToken(!!(token && userData));
  // }, []);


  // if (authLoading) {
  //   return null; // or skeleton header if you want
  // }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Clear user data and token
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('role');
    setCurrentUser(null);
    setHasToken(false);
    setIsMenuOpen(false);
    setSidebarOpen(false);

    // Redirect to home page
    navigate('/');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };


  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img src={Foundation2} alt="Orbosis Foundation" className="h-8 sm:h-10 lg:h-12 w-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-sm lg:text-base"
                onClick={handleMenuItemClick}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Sidebar Toggle Button - Only show when logged in */}
            {hasToken && (
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={handleSidebarToggle}
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            )}

            {/* Dashboard Button - Only show when logged in */}
            {hasToken && (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center cursor-pointer gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2"
                onClick={handleDashboardClick}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="font-medium text-sm">Dashboard</span>
              </Button>
            )}

            {/* Logout Button - Only show when logged in */}
            {hasToken && (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center cursor-pointer gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium text-sm">Logout</span>
              </Button>
            )}
            {/* fund raising */}
            {!hasToken && (
              <Link to="/FundRaising">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center cursor-pointer gap-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded"
                >
                  <IndianRupee className="h-4 w-4" />
                  <span className="font-medium text-sm">Fund raising</span>
                </Button>
              </Link>
            )}

            {/* Login Button - Only show when not logged in */}
            {!hasToken && (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center cursor-pointer gap-2 bg-amber-800 text-white hover:bg-amber-900 px-3 py-2"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium text-sm">Login</span>
                </Button>
              </Link>
            )}

            {/* Signup Button - Only show when not logged in */}
            {!hasToken && (
              <Link to="/signup">
                <Button
                  size="sm"
                  className="hidden sm:flex items-center cursor-pointer gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="font-medium text-sm">Sign Up</span>
                </Button>
              </Link>
            )}

            {/* Apply for Membership Button - Only show when not logged in */}
            {!hasToken && (
              <Link to="/membership">
                <Button
                  size="sm"
                  className="hidden md:flex items-center cursor-pointer gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="font-medium text-sm">Apply</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden cursor-pointer p-2"
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && !hasToken && (
          <div className="lg:hidden border-t border-gray-200 py-4 px-4">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 transition-colors py-3 px-2 font-medium text-base border-b border-gray-100 last:border-b-0"
                  onClick={handleMenuItemClick}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-3 mt-6 pt-4 border-t border-gray-200">
                <Link to="/login" className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-700 cursor-pointer py-3"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">Login</span>
                  </Button>
                </Link>
                <Link to="/FundRaising" className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-700 cursor-pointer py-3"
                  >
                    <IndianRupee className="h-4 w-4" />

                    <span className="font-medium">Fund rising</span>
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button
                    size="sm"
                    className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer py-3"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="font-medium">Sign Up</span>
                  </Button>
                </Link>
                <Link to="/membership" className="w-full">
                  <Button
                    size="sm"
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer py-3"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="font-medium">Apply for Membership</span>
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}

        {/* Mobile Menu for Logged-in Users */}
        {isMenuOpen && hasToken && (
          <div className="lg:hidden border-t border-gray-200 py-4 px-4">
            <div className="flex flex-col space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-700 cursor-pointer py-3"
                onClick={handleDashboardClick}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="font-medium">Dashboard</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-700 cursor-pointer py-3"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Logout</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


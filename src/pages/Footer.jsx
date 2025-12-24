import React, { useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteContent } from '../data/content.js';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  const handleSub = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsSubscribing(true);
    
    try {
      // Try backend first
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/auth/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        alert('Successfully subscribed to newsletter!');
      } else {
        throw new Error('Backend unavailable');
      }
    } catch (error) {
      // Fallback to local storage
      const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
      }
      alert('Successfully subscribed to newsletter!');
    }
    
    setEmail('');
    setIsSubscribing(false);
  };
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-400">Orbosis Foundation</h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
              Empowering Women, Transforming Lives. A women empowerment NGO dedicated to uplifting underprivileged women and girls through education, skill development, and livelihood initiatives.
            </p>
            
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-purple-400">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-white transition-colors text-sm sm:text-base">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors text-sm sm:text-base">About</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors text-sm sm:text-base">Programs</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors text-sm sm:text-base">Projects</a></li>
              <li><a href="#impact" className="hover:text-white transition-colors text-sm sm:text-base">Impact</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors text-sm sm:text-base">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-purple-400">Programs</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Women Skill Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Adult Literacy Drive</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Girl Child Education</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Health & Hygiene</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Leadership Building</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-purple-400">Contact Info</h4>
            <div className="space-y-2 sm:space-y-3 text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{siteContent.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{siteContent.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{siteContent.contact.email}</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <h5 className="text-xs sm:text-sm font-semibold mb-2 text-purple-400">Newsletter</h5>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSub()}
                />
                <Button 
                  onClick={handleSub}
                  disabled={isSubscribing}
                  size="sm" 
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-sm px-3 py-2"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1 sm:gap-2 text-sm">
                <span className="flex items-center gap-1">
                  <span className="text-purple-400">©</span> {currentYear} 
                  <span className="text-purple-400 font-semibold">Orbosis Foundation – Empowering Women, Transforming Lives</span>
                </span>
              </p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400 text-center md:text-left">
                Registered NGO | All Rights Reserved
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <span className="text-gray-600">•</span>
              <Link to="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">Terms & Conditions</Link>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Transparency</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

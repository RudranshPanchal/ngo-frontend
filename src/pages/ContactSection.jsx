import React, { useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { siteContent } from '../data/content.js';
import api from '../config/api.js';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    const data = {
      fullName: formData.name,
      email: formData.email,
      contactNumber: formData.phone,
      message: formData.message
    };

    try {
      // API ko fire karo, but UI ko wait mat karao
      api.post('/api/auth/contactUs', data).catch(() => { });

      setSuccess("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.log("Backend unavailable:", error.message);

      // Backup local save
      const messageData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem("contactMessages") || "[]");
      existing.push(messageData);
      localStorage.setItem("contactMessages", JSON.stringify(existing));

      setError("Message received! We will get back to you soon.");
       setFormData({ name: '', email: '', phone: '', message: '' });

    }

    setLoading(false);
  };


  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Get in touch with us to learn more about our programs, volunteer opportunities, or to discuss partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              Get in Touch
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Address</h4>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {siteContent.contact.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Phone</h4>
                  <p className="text-gray-600 text-sm sm:text-base">{siteContent.contact.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Email</h4>
                  <p className="text-gray-600 text-sm sm:text-base">{siteContent.contact.email}</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Office Hours</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 text-sm sm:text-base">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600 text-sm sm:text-base">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="mt-8 sm:mt-12">
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Follow Us</h4>
              <div className="flex space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <a
                    href="https://www.facebook.com/share/1BJPUR3i32/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </a>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center cursor-pointer hover:from-pink-600 hover:to-red-600 transition-colors">
                  <a
                    href="https://www.instagram.com/orbosis_foundation?igsh=NnB2bmwzZWxvZmp5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </a>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-900 transition-colors">
                  <a
                    href="https://www.linkedin.com/company/orbosisfoundation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form and Map */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Send us a Message</h3>
             

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs sm:text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs sm:text-sm font-medium text-gray-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={4}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base resize-none"
                    required
                  />
                </div>
                   {success && (
                <p className="text-green-700 bg-green-100 border border-green-300 px-3 py-2 rounded-md text-sm">
                  {success}
                </p>
              )}

              {error && (
                <p className="text-red-700 bg-red-100 border border-red-300 px-3 py-2 rounded-md text-sm">
                  {error}
                </p>
              )}
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Google Map */}
            <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.674870181394!2d77.20902731508236!3d28.65195908240063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0683329da9%3A0x1b2b3f6a9b2b3f6a!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1642678901234!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="sm:h-[300px]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

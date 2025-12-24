import React from 'react';
import { Quote, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImpactStorySection = () => {
  return (
    <section id="impact-story" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
             Impact Story
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed px-4 sm:px-0">
            Real stories of transformation and hope from our community
          </p>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative bg-gradient-to-r from-purple-600 to-orange-500 p-6 sm:p-8 lg:p-12">
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <Quote className="h-8 w-8 sm:h-12 sm:w-12 text-white opacity-30" />
            </div>
            
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 pr-8 sm:pr-12">
              Story of Hope – How One Sewing Machine Changed Rani's Life
            </h3>
          </div>

          <div className="p-6 sm:p-8 lg:p-12">
            <div className="prose prose-gray max-w-none">
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  When Rani, a 29-year-old woman from a small slum area near Indore, first heard about 
                  Orbosis Foundation's Skill Development Workshop, she almost didn't come. She thought — 
                  <em>'People like us never get real help.'</em>
                </p>

                <p className="text-base sm:text-lg">
                  Rani was a single mother. Her husband had left, and she worked as a domestic helper, 
                  earning barely enough to feed her two children. Most days, she skipped her own meals 
                  to make sure her kids ate.
                </p>

                <p className="text-base sm:text-lg">
                  One day, her neighbor told her about Orbosis Foundation's training sessions for women 
                  who wanted to learn tailoring and basic business skills. With hesitation, she joined — 
                  nervous, shy, and full of doubt.
                </p>

                <p className="text-base sm:text-lg">
                  But over the next few months, everything changed. Rani learned how to stitch, manage 
                  orders, and even use a smartphone to take online tailoring work. She received her first 
                  sewing machine through the foundation's support program.
                </p>

                <div className="bg-purple-50 rounded-lg p-4 sm:p-6 my-6 sm:my-8 border-l-4 border-purple-500">
                  <p className="text-base sm:text-lg font-medium text-purple-900">
                    The day she earned her first ₹500 from her own work, she cried — not because of the 
                    money, but because for the first time, she felt free.
                  </p>
                </div>

                <p className="text-base sm:text-lg">
                  Today, Rani runs her small tailoring unit from home. She not only supports her children's 
                  education but also trains other women in her area for free every Sunday.
                </p>

                <blockquote className="border-l-4 border-orange-500 pl-4 sm:pl-6 my-6 sm:my-8">
                  <p className="text-lg sm:text-xl italic text-gray-800 font-medium">
                    "Orbosis Foundation didn't just teach me a skill," Rani says. "They taught me that 
                    I have the power to stand on my own feet."
                  </p>
                </blockquote>
              </div>
            </div>

            {/* Tagline */}
            <div className="mt-8 sm:mt-12 text-center">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-base sm:text-lg font-semibold">
                  "Every woman deserves not sympathy — but a chance."
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            Help us create more stories like Rani's
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/donor-registration" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-base sm:text-lg"
            >
              Donate Now
            </Link>
            <Link 
              to="/volunteer-registration" 
              className="border border-purple-600 text-purple-600 hover:bg-purple-100 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-base sm:text-lg"
            >
              Volunteer With Us
            </Link>
            <Link 
              to="/beneficiary-registration" 
              className="border border-orange-500 text-orange-600 hover:bg-orange-100 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-base sm:text-lg"
            >
              Get Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStorySection;
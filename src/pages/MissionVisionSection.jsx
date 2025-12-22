import React from 'react';
import { Target, Quote, Equal, Blend, Shrub, HandHeart, ShieldHalf } from 'lucide-react';
import { siteContent } from '../data/content.js';

const MissionVisionSection = () => {
  const missionVisionData = [
    {
      icon: Target,
      title: 'Our Mission',
      description: siteContent.mission,
      borderColor: 'border-purple-300',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    

    },
    {
      icon: Target,
      title: 'Our Vision',
      description: siteContent.vision,
      borderColor: 'border-orange-300',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  const coreValues = [
    {
      letter: <HandHeart color="#092ff1" />,
      title: 'Compassion',
      subtitle: 'Caring for every individual',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      letter: <Equal color="#092ff1" />,
      title: 'Equality',
      subtitle: 'Equal opportunities for all',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
    {
      letter: <Blend color="#092ff1" />,
      title: 'Transparency',
      subtitle: 'Open and honest operations',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600'
    },
    {
      letter: <Shrub color="#092ff1" />,
      title: 'Growth',
      subtitle: 'Continuous development',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      letter: <ShieldHalf color="#092ff1" />,
      title: 'Community Empowerment',
      subtitle: 'Strengthening communities',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    }
  ];

  return (
    <section id="mission" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Mission & Vision
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Our core beliefs and values guide us in creating a world where every woman has the opportunity to reach her full potential.
          </p>
        </div>

        <div className="flex flex-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {missionVisionData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className={`bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 border-2 ${item.borderColor} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                  <div className={`relative-translate-y-1 p-3 sm:p-4 rounded-full ${item.iconBg} border-2 ${item.borderColor} w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0`}>
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Values Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                  <span className={`text-2xl sm:text-3xl font-bold ${value.textColor}`}>
                    {value.letter}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {value.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="relative w-full mx-auto bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <Quote className="h-8 w-8 sm:h-12 sm:w-12 text-white opacity-30" />
          </div>
          
          <div className="max-w-7xl mx-auto text-center">
            <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium leading-relaxed mb-4 sm:mb-6 pr-8 sm:pr-12">
              "Every woman has the potential to be a catalyst for change. Our role is to provide the platform, tools, and support to help her realize that potential and transform not just her own life, but her entire community."
            </blockquote>
            
            <div className="text-right">
              <cite className="text-xs sm:text-sm lg:text-base opacity-90">
                - Founder, Orbosis Foundation
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;

import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';

const AboutSection = () => {
  const programs = [
    {
      icon: Target,
      title: 'Women Skill Development Workshops',
      description: 'Tailoring, handicrafts, and digital literacy classes for unemployed women. Helping women earn income through self-employment and micro-entrepreneurship.',
      borderColor: 'border-purple-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: Eye,
      title: 'Adult Literacy Drive',
      description: 'Evening classes for women who missed formal education. Focus on reading, writing, and financial awareness.',
      borderColor: 'border-orange-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      icon: Heart,
      title: 'Girl Child Education Initiative',
      description: 'Supporting school education for girls in slum areas by providing books, tuition, and uniforms. Awareness drives to prevent school dropouts.',
      borderColor: 'border-pink-500',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600'
    }
  ];

  const additionalPrograms = [
    {
      icon: Heart,
      title: 'Health & Hygiene Awareness',
      description: 'Sessions on menstrual hygiene, nutrition, and wellness. Distribution of hygiene kits and community awareness drives.',
      borderColor: 'border-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Target,
      title: 'Leadership & Self-Confidence Building',
      description: 'Mentorship programs to help women build confidence and leadership in their communities.',
      borderColor: 'border-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ];

  return (
    // <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white">
    //   <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
    //     {/* About Section */}
    //     <div className="text-center mb-12 sm:mb-16">
    //       <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
    //         About Orbosis Foundation
    //       </h2>
    //       <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-6xl mx-auto leading-relaxed px-4 sm:px-0">
    //         Orbosis Foundation is a women empowerment NGO dedicated to uplifting underprivileged women and girls through education, skill development, and livelihood initiatives. Our focus is to create sustainable change by equipping women with the tools, knowledge, and confidence they need to lead independent and fulfilling lives. We work in slum and rural communities to promote education, financial literacy, and skill-based employment.
    //       </p>
    //       <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-6xl mx-auto leading-relaxed px-4 sm:px-0 mt-4">
    //         We believe that when a woman stands strong, her entire community thrives.
    //       </p>
    //     </div>

    //     {/* Key Programs Section */}
    //     <div className="text-center">
    //       <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">
    //         Our Key Programs
    //       </h3>
          
    //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
    //         {programs.map((program, index) => {
    //           const Icon = program.icon;
    //           return (
    //             <div 
    //               key={index} 
    //               className={`bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 ${program.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
    //             >
    //               <div className="flex justify-center mb-4 sm:mb-6">
    //                 <div className={`p-2 sm:p-3 rounded-full ${program.iconBg} border-2 ${program.borderColor} w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center`}>
    //                   <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${program.iconColor}`} />
    //                 </div>
    //               </div>
                  
    //               <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
    //                 {program.title}
    //               </h4>
                  
    //               <p className="text-gray-600 text-center leading-relaxed text-xs sm:text-sm lg:text-base">
    //                 {program.description}
    //               </p>
    //             </div>
    //           );
    //         })}
    //       </div>
          
    //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
    //         {additionalPrograms.map((program, index) => {
    //           const Icon = program.icon;
    //           return (
    //             <div 
    //               key={index} 
    //               className={`bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 ${program.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
    //             >
    //               <div className="flex justify-center mb-4 sm:mb-6">
    //                 <div className={`p-2 sm:p-3 rounded-full ${program.iconBg} border-2 ${program.borderColor} w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center`}>
    //                   <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${program.iconColor}`} />
    //                 </div>
    //               </div>
                  
    //               <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
    //                 {program.title}
    //               </h4>
                  
    //               <p className="text-gray-600 text-center leading-relaxed text-xs sm:text-sm lg:text-base">
    //                 {program.description}
    //               </p>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section id="about" className="py-8 sm:py-12 lg:py-16 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Header Section: Reduced top margin and optimized text spacing */}
    <div className="text-center mb-10 sm:mb-16">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        About Orbosis Foundation
      </h2>
      <div className="max-w-4xl mx-auto space-y-4">
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-2">
          Orbosis Foundation is a women empowerment NGO dedicated to uplifting underprivileged women and girls through education, skill development, and livelihood initiatives. Our focus is to create sustainable change by equipping women with the tools, knowledge, and confidence they need to lead independent and fulfilling lives. We work in slum and rural communities to promote education, financial literacy, and skill-based employment.
        </p>
        <p className="text-sm sm:text-base font-semibold text-orange-600 italic">
          "We believe that when a woman stands strong, her entire community thrives."
        </p>
      </div>
    </div>

    {/* Key Programs Section */}
    <div className="text-center">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-10">
        Our Key Programs
      </h3>
      
      {/* Centered Grid for all cards */}
      <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
        {[...programs, ...additionalPrograms].map((program, index) => {
          const Icon = program.icon;
          return (
            <div 
              key={index} 
              /* Width fixed for consistency, centered content */
              className={`w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-2rem)] max-w-sm 
                         bg-white rounded-2xl p-6 sm:p-8 border-2 ${program.borderColor} 
                         shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl 
                         transition-all duration-300 hover:-translate-y-2 flex flex-col items-center`}
            >
              {/* Icon Container */}
              <div className="mb-6">
                <div className={`p-4 rounded-full ${program.iconBg} border-2 ${program.borderColor} 
                                w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-inner`}>
                  <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${program.iconColor}`} />
                </div>
              </div>
              
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                {program.title}
              </h4>
              
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                {program.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>
  );
};

export default AboutSection;

import React, { useState } from 'react';
import { MapPin, X, Mail, User } from 'lucide-react';
import { siteContent } from '../data/content.js';
import manoharImg from '../assets/team-member/Manoharpatel.jpg';
import poojaMongalImg from '../assets/team-member/Pooja mongal.jpg';
import poojaSarnakarImg from '../assets/team-member/Pooja Sarnakar.jpg';
import pranitaImg from '../assets/team-member/Pranita Dixit.jpg';
import shrutiImg from '../assets/team-member/Shruti Agrawal.jpg';
import reetuImg from '../assets/team-member/Reetu Agrawal.jpg';
import prabhatAgrawalImg from '../assets/team-member/prabhat agrawal.jpg';
import OmprakashAgrawalImg from '../assets/team-member/OmprakashAgrawal.jpg'

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Define Core Team Members (Management Team)
  const coreTeamNames = ['Pooja Satankar', 'Pooja Mogal', 'Shruti Agrawal', 'Reetu Agrawal', 'Prabhat Agrawal'];
  
  // Define Managing Members (Main Team)
  const managingTeamNames = [
    'Ruchi Verma', 'Pranita Ji', 'Utkarsh', 'Shubham', 'Pooja',
    'Harsh', 'Manohar', 'Chaya', 'Geetanjali', 'Hemant', 'Sourabh','Om Prakash Agrawal'
  ];

  const getTeamImage = (name, isCore = false) => {
    // Only show photos for Core Team Members
    if (!isCore) return null;
    
    if (name === 'Pooja Mogal') return poojaMongalImg;
    if (name === 'Pooja Satankar') return poojaSarnakarImg;
    if (name === 'Prabhat Agrawal') return prabhatAgrawalImg;
    if (name === 'Reetu Agrawal') return reetuImg;
    if(name==='Shruti Agrawal') return shrutiImg;
    if(name==='Om Prakash Agrawal') return OmprakashAgrawalImg;
    if(name==='Manohar') return manoharImg;

    // else{
    //   if(name==='Om Prakash Agrawal') return OmprakashAgrawalImg;
    // }
    return null;
  };


    
  const teamMembers = siteContent.team.map((member, index) => {
    const isCore = coreTeamNames.includes(member.name)||managingTeamNames.includes(member.name);

    let description = member.bio;
    
    // Update descriptions based on the new content
    if (member.name === 'Pooja Satankar') {
      description = 'Leads the overall vision, operations, and direction of Orbosis Foundation.';
    } else if (member.name === 'Pooja Mogal') {
      description = 'Oversees daily operations, program implementation, and coordination.';
    } else if (member.name === 'Shruti Agrawal') {
      description = 'Manages finances, budgeting, and transparency in all processes.';
    } else if (member.name === 'Reetu Agrawal') {
      description = 'Handles branding, social media, and public outreach campaigns.';
    } else if (member.name === 'Prabhat Agrawal') {
      description = 'Leads digital transformation, website development, and tech initiatives.';
    }
    
    return {
      id: index + 1,
      name: member.name,
      role: member.position,
      location: 'M50 janta quater near pink flower school nanda nagar indore',
      description: description,
      image: getTeamImage(member.name, isCore),
      skills: ['Leadership', 'Social Work', 'Community Development']
    };
  });

  // Separate team members into categories
  const coreTeamMembers = teamMembers.filter(member => coreTeamNames.includes(member.name));
  const managingTeamMembers = teamMembers.filter(member => managingTeamNames.includes(member.name));
// managingTeamMembers.map((i)=>console.log("img",i.image))


  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <section id="team" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Meet Our Team
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            The Faces Behind the Mission
          </p>
        </div>

        {/* Core Team Members */}
        <div className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-purple-600 text-center mb-8">
            Leadership Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {coreTeamMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer"
                onClick={() => openModal(member)}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mx-auto mb-4 sm:mb-6 border-2 border-purple-200">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                      <User className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                
                <p className="text-purple-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Managing Members */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-orange-600 text-center mb-8">
            Managing Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {managingTeamMembers.slice(0, showAll ? managingTeamMembers.length : (window.innerWidth < 640 ? 2 : 8)).map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer"
                onClick={() => openModal(member)}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mx-auto mb-4 sm:mb-6 border-2 border-orange-200">
                  {member.image? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                      <User className="h-8 w-8 sm:h-10 sm:w-10 text-orange-600" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                
                <p className="text-orange-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
          {((window.innerWidth < 640 && managingTeamMembers.length > 2) || (window.innerWidth >= 640 && managingTeamMembers.length > 8)) && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {showAll ? 'Show Less' : 'View More Managing Members'}
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg sm:rounded-xl max-w-sm sm:max-w-md w-full mx-4 relative shadow-lg max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full cursor-pointer flex hover:bg-gray-100 bg-gray-200 items-center justify-center transition-colors z-10"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
              </button>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 lg:p-8 text-center">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pr-8">
                  {selectedMember.name}
                </h2>

                {/* Profile Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto mb-4 sm:mb-6 border-2 border-purple-200">
                  {selectedMember.image ? (
                    <img 
                      src={selectedMember.image} 
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                      <User className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600" />
                    </div>
                  )}
                </div>

                {/* Role */}
                <p className="text-purple-600 font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                  {selectedMember.role}
                </p>


 
                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {selectedMember.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {selectedMember.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Contact Icon */}
                <div className="flex justify-center">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;

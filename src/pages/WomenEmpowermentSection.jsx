import React from 'react';
import { Users, BookOpen, Briefcase, Heart } from 'lucide-react';

// Import women empowerment images
import img1 from '../assets/women-empowerment/img1.jpg';
import img2 from '../assets/women-empowerment/img2.jpg';
import img3 from '../assets/women-empowerment/img3.jpg';
import img4 from '../assets/women-empowerment/img4.jpg';
import { useNavigate } from 'react-router-dom';

const WomenEmpowermentSection = () => {
  const projects = [
    {
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
      title: "Project UDAAN – Skill Development for Rural Women",
      description: "Providing professional tailoring and craft training to women in Indore and nearby areas. Over 150+ women have started small home-based businesses through this program.",
      image: img1
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      title: "Project SHIKSHA – Education for Every Girl",
      description: "A campaign ensuring girls from slum areas continue their schooling. Provides learning kits, mentorship, and career guidance.",
      image: img2
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Project SAHYOG – Support for Single Mothers",
      description: "Offering financial training, micro-funding, and business support to single mothers and widows.",
      image: img3
    },
    {
      icon: <Heart className="w-8 h-8 text-purple-600" />,
      title: "Project JAGRITI – Menstrual Health & Hygiene Awareness",
      description: "Conducted workshops to promote menstrual hygiene and break societal taboos.",
      image: img4
    }
  ];

  const impactStats = [
    { number: "500+", label: "Women Trained in Skills" },
    { number: "120+", label: "Girls Enrolled in Schools" },
    { number: "30+", label: "Health & Hygiene Workshops" },
    { number: "15", label: "Self-Help Groups Formed" },
    { number: "80+", label: "Community Volunteers Engaged" }
  ];
  const navigate = useNavigate();

  const handleNavigate = (title)=>{
    if(title == 'Project UDAAN – Skill Development for Rural Women'){
      navigate('/ProjectDetails')
    }
  }

  return (
    <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" id='projects'>
            Our Projects
          </h2>
          <p className="text-lg md:text-2xl text-gray-700 max-w-5xl mx-auto">
            Current & Upcoming Projects making real impact in women's lives
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {projects.map((project, index) => (
            <div onClick={()=>handleNavigate(project.title)} key={index} className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start mb-3">
                  {project.icon}
                  <h3 className="text-lg font-semibold text-gray-800 ml-3 leading-tight">{project.title}</h3>
                </div>
                <p className="text-gray-600 text-md leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Impact
            </h3>
            <p className="text-lg text-gray-600">
              The Change We've Created So Far
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <blockquote className="text-lg md:text-xl italic text-gray-700 font-medium">
              "Empower a woman, and you empower an entire generation."
            </blockquote>
          </div>
        </div>


      </div>
    </section>
  );
};

export default WomenEmpowermentSection;
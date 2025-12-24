import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext(undefined);

export const ContentProvider = ({ children }) => {
  const [contentSections] = useState([
    {
      id: '1',
      type: 'about',
      title: 'About Us',
      content: 'Orbosis Foundation is dedicated to empowering women through skill development, education, and entrepreneurship opportunities.',
      visible: true
    },
    {
      id: '2',
      type: 'mission',
      title: 'Our Mission',
      content: 'To create an inclusive society where every woman has access to skills, opportunities, and resources for economic independence.',
      visible: true
    },
    {
      id: '3',
      type: 'vision',
      title: 'Our Vision',
      content: 'A world where women are empowered leaders, skilled professionals, and successful entrepreneurs.',
      visible: true
    }
  ]);

  const [contactInfo] = useState({
    address: 'Women Empowerment Center, New Delhi - 110001',
    phone: '+91 98765 43210',
    email: 'info@orbosis.org',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-74.0059413!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123'
  });

  const [socialMedia] = useState({
    facebook: 'https://www.facebook.com/share/1BJPUR3i32/',
    twitter: 'https://twitter.com/orbosis',
    instagram: 'https://www.instagram.com/orbosis_foundation?igsh=NnB2bmwzZWxvZmp5',
    youtube: 'https://youtube.com/orbosis'
  });

  const [content, setContent] = useState({
    hero: {
      title: 'Empowering Women, Building Futures',
      subtitle: 'Join us in creating opportunities for women through skill development, education, and entrepreneurship programs that transform lives and communities.',
      buttonText: 'Support Women Empowerment',
      backgroundImage: '/placeholder.svg'
    },
    about: {
      title: 'Empowering Women Through Skills',
      description: 'We are dedicated to empowering women through comprehensive skill development programs, vocational training, and entrepreneurship support. Our mission is to create economic independence and leadership opportunities for women across all communities.',
      image: '/placeholder.svg'
    },
    projects: {
      title: 'Our Empowerment Programs',
      items: [
        {
          title: 'Skill Development Training',
          description: 'Comprehensive vocational training programs in tailoring, handicrafts, digital skills, and more',
          image: '/placeholder.svg'
        },
        {
          title: 'Women Entrepreneurship',
          description: 'Supporting women to start and grow their own businesses with mentorship and microfinance',
          image: '/placeholder.svg'
        },
        {
          title: 'Digital Literacy',
          description: 'Teaching essential computer and digital skills to help women access modern opportunities',
          image: '/placeholder.svg'
        }
      ]
    }
  });

  const updateContent = (section, data) => {
    setContent(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <ContentContext.Provider value={{ contentSections, contactInfo, socialMedia, content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const useContentContext = useContent;

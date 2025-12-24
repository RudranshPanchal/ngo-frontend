import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Common
    'common.orgName': 'Orbosis Foundation',
    'common.login': 'Login',
    'common.applyMembership': 'Apply for Membership',
    'common.join': 'Join',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.mission': 'Mission & Vision',
    'nav.team': 'Our Team',
    'nav.projects': 'Projects',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Empowering Women Through',
    'hero.titleHighlight': 'Skill Development',
    'hero.description': 'Join Orbosis Foundation in creating opportunities for women to develop skills, build careers, and transform their communities through education and empowerment.',
    'hero.stats.womenTrained': 'Women Trained',
    'hero.stats.programs': 'Programs',
    'hero.stats.states': 'States Covered',
    'hero.cta.volunteer': 'Volunteer With Us',
    'hero.cta.donate': 'Donate Now',
    'hero.cta.member': 'Become a Member',
    'hero.floatingCard1.title': 'Digital Skills Training',
    'hero.floatingCard1.subtitle': 'Live Workshop',
    'hero.floatingCard2.title': 'Entrepreneurship Program',
    'hero.floatingCard2.subtitle': 'Starting Soon',
    
    // Dashboard
    'dashboard.title': 'NGO Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.members': 'Members',
    'dashboard.donations': 'Donations',
    'dashboard.certificates': 'Certificates',
    'dashboard.idcards': 'ID Cards',
    'dashboard.financial': 'Financial',
    'dashboard.legal': 'Legal & Compliance',
    'dashboard.reports': 'Reports',
    'dashboard.events': 'Events',
    'dashboard.volunteers': 'Volunteers',
    'dashboard.impact': 'Impact',
    'dashboard.content': 'Content Manager',
    'dashboard.website': 'Public Website',
    'dashboard.messages': 'Messages',
    'dashboard.attendance': 'Attendance',
    
    // Common Actions
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.download': 'Download',
    'common.generate': 'Generate',
    'common.export': 'Export',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.add': 'Add',
    'common.view': 'View',
    'common.name': 'Name',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.address': 'Address',
    'common.date': 'Date',
    'common.amount': 'Amount',
    'common.status': 'Status',
    'common.actions': 'Actions'
  },
  hi: {
    // Common
    'common.orgName': 'ऑर्बोसिस फाउंडेशन',
    'common.login': 'लॉगिन',
    'common.applyMembership': 'सदस्यता के लिए आवेदन',
    'common.join': 'जुड़ें',
    
    // Navigation
    'nav.home': 'मुख्य',
    'nav.about': 'हमारे बारे में',
    'nav.mission': 'मिशन और दृष्टि',
    'nav.team': 'हमारी टीम',
    'nav.projects': 'परियोजनाएं',
    'nav.gallery': 'गैलरी',
    'nav.contact': 'संपर्क',
    
    // Hero Section
    'hero.title': 'महिलाओं को सशक्त बनाना',
    'hero.titleHighlight': 'कौशल विकास के माध्यम से',
    'hero.description': 'ऑर्बोसिस फाउंडेशन के साथ जुड़ें और महिलाओं के लिए कौशल विकास, करियर निर्माण और शिक्षा और सशक्तिकरण के माध्यम से समुदायों को बदलने के अवसर बनाने में सहयोग करें।',
    'hero.stats.womenTrained': 'प्रशिक्षित महिलाएं',
    'hero.stats.programs': 'कार्यक्रम',
    'hero.stats.states': 'राज्य कवर',
    'hero.cta.volunteer': 'हमारे साथ स्वयंसेवा करें',
    'hero.cta.donate': 'अभी दान करें',
    'hero.cta.member': 'सदस्य बनें',
    'hero.floatingCard1.title': 'डिजिटल कौशल प्रशिक्षण',
    'hero.floatingCard1.subtitle': 'लाइव वर्कशॉप',
    'hero.floatingCard2.title': 'उद्यमिता कार्यक्रम',
    'hero.floatingCard2.subtitle': 'जल्द शुरू',
    
    // Dashboard
    'dashboard.title': 'एनजीओ डैशबोर्ड',
    'dashboard.overview': 'अवलोकन',
    'dashboard.members': 'सदस्य',
    'dashboard.donations': 'दान',
    'dashboard.certificates': 'प्रमाणपत्र',
    'dashboard.idcards': 'पहचान पत्र',
    'dashboard.financial': 'वित्तीय',
    'dashboard.legal': 'कानूनी और अनुपालन',
    'dashboard.reports': 'रिपोर्ट',
    'dashboard.events': 'कार्यक्रम',
    'dashboard.volunteers': 'स्वयंसेवक',
    'dashboard.impact': 'प्रभाव',
    'dashboard.content': 'सामग्री प्रबंधक',
    'dashboard.website': 'सार्वजनिक वेबसाइट',
    'dashboard.messages': 'संदेश',
    'dashboard.attendance': 'उपस्थिति',
    
    // Common Actions
    'common.submit': 'जमा करें',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.download': 'डाउनलोड',
    'common.generate': 'उत्पन्न करें',
    'common.export': 'निर्यात',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.add': 'जोड़ें',
    'common.view': 'देखें',
    'common.name': 'नाम',
    'common.email': 'ईमेल',
    'common.phone': 'फोन',
    'common.address': 'पता',
    'common.date': 'दिनांक',
    'common.amount': 'राशि',
    'common.status': 'स्थिति',
    'common.actions': 'कार्य'
  }
};

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

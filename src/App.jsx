import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MembershipApplicationPage from './pages/MembershipApplicationPage'
import DonorRegistrationPage from './pages/DonorRegistrationPage'
import DashboardPage from './pages/DashboardPage'
import VolunteerManagementPage from './pages/VolunteerManagementPage'
import VolunteerDetailPage from './pages/VolunteerDetailPage'
import VolunteerRegistrationPage from './pages/VolunteerRegistrationPage'
import MemberManagementPage from './pages/MemberManagementPage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { LanguageProvider } from './contexts/LanguageContext'
import { AppProvider } from './contexts/AppContext'
import { ContentProvider } from './contexts/ContentContext'
import MemberDetailPage from './pages/MemberDetailPage'
import GalleryManagementPage from './pages/GalleryManagementPage'
import BeneficiaryManagementPage from './pages/BeneficiaryManagementPage'
import CertificateManagementPage from './pages/CertificateManagementPage'
import MembershipApplicationsPage from './pages/MembershipApplicationsPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import ContactPage from './pages/ContactPage'
import Footer from './components/Footer'
import Analytics from './components/Analytics'
import WhatsAppButton from './components/WhatsAppButton'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import BeneficiaryRegistrationPage from './pages/BeneficiaryRegistrationPage'
import NotFoundPage from './pages/NotFoundPage'
import VolunteerEvents from './components/VolunteerEvents'
import MyTasks from './components/MyTasks'
import ProjectDetails from './pages/ProjectDetails'
import FundRaising from './pages/FundRaising'
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import AuditReportPage from './components/AuditReportPage'
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from './pages/ChangePassword'
import FundraisingmanagementPage from './pages/FundraisingmanagementPage'


// Main App Component with Sidebar Logic
const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [currentUser, setCurrentUser] = useState(null)

  return (
     
    <AppProvider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50">
              <Home />
            </div>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/FundRaising" element={<FundRaising />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/membership" element={<MembershipApplicationPage />} />
          <Route path="/donor-registration" element={<DonorRegistrationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/volunteer-registration" element={<VolunteerRegistrationPage />} />
          <Route path="/volunteer-management" element={<VolunteerManagementPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/volunteer-detail/:id" element={<VolunteerDetailPage />} />
          <Route path="/member-management" element={<MemberManagementPage />} />
          <Route path="/member-detail/:id" element={<MemberDetailPage />} />
          <Route path="/membership-applications" element={<MembershipApplicationsPage />} />
          <Route path="/gallery-management" element={<GalleryManagementPage />} />
          <Route path="/beneficiary-management" element={<BeneficiaryManagementPage />} />
          <Route path="/certificate-management" element={<CertificateManagementPage />} />
          <Route path="/Fundraising-management" element={<FundraisingmanagementPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/beneficiary-registration" element={<BeneficiaryRegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path ="/VolunteerEvents" element={<VolunteerEvents/>} />
          <Route path ="/ProjectDetails" element={<ProjectDetails/>} />
          <Route path="/audit-report" element={<AuditReportPage/>} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path ="/MyTasks" element={<MyTasks/>} />
     
        </Routes>
      </Router>
    </AppProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
    <LanguageProvider>
      <ContentProvider>
        <Analytics />
        <AppContent />
      </ContentProvider>
    </LanguageProvider>
    </ThemeProvider>
  )
}

export default App





// import { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Home from './pages/Home'
// import LoginPage from './pages/LoginPage'
// import SignupPage from './pages/SignupPage'
// import FundRaising from './pages/FundRaising'
// import MembershipApplicationPage from './pages/MembershipApplicationPage'
// import DonorRegistrationPage from './pages/DonorRegistrationPage'
// import DashboardPage from './pages/DashboardPage'
// import VolunteerManagementPage from './pages/VolunteerManagementPage'
// import VolunteerDetailPage from './pages/VolunteerDetailPage'
// import VolunteerRegistrationPage from './pages/VolunteerRegistrationPage'
// import MemberManagementPage from './pages/MemberManagementPage'
// import Header from './components/Header'
// import Sidebar from './components/Sidebar'
// import { LanguageProvider } from './contexts/LanguageContext'
// import { AppProvider } from './contexts/AppContext'
// import { ContentProvider } from './contexts/ContentContext'
// import MemberDetailPage from './pages/MemberDetailPage'
// import GalleryManagementPage from './pages/GalleryManagementPage'
// import BeneficiaryManagementPage from './pages/BeneficiaryManagementPage'
// import CertificateManagementPage from './pages/CertificateManagementPage'
// import MembershipApplicationsPage from './pages/MembershipApplicationsPage'
// import ProfilePage from './pages/ProfilePage'
// import SettingsPage from './pages/SettingsPage'
// import ContactPage from './pages/ContactPage'
// import Footer from './components/Footer'
// import Analytics from './components/Analytics'
// import WhatsAppButton from './components/WhatsAppButton'
// import TermsPage from './pages/TermsPage'
// import PrivacyPage from './pages/PrivacyPage'
// import BeneficiaryRegistrationPage from './pages/BeneficiaryRegistrationPage'
// import NotFoundPage from './pages/NotFoundPage'
// import VolunteerEvents from './components/VolunteerEvents'
// import MyTasks from './components/MyTasks'
// import ProjectDetails from './pages/ProjectDetails'

// // Main App Component with Sidebar Logic
// const AppContent = () => {
//   const [activeTab, setActiveTab] = useState('dashboard')
//   const [currentUser, setCurrentUser] = useState(null)

//   return (
//     <AppProvider value={{ currentUser, setCurrentUser }}>
//       <Router>
//         <Routes>
//           <Route path="/" element={
//             <div className="min-h-screen bg-gray-50">
//               <Home />
//             </div>
//           } />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/FundRaising" element={<FundRaising />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/membership" element={<MembershipApplicationPage />} />
//           <Route path="/donor-registration" element={<DonorRegistrationPage />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/volunteer-registration" element={<VolunteerRegistrationPage />} />
//           <Route path="/volunteer-management" element={<VolunteerManagementPage />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/volunteer-detail/:id" element={<VolunteerDetailPage />} />
//           <Route path="/member-management" element={<MemberManagementPage />} />
//           <Route path="/member-detail/:id" element={<MemberDetailPage />} />
//           <Route path="/membership-applications" element={<MembershipApplicationsPage />} />
//           <Route path="/gallery-management" element={<GalleryManagementPage />} />
//           <Route path="/beneficiary-management" element={<BeneficiaryManagementPage />} />
//           <Route path="/certificate-management" element={<CertificateManagementPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/settings" element={<SettingsPage />} />
//           <Route path="/terms" element={<TermsPage />} />
//           <Route path="/privacy" element={<PrivacyPage />} />
//           <Route path="/beneficiary-registration" element={<BeneficiaryRegistrationPage />} />
//           <Route path="*" element={<NotFoundPage />} />
//            <Route path ="/VolunteerEvents" element={<VolunteerEvents/>} />
//            <Route path ="/ProjectDetails" element={<ProjectDetails/>} />

//            <Route path ="/MyTasks" element={<MyTasks/>} />

//         </Routes>
//       </Router>
//     </AppProvider>
//   )
// }

// function App() {
//   return (
//     <LanguageProvider>
//       <ContentProvider>
//         <Analytics />
//         <AppContent />
//       </ContentProvider>
//     </LanguageProvider>
    
//   )
// }

// export default App
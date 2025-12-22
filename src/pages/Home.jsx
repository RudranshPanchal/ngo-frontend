import React from 'react'
import Header from '../components/Header'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import MissionVisionSection from './MissionVisionSection'
import WomenEmpowermentSection from './WomenEmpowermentSection'
import TeamSection from './TeamSection'
import ImpactStorySection from './ImpactStorySection'
import GallerySection from './GallerySection'
import ContactSection from './ContactSection'
import Footer from './Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const Home = () => {
  return (
    <div>
        <Header/>
        <HeroSection />
        <AboutSection />
        <MissionVisionSection />
        <WomenEmpowermentSection />
        <TeamSection />
        <ImpactStorySection />
        <GallerySection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
        {/* <Header />
      <main className="flex-1">
        <ProjectsSection />
        <TestimonialsSection />
        <TeamSection />
        <VolunteerSection />
        <DonationSection />
        <NewsSection />
        <NewsletterSection />
      </main> */}
      {/*  */}
    </div>
  )
}

export default Home
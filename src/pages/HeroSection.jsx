import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button.jsx';
import { ArrowRight, Users, Award, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import api from "../config/api";

const HeroSection = () => {
  const { language, t } = useLanguage();

  // Backend se aane wali images
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();
  const handeClick = () => {};

  // -------------------------
  // 1️⃣ Fetch Gallery From Backend
  // -------------------------
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await api.get("/api/gallery/getAllGallery");
        let backendImages = [];

        res.data.data.forEach(item => {
          item.galleryImages.forEach(img => backendImages.push(img));
        });

        if (backendImages.length > 0) {
          setImages(backendImages);
        }
      } catch (error) {
        console.log("Hero image fetch error:", error);
      }
    };

    loadGallery();
  }, []);

  // Auto Slide
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  const goToPrevious = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(prev =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh]">

          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Where Women Lead
                <span className="text-purple-600"> Society</span>
                <span className="block">
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                    Thrives
                  </span>
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                Together, we build a future where every woman can learn, earn, and lead with confidence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">

              <a href="#projects">
                <Button
                  onClick={() => handeClick(navigate('/ProjectDetails'))}
                  size="lg"
                  variant="outline"
                  className="w-full border border-purple-600 cursor-pointer text-purple-600 hover:bg-purple-100 hover:text-black px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-lg bg-white"
                >
                  Donate Now
                </Button>
              </a>

              <Link to="/volunteer-registration" className="w-full">
                <Button
                  onClick={() => handeClick()}
                  size="lg"
                  className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer text-white px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-lg"
                >
                  Volunteer With Us
                </Button>
              </Link>

              <Link to="/beneficiary-registration" className="w-full">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border border-orange-500 cursor-pointer text-orange-600 hover:bg-orange-100 hover:text-black px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-lg bg-white"
                >
                  Get Support
                </Button>
              </Link>

              <a href="#about" className="w-full">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border border-gray-500 cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-black px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-lg bg-white transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    const aboutSection = document.getElementById('about');
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                    }
                  }}
                >
                  Know More
                </Button>
              </a>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] order-first lg:order-last">

            <div className="bg-gradient-to-br from-purple-600 to-orange-500 rounded-2xl lg:rounded-3xl p-3 lg:p-4 h-full relative overflow-hidden">

              <div className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden">

                {images.length > 0 ? (
                  <img 
                    src={images[currentImageIndex]} 
                    alt="slider"
                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <button
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>

                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 
                        ${index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

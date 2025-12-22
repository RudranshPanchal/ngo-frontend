// import React, { useState, useEffect } from 'react';
// import { Card, CardContent } from '../components/ui/card.jsx';
// import img1 from '../assets/women-empowerment/img1.jpg';
// import img2 from '../assets/women-empowerment/img2.jpg';
// import img3 from '../assets/women-empowerment/img3.jpg';
// import img4 from '../assets/women-empowerment/img4.jpg';
// import img5 from '../assets/women-empowerment/img5.jpg';
// import img6 from '../assets/women-empowerment/img6.jpg';
// import img7 from '../assets/women-empowerment/img7.jpg';
// import img8 from '../assets/women-empowerment/img8.jpg';
// import img9 from '../assets/women-empowerment/img9.jpg';
// import img10 from '../assets/women-empowerment/img10.jpg';
// import img11 from '../assets/women-empowerment/img11.jpg';

// const GallerySection = () => {
//   const [showAll, setShowAll] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
    
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const allImages = [
//     { id: 1, src: img1, alt: 'Women Empowerment Workshop' },
//     { id: 2, src: img2, alt: 'Entrepreneurship Program' },
//     { id: 3, src: img3, alt: 'Health & Wellness Session' },
//     { id: 4, src: img4, alt: 'Leadership Training' },
//     { id: 5, src: img5, alt: 'Community Outreach' },
//     { id: 6, src: img6, alt: 'Skill Development' },
//     { id: 7, src: img7, alt: 'Education Program' },
//     { id: 8, src: img8, alt: 'Success Stories' },
//     { id: 9, src: img9, alt: 'Training Session' },
//     { id: 10, src: img10, alt: 'Community Meeting' },
//     { id: 11, src: img11, alt: 'Achievement Ceremony' },
//     { id: 12, src: img1, alt: 'Women Leadership Program' }
//   ];

//   const displayedImages = showAll ? allImages : (isMobile ? allImages.slice(0, 2) : allImages.slice(0, 8));


//   return (
//     <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Gallery</h2>
//           <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
//             Witness the transformative journey of women empowerment through our programs and initiatives
//           </p>
//         </div>

//         {/* Gallery Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
//           {displayedImages.map((image) => (
//             <Card 
//               key={image.id} 
//               className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//             >
//               <CardContent className="p-0">
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={image.src}
//                     alt={image.alt}
//                     className="w-full h-48 sm:h-56 md:h-64 object-cover hover:brightness-110 transition-all duration-300"
//                     onError={(e) => {
//                       e.target.src = '/placeholder-gallery.jpg'; // Fallback image
//                     }}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* View More Button */}
//         <div className="text-center mt-8 sm:mt-12">
//           <button 
//             onClick={() => setShowAll(!showAll)}
//             className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
//           >
//             {showAll ? 'Show Less' : 'View More Photos'}
//           </button>
//         </div>
//       </div>

//     </section>
//   );
// };

// export default GallerySection;

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card.jsx';
import api from "../config/api";

const GallerySection = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allImages, setAllImages] = useState([]);

  // -------------------------
  // 1️⃣ Check Mobile Screen
  // -------------------------
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // -------------------------
  // 2️⃣ Fetch Gallery From Backend
  // -------------------------
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await api.get("/api/gallery/getAllGallery");

        // Convert backend structure to images array
        let imagesArr = [];

        res.data.data.forEach(item => {
          item.galleryImages.forEach(imgUrl => {
            imagesArr.push({
              id: Math.random(),
              src: imgUrl,
              alt: item.imageCaption || "Gallery Image"
            });
          });
        });

        setAllImages(imagesArr);
      } catch (error) {
        console.log("Error fetching gallery:", error);
      }
    };

    loadGallery();
  }, []);

  // -------------------------
  // 3️⃣ Display Logic
  // -------------------------
  const displayedImages = showAll
    ? allImages
    : (isMobile ? allImages.slice(0, 2) : allImages.slice(0, 8));


  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Gallery
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Witness the transformative journey of women empowerment through our programs and initiatives
          </p>
        </div>

        {/* Gallery Grid */}
        {/* Gallery Grid */}
<div className="w-full max-w-full px-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
  {displayedImages.map((image) => (
    <Card
      key={image.id}
      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-48 sm:h-56 md:h-64 object-cover hover:brightness-110 transition-all duration-300"
            onError={(e) => {
              e.target.src = '/placeholder-gallery.jpg';
            }}
          />
        </div>
      </CardContent>
    </Card>
  ))}
</div>

        {/* View More Button */}
        {allImages.length > 8 && (
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              {showAll ? 'Show Less' : 'View More Photos'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;

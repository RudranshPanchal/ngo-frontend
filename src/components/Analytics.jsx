import { useEffect } from 'react';

// Google Analytics 4 (GA4) tracking
export const initGA4 = () => {
  // Replace 'G-XXXXXXXXXX' with your actual GA4 measurement ID
  const GA4_MEASUREMENT_ID = import.meta.env?.VITE_GA4_MEASUREMENT_ID;
  
  // Only initialize if measurement ID is provided
  if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.log('GA4 Measurement ID not configured, skipping initialization');
    return;
  }
  
  // Load GA4 script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize GA4
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_MEASUREMENT_ID);
};

// Facebook Pixel tracking
export const initFacebookPixel = () => {
  // Replace 'YOUR_PIXEL_ID' with your actual Facebook Pixel ID
  const FACEBOOK_PIXEL_ID = import.meta.env?.VITE_FACEBOOK_PIXEL_ID;
  
  // Only initialize if pixel ID is provided
  if (!FACEBOOK_PIXEL_ID || FACEBOOK_PIXEL_ID === 'YOUR_PIXEL_ID') {
    console.log('Facebook Pixel ID not configured, skipping initialization');
    return;
  }
  
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', FACEBOOK_PIXEL_ID);
  window.fbq('track', 'PageView');
};

// Analytics component to initialize tracking
const Analytics = () => {
  return null; // Disabled to prevent warnings
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
  
  if (window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Track page views
export const trackPageView = (pagePath) => {
  if (window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: pagePath,
    });
  }
};

export default Analytics;
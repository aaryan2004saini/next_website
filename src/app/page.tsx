'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFolder, faUser, faEnvelope, faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/Header';
import VRModal from '@/components/VRModal';
import Cursor from '@/components/Cursor';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [showVRModal, setShowVRModal] = useState(false);
  const [panoramaPosition, setPanoramaPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [clickedIcon, setClickedIcon] = useState<number | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Define icons first, before any functions that use it
  const icons = [
    { icon: faHouse, label: "Home" },
    { icon: faFolder, label: "Portfolio" },
    { icon: faUser, label: "About" },
    { icon: faEnvelope, label: "Contact" },
    { icon: faVrCardboard, label: "Services" },
  ];

  useEffect(() => {
    // Listen for custom events from the bottom navbar
    const handleHideCustomCursor = () => {
      setCursorVisible(false);
    };
    
    const handleShowCustomCursor = () => {
      setCursorVisible(true);
    };
    
    window.addEventListener('hideCustomCursor', handleHideCustomCursor);
    window.addEventListener('showCustomCursor', handleShowCustomCursor);
    
    return () => {
      window.removeEventListener('hideCustomCursor', handleHideCustomCursor);
      window.removeEventListener('showCustomCursor', handleShowCustomCursor);
    };
  }, []);

  const handleMouseEnter = useCallback((element: string) => {
    setHoveredElement(element);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null);
  }, []);

  const handleVRButtonClick = useCallback(() => {
    setShowVRModal(true);
  }, []);

  const handleIconHover = (index: number | null) => {
    setHoveredIcon(index);
  };
  
  const handleIconClick = (index: number | null) => {
    // Handle icon click based on icon type
    if (index === null) return;
    
    // Toggle active state of the clicked icon
    const newClickedIcon = index === clickedIcon ? null : index;
    setClickedIcon(newClickedIcon);

    // Route to appropriate section or trigger functionality
    if (index === 0) {
      // Home icon
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveTab('home');
    } else if (index === 1) {
      // Portfolio icon
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveTab('portfolio');
    } else if (index === 2) {
      // About icon
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveTab('about');
    } else if (index === 3) {
      // Contact icon
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveTab('contact');
    } else if (index === 4) {
      // Theme toggle - you can implement theme switching here
    }
  };

  // Helper function to uniformly apply text interactions
  const withTextInteraction = (Component: React.ElementType, props: any = {}) => (
    <Component
      {...props}
      onMouseEnter={() => handleMouseEnter("text")}
      onMouseLeave={handleMouseLeave}
    />
  );

  const sections = [
    {
      id: 'home',
      content: (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide min-h-[80vh] flex flex-col justify-center"
        >
          <div className="glass-morphism p-8 mb-10">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight" 
              onMouseEnter={() => handleMouseEnter("text")} 
              onMouseLeave={handleMouseLeave}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
              }}
            >
              Immersive Architectural Visualization
            </motion.h1>
            <motion.p 
              className="text-xl text-white/80 mb-10 max-w-3xl" 
              onMouseEnter={() => handleMouseEnter("text")} 
              onMouseLeave={handleMouseLeave}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
              }}
            >
              Experience your architectural designs in stunning detail before they're built. Our cutting-edge 3D visualization brings your vision to life with photorealistic quality.
            </motion.p>
            
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="glass-button px-8 py-4 bg-emerald-500/20 hover:bg-emerald-500/30 text-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={() => {
                  setShowVRModal(true);
                }}
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.4 } }
                }}
              >
                Experience VR Demo
              </motion.button>
              <motion.button
                className="glass-button px-8 py-4 bg-blue-500/20 hover:bg-blue-500/30 text-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={() => {
                  const portfolioSection = document.getElementById('portfolio');
                  if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.5 } }
                }}
              >
                View Projects
              </motion.button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <div className="glass-morphism p-6 flex flex-col items-center text-center" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="w-16 h-16 bg-emerald-500/20 p-4 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Real-time Rendering</h3>
              <p className="text-white/70" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Interactive walkthroughs with photorealistic quality powered by Unreal Engine 5.</p>
            </div>
            
            <div className="glass-morphism p-6 flex flex-col items-center text-center" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="w-16 h-16 bg-blue-500/20 p-4 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Global Access</h3>
              <p className="text-white/70" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Share your visualizations with clients anywhere in the world.</p>
            </div>
            
            <div className="glass-morphism p-6 flex flex-col items-center text-center" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="w-16 h-16 bg-purple-500/20 p-4 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Mobile Compatible</h3>
              <p className="text-white/70" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Experience immersive visualizations on any device, including mobile phones and tablets.</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-16 relative">
            <div className="vr-experience w-full md:w-3/4 lg:w-2/3 h-[300px] md:h-[400px] relative overflow-hidden rounded-xl bg-black/20">
              <img 
                src="/assets/showcase-1.jpg" 
                alt="VR Experience" 
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="p-8">
                  <h3 className="text-2xl md:text-3xl font-medium mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Virtual Reality Experience
                  </h3>
                  <p className="text-white/70 mb-6 max-w-md" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Try our immersive VR demo and explore architectural spaces like never before. Feel the scale, lighting, and atmosphere of your future project.
                  </p>
                  <button 
                    className="glass-button px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30"
                    onClick={() => setShowVRModal(true)}
                    onMouseEnter={() => handleMouseEnter("button")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Launch Demo
                  </button>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <div className="text-xs text-white/70">Experience Available</div>
              </div>
            </div>
          </div>
        </motion.section>
      ),
    },
    {
      id: 'portfolio',
      content: (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide"
        >
          <div className="glass-morphism p-8 mb-10">
            <h2 className="section-title" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Featured Projects
            </h2>
            <p className="section-description" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Explore our latest architectural visualizations created with Unreal Engine 5
            </p>
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            {/* Card 1: 360° Panoramic Views - LARGER card (top-left) */}
            <motion.div
              className="project-card col-span-12 md:col-span-8 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onMouseEnter={() => handleMouseEnter("button")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative aspect-[16/9]">
                <img
                  src="/assets/panoramic-view.jpg"
                  alt="360° Panoramic Views"
                  className="project-card-image"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    360° Panoramic Views
                  </h3>
                  <p className="text-white/70 text-base mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Fully interactive experiences for immersive client engagement. Explore spaces as if you were there.
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-xs bg-emerald-900/30 text-emerald-200 py-1 px-2 rounded" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      VR Ready
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Surrounding Information - SMALLER card */}
            <motion.div
              className="project-card col-span-12 md:col-span-4 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onMouseEnter={() => handleMouseEnter("button")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative aspect-[3/4]">
                <img
                  src="/assets/surrounding-info.jpg"
                  alt="Surrounding Information"
                  className="project-card-image"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Surrounding Information
                  </h3>
                  <p className="text-white/70 text-sm mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Detailed surrounding area information with interactive maps.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs bg-blue-900/30 text-blue-200 py-1 px-2 rounded" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Interactive Map
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Archviz Application - SMALLER card */}
            <motion.div
              className="project-card col-span-12 md:col-span-4 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onMouseEnter={() => handleMouseEnter("button")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative aspect-[3/4]">
                <img
                  src="/assets/archviz-app.jpg"
                  alt="Archviz Application"
                  className="project-card-image"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Archviz Application
                  </h3>
                  <p className="text-white/70 text-sm mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Cinematic video tours showcasing projects dynamically.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs bg-emerald-900/30 text-emerald-200 py-1 px-2 rounded" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Unreal Engine 5
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Real-Time Rendering - LARGER card (bottom-right) */}
            <motion.div
              className="project-card col-span-12 md:col-span-8 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onMouseEnter={() => handleMouseEnter("button")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative aspect-[16/9]">
                <img
                  src="/assets/realtime-rendering.jpg"
                  alt="Real-Time Rendering"
                  className="project-card-image"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Real-Time Rendering
                  </h3>
                  <p className="text-white/70 text-base mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    High-quality static images for marketing, real estate, and presentations with photorealistic details.
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-xs bg-purple-900/30 text-purple-200 py-1 px-2 rounded" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Photorealistic
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      ),
    },
    {
      id: 'services',
      content: (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide"
        >
          <div className="glass-morphism p-8 mb-10">
            <h2 className="section-title" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Services
            </h2>
            <p className="section-description" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              At Flik, we specialize in high-end architectural visualization, delivering stunning, immersive, and interactive experiences. Our services are designed to bring your vision to life with precision and realism.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1: Photorealistic Rendering */}
            <div className="about-card h-full" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src="/assets/photorealistic-rendering.jpg" 
                  alt="Photorealistic Rendering" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Photorealistic Rendering
              </h3>
              <p className="text-white/70" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                High-quality static images for marketing, real estate, and presentations.
              </p>
            </div>
            
            {/* Service 2: 3D Walkthrough & Animation */}
            <div className="about-card h-full" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src="/assets/3d-walkthrough.jpg" 
                  alt="3D Walkthrough & Animation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                3D Walkthrough & Animation
              </h3>
              <p className="text-white/70" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Cinematic video tours showcasing the project dynamically.
              </p>
            </div>
            
            {/* Service 3: 360° Virtual Tours & VR */}
            <div className="about-card h-full" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src="/assets/360-virtual-tours.jpg" 
                  alt="360° Virtual Tours & VR" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                360° Virtual Tours & VR
              </h3>
              <p className="text-white/70" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Fully interactive experiences for immersive client engagement.
              </p>
            </div>
            
            {/* Service 4: Real-time Interactive Experiences */}
            <div className="about-card h-full" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src="/assets/interactive-experiences.jpg" 
                  alt="Real-time Interactive Experiences" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Real-time Interactive Experiences
              </h3>
              <p className="text-white/70" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Unreal Engine or Unity-based interactive models where clients can explore spaces freely.
              </p>
            </div>
          </div>
          
          <div className="mt-16 glass-morphism p-8">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-medium mb-6" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Our Technology Solutions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  <div className="w-16 h-16 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-2">AI-Powered Optimization</h4>
                  <p className="text-white/70 text-sm">Enhance performance with real-time AI-driven adjustments.</p>
                </div>
                
                <div className="flex flex-col items-center" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  <div className="w-16 h-16 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-2">Ultra-Responsive Design</h4>
                  <p className="text-white/70 text-sm">Experience seamless interactions across all devices.</p>
                </div>
                
                <div className="flex flex-col items-center" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  <div className="w-16 h-16 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-2">Secure & Scalable</h4>
                  <p className="text-white/70 text-sm">Built with enterprise-level security and infinite scalability.</p>
                </div>
              </div>
              
              <button 
                className="glass-button px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 mt-4"
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Learn More About Our Services
              </button>
            </div>
          </div>
        </motion.section>
      ),
    },
    {
      id: 'about',
      content: (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide"
        >
          <div className="glass-morphism p-8 mb-10">
            <h2 className="section-title" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              About Flik
            </h2>
            <p className="section-description" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              At Flik, we bring cutting-edge technology to architectural visualization, ensuring high performance, seamless interaction, and top-tier security. Our premium solutions are designed to enhance your workflow, improve client engagement, and provide unparalleled efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-morphism p-8">
              <h3 className="text-2xl font-medium mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Our Approach
              </h3>
              <p className="mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                We bring architecture to life through cutting-edge visualization techniques. Explore our portfolio and immerse yourself in stunning, lifelike experiences.
              </p>
              <p className="mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Step into the world of Flik, where creativity meets precision. Our Photo Gallery showcases breathtaking high-resolution renders, capturing every intricate detail with stunning realism.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                  <div className="stats bg-black/40 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-4xl font-bold text-emerald-400">250+</h4>
                    <p className="text-sm text-white/70">Completed Projects</p>
                  </div>
                </div>
                <div onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                  <div className="stats bg-black/40 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-4xl font-bold text-blue-400">5+</h4>
                    <p className="text-sm text-white/70">Years Experience</p>
                  </div>
                </div>
                <div onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                  <div className="stats bg-black/40 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-4xl font-bold text-purple-400">100%</h4>
                    <p className="text-sm text-white/70">Client Satisfaction</p>
                  </div>
                </div>
                <div onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                  <div className="stats bg-black/40 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-4xl font-bold text-pink-400">50+</h4>
                    <p className="text-sm text-white/70">Global Clients</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="about-card" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center p-6">
                    <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Customized Solutions</h3>
                    <p className="text-sm text-white/70 mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Tailored to your specific project needs
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="about-card" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center p-6">
                    <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Modern Technology</h3>
                    <p className="text-sm text-white/70 mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Using the latest visualization tools
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="about-card" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center p-6">
                    <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Expert Team</h3>
                    <p className="text-sm text-white/70 mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Industry professionals with years of experience
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="about-card" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center p-6">
                    <svg className="w-16 h-16 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Fast Delivery</h3>
                    <p className="text-sm text-white/70 mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Quick turnaround for time-sensitive projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 glass-morphism p-8">
            <h3 className="text-2xl font-medium mb-6 text-center" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Our Visual Showcase
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="about-card p-0 overflow-hidden" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <img 
                  src="/assets/showcase-1.jpg" 
                  alt="Visual Showcase" 
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="about-card p-0 overflow-hidden" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <img 
                  src="/assets/showcase-2.jpg" 
                  alt="Visual Showcase" 
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="about-card p-0 overflow-hidden" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <img 
                  src="/assets/showcase-3.jpg" 
                  alt="Visual Showcase" 
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-white/70" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Experience architectural visualization like never before—crafted with passion, innovation, and an unwavering commitment to excellence.
              </p>
            </div>
          </div>
        </motion.section>
      ),
    },
    {
      id: 'contact',
      content: (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide"
        >
          <div className="glass-morphism p-8 mb-10">
            <h2 className="section-title" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Contact Us
            </h2>
            <p className="section-description" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Drop us a line or two, we are open for creative minds and collaborations!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="glass-morphism p-8">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Your Name
                    </label>
                <input
                  type="text"
                      id="name"
                      className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                      placeholder="John Doe"
                      onMouseEnter={() => handleMouseEnter("button")}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Your Email
                    </label>
                <input
                  type="email"
                      id="email"
                      className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                      placeholder="name@example.com"
                      onMouseEnter={() => handleMouseEnter("button")}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                      placeholder="How can we help?"
                      onMouseEnter={() => handleMouseEnter("button")}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                      placeholder="Let us know how we can help you..."
                      onMouseEnter={() => handleMouseEnter("button")}
                      onMouseLeave={handleMouseLeave}
                    ></textarea>
                  </div>
                  <motion.button
                    className="glass-button px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
              >
                Send Message
                  </motion.button>
            </form>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="glass-morphism p-8 h-full">
                <h3 className="text-2xl font-medium mb-6" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    <div className="bg-emerald-500/20 p-3 rounded-lg mt-1">
                      <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Our Location</h4>
                      <p className="text-white/70 text-sm">
                        123 Design Studio, Creative District<br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    <div className="bg-blue-500/20 p-3 rounded-lg mt-1">
                      <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Email Us</h4>
                      <p className="text-white/70 text-sm">
                        info@flikvisuals.com<br />
                        support@flikvisuals.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    <div className="bg-purple-500/20 p-3 rounded-lg mt-1">
                      <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Call Us</h4>
                      <p className="text-white/70 text-sm">
                        +1 (555) 123-4567<br />
                        Mon-Fri: 9AM - 6PM
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Follow Us
                  </h4>
                  <div className="flex gap-4">
                    <a 
                      href="#" 
                      className="bg-black/40 p-3 rounded-lg hover:bg-gray-700/40 transition-colors duration-300"
                      onMouseEnter={() => handleMouseEnter("button")} 
                      onMouseLeave={handleMouseLeave}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="bg-black/40 p-3 rounded-lg hover:bg-gray-700/40 transition-colors duration-300"
                      onMouseEnter={() => handleMouseEnter("button")} 
                      onMouseLeave={handleMouseLeave}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="bg-black/40 p-3 rounded-lg hover:bg-gray-700/40 transition-colors duration-300"
                      onMouseEnter={() => handleMouseEnter("button")} 
                      onMouseLeave={handleMouseLeave}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-center text-white/50 text-sm">
            <div onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              <p>© 2023 Flik Visuals. All rights reserved.</p>
            </div>
            <div className="flex gap-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </motion.section>
      ),
    },
  ];

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5" />
        <div className="absolute -top-[30%] -right-[20%] w-[80%] h-[80%] rounded-full bg-emerald-900/10 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[20%] w-[80%] h-[80%] rounded-full bg-emerald-900/10 blur-3xl" />
      </div>

      {/* Custom cursor as a separate component */}
      <Cursor 
        hoveredElement={hoveredElement} 
        hoveredIcon={hoveredIcon} 
        cursorVisible={cursorVisible}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6">
        <Header onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        {sections.map((section) => (
          <div key={section.id} id={section.id}>
            {section.content}
          </div>
        ))}
      </div>

      {/* VR Modal */}
      <VRModal
        showVRModal={showVRModal}
        setShowVRModal={setShowVRModal}
        panoramaPosition={panoramaPosition}
        setPanoramaPosition={setPanoramaPosition}
        zoom={zoom}
        setZoom={setZoom}
      />

      {/* Floating bottom navigation */}
      <div className="bottom-navigation">
        <div className={`navbar-container ${clickedIcon !== null ? 'navbar-expanded' : ''}`}>
          <div className="navbar-buttons-container">
            {icons.map((item, index) => (
              <button
                key={index}
                className={`nav-button ${clickedIcon === index ? 'active' : ''}`}
                onMouseEnter={() => handleIconHover(index)}
                onMouseLeave={() => handleIconHover(null)}
                onClick={() => handleIconClick(index)}
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                <span className="nav-button-label">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

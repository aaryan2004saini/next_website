'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVrCardboard, faHouse, faFolder, faUser, faEnvelope, faSun } from '@fortawesome/free-solid-svg-icons';
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
    { icon: faSun, label: "Theme" },
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
    setClickedIcon(index === clickedIcon ? null : index);

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
    
    // Update container width for accessibility
    const container = document.querySelector('.navbar-container');
    if (container) {
      if (index === clickedIcon) {
        // If toggling off, remove the expanded class
        container.classList.remove('navbar-expanded');
      } else {
        // If activating, add the expanded class
        container.classList.add('navbar-expanded');
      }
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
          className="min-h-screen flex items-center section-padding"
        >
          <div className="glass-morphism p-8 w-full max-w-4xl mx-auto">
            <div 
              className="text-5xl md:text-7xl font-light mb-6"
              onMouseEnter={() => handleMouseEnter("text")}
              onMouseLeave={handleMouseLeave}
            >
              <h1>
                Next-Gen Real Estate Visualization
              </h1>
            </div>
            <p 
              className="text-xl text-white/70 mb-8"
              onMouseEnter={() => handleMouseEnter("text")}
              onMouseLeave={handleMouseLeave}
            >
              Experience properties like never before with our Unreal Engine 5 powered
              visualizations and immersive VR experiences.
            </p>
            <button 
              className="glass-button px-8 py-4"
              onClick={() => setShowVRModal(true)}
              onMouseEnter={() => handleMouseEnter("button")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faVrCardboard} className="mr-2" />
              Experience VR Demo
            </button>
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
          className="min-h-screen section-padding"
        >
          <div className="glass-morphism p-8 mb-12">
            <h2 
              className="text-4xl font-light mb-4"
              onMouseEnter={() => handleMouseEnter("text")}
              onMouseLeave={handleMouseLeave}
            >
              Featured Projects
            </h2>
            <p 
              className="text-white/70"
              onMouseEnter={() => handleMouseEnter("text")}
              onMouseLeave={handleMouseLeave}
            >
              Explore our latest architectural visualizations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                className="glass-morphism overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={`https://source.unsplash.com/random/800x600?architecture,interior&sig=${item}`}
                    alt={`Project ${item}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 
                      className="text-xl font-medium"
                      onMouseEnter={() => handleMouseEnter("text")}
                      onMouseLeave={handleMouseLeave}
                    >
                      Project Title
                    </h3>
                    <p 
                      className="text-white/70"
                      onMouseEnter={() => handleMouseEnter("text")}
                      onMouseLeave={handleMouseLeave}
                    >
                      Location
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
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
          className="min-h-screen flex items-center section-padding"
        >
          <div className="glass-morphism p-8 w-full max-w-4xl mx-auto">
            <h2 
              className="text-4xl font-light mb-6"
              onMouseEnter={() => handleMouseEnter("text")}
              onMouseLeave={handleMouseLeave}
            >
              About Us
            </h2>
            <p 
              className="text-white/70 mb-8"
              onMouseEnter={() => handleMouseEnter("text")}
              onMouseLeave={handleMouseLeave}
            >
              We are a team of passionate 3D artists and developers pushing the boundaries
              of architectural visualization using Unreal Engine 5. Our mission is to
              transform how people experience unbuilt spaces through photorealistic
              renders and immersive VR experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                className="glass-button p-6"
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
              >
                <h3 
                  className="text-xl mb-4"
                  onMouseEnter={() => handleMouseEnter("text")}
                  onMouseLeave={handleMouseLeave}
                >
                  Our Approach
                </h3>
                <p 
                  className="text-white/70"
                  onMouseEnter={() => handleMouseEnter("text")}
                  onMouseLeave={handleMouseLeave}
                >
                  Using cutting-edge technology and artistic expertise to create
                  stunning visualizations that help clients make informed decisions.
                </p>
              </div>
              <div 
                className="glass-button p-6"
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
              >
                <h3 
                  className="text-xl mb-4"
                  onMouseEnter={() => handleMouseEnter("text")}
                  onMouseLeave={handleMouseLeave}
                >
                  Technology
                </h3>
                <p 
                  className="text-white/70"
                  onMouseEnter={() => handleMouseEnter("text")}
                  onMouseLeave={handleMouseLeave}
                >
                  Powered by Unreal Engine 5, featuring Lumen, Nanite, and
                  ray-traced reflections for unprecedented realism.
                </p>
              </div>
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
          className="min-h-screen flex items-center section-padding"
        >
          <div className="glass-morphism p-8 w-full max-w-4xl mx-auto">
            <div 
              className="text-4xl font-light mb-6"
              onMouseEnter={() => handleMouseEnter("text")}
              onMouseLeave={handleMouseLeave}
            >
              <h2>
                Get in Touch
              </h2>
            </div>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full glass-button px-6 py-4 bg-transparent"
                  onFocus={() => handleMouseEnter("text")}
                  onBlur={handleMouseLeave}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full glass-button px-6 py-4 bg-transparent"
                  onFocus={() => handleMouseEnter("text")}
                  onBlur={handleMouseLeave}
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full glass-button px-6 py-4 bg-transparent resize-none"
                  onFocus={() => handleMouseEnter("text")}
                  onBlur={handleMouseLeave}
                />
              </div>
              <button 
                type="submit" 
                className="glass-button px-8 py-4"
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
              >
                Send Message
              </button>
            </form>
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
        <div className="navbar-container">
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

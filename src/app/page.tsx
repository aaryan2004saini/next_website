'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import VRModal from '@/components/VRModal';

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

  const handleMouseEnter = useCallback((element: string) => {
    setHoveredElement(element);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null);
  }, []);

  const handleVRButtonClick = useCallback(() => {
    setShowVRModal(true);
  }, []);

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
            <h1 className="text-5xl md:text-7xl font-light mb-6">
              Next-Gen Real Estate Visualization
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Experience properties like never before with our Unreal Engine 5 powered
              visualizations and immersive VR experiences.
            </p>
            <button 
              className="glass-button px-8 py-4"
              onMouseEnter={() => handleMouseEnter("button")}
              onMouseLeave={handleMouseLeave}
              onClick={handleVRButtonClick}
            >
              <FontAwesomeIcon icon={faVrCardboard} className="mr-2" />
              Enter VR Experience
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
            <h2 className="text-4xl font-light mb-4">Featured Projects</h2>
            <p className="text-white/70">Explore our latest architectural visualizations</p>
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
                    <h3 className="text-xl font-medium">Project Title</h3>
                    <p className="text-white/70">Location</p>
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
            <h2 className="text-4xl font-light mb-6">About Us</h2>
            <p className="text-white/70 mb-8">
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
                <h3 className="text-xl mb-4">Our Approach</h3>
                <p className="text-white/70">
                  Using cutting-edge technology and artistic expertise to create
                  stunning visualizations that help clients make informed decisions.
                </p>
              </div>
              <div 
                className="glass-button p-6"
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
              >
                <h3 className="text-xl mb-4">Technology</h3>
                <p className="text-white/70">
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
            <h2 className="text-4xl font-light mb-6">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full glass-button px-6 py-4 bg-transparent"
                  onMouseEnter={() => handleMouseEnter("text")}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full glass-button px-6 py-4 bg-transparent"
                  onMouseEnter={() => handleMouseEnter("text")}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full glass-button px-6 py-4 bg-transparent resize-none"
                  onMouseEnter={() => handleMouseEnter("text")}
                  onMouseLeave={handleMouseLeave}
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

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6">
        <Header onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
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
    </div>
  );
}

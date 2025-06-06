'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFolderOpen, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cursorVariants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      border: '2px solid rgba(255, 255, 255, 0.7)',
      backgroundColor: 'transparent',
    },
    text: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      height: '64px',
      width: '2px',
      backgroundColor: 'white',
    },
    button: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      backgroundColor: 'white',
      mixBlendMode: 'difference',
    },
  };

  const navItems = [
    { icon: faHome, label: 'Home', id: 'home' },
    { icon: faFolderOpen, label: 'Portfolio', id: 'portfolio' },
    { icon: faUser, label: 'About', id: 'about' },
    { icon: faEnvelope, label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <motion.div
        className="custom-cursor"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <div className="min-h-screen">
        {children}
        <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="glass-morphism px-6 py-4">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-lg" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
} 
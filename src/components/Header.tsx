'use client';

import { useState, useEffect } from 'react';
import ShineEffect from './ShineEffect';
import Image from 'next/image';

interface HeaderProps {
  onMouseEnter: (element: string) => void;
  onMouseLeave: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMouseEnter, onMouseLeave }) => {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative mb-12">
      <div className="glass-morphism p-6 md:p-8 relative overflow-hidden">
        <ShineEffect />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="relative">
              <div className="bg-gradient-to-r from-emerald-500/20 to-transparent blur-xl absolute inset-0"></div>
              <div
                className="relative"
                onMouseLeave={onMouseLeave}
              >
                <Image
                  src="/assets/flik-logo.png"
                  alt="Flik Logo"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div
                className="time-widget"
                onMouseEnter={() => onMouseEnter("text")}
                onMouseLeave={onMouseLeave}
              >
                <div className="h-8 w-8 bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p
                    className="opacity-70 text-xs"
                    onMouseEnter={() => onMouseEnter("text")}
                    onMouseLeave={onMouseLeave}
                  >
                    Based in
                  </p>
                  <p
                    className="font-medium"
                    onMouseEnter={() => onMouseEnter("text")}
                    onMouseLeave={onMouseLeave}
                  >
                    India
                  </p>
                </div>
              </div>
              <div
                className="time-widget"
                onMouseEnter={() => onMouseEnter("text")}
                onMouseLeave={onMouseLeave}
              >
                <div className="h-8 w-8 bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p
                    className="opacity-70 text-xs"
                    onMouseEnter={() => onMouseEnter("text")}
                    onMouseLeave={onMouseLeave}
                  >
                    Local time
                  </p>
                  <p
                    className="font-medium"
                    onMouseEnter={() => onMouseEnter("text")}
                    onMouseLeave={onMouseLeave}
                  >
                    {currentTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="time-widget"
              onMouseEnter={() => onMouseEnter("text")}
              onMouseLeave={onMouseLeave}
            >
              <div className="h-8 w-8 bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p
                  className="text-xl font-medium"
                  onMouseEnter={() => onMouseEnter("text")}
                  onMouseLeave={onMouseLeave}
                >
                  250K
                </p>
                <p
                  className="text-xs opacity-70"
                  onMouseEnter={() => onMouseEnter("text")}
                  onMouseLeave={onMouseLeave}
                >
                  @_flik.in_
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/20 bg-black/40 backdrop-blur-sm">
                <img
                  src="https://readdy.ai/api/search-image?query=modern%203D%20designer%20working%20with%20Unreal%20Engine%2C%20professional%20portrait%2C%20dark%20studio%20lighting%2C%20minimalist%20style%2C%20high-end%20photography%2C%20neutral%20background%2C%20professional%20attire%2C%20focused%20expression&width=200&height=200&seq=1&orientation=squarish"
                  alt="Designer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
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
    <header className="relative mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 animate-pulse"></div>
      <div className="backdrop-blur-xl bg-black/40 rounded-3xl p-8 border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10"></div>
        <ShineEffect />
        <div className="relative flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent blur-xl"></div>
              <div
                className="relative"
                onMouseEnter={() => onMouseEnter("text")}
                onMouseLeave={onMouseLeave}
              >
                <Image
                  src="/assets/flik-logo.png"
                  alt="Flik Logo"
                  width={150}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div
                className="text-white/90 text-sm backdrop-blur-xl bg-white/5 rounded-2xl px-6 py-3 border border-white/10"
                onMouseEnter={() => onMouseEnter("text")}
                onMouseLeave={onMouseLeave}
              >
                <p 
                  className="opacity-70"
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
              <div
                className="text-white/90 text-sm backdrop-blur-xl bg-white/5 rounded-2xl px-6 py-3 border border-white/10"
                onMouseEnter={() => onMouseEnter("text")}
                onMouseLeave={onMouseLeave}
              >
                <p 
                  className="opacity-70"
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

          <div className="flex items-center gap-8">
            <div
              className="text-white/90 backdrop-blur-xl bg-white/5 rounded-2xl px-6 py-3 border border-white/10"
              onMouseEnter={() => onMouseEnter("text")}
              onMouseLeave={onMouseLeave}
            >
              <p 
                className="text-2xl font-medium"
                onMouseEnter={() => onMouseEnter("text")}
                onMouseLeave={onMouseLeave}
              >
                250K
              </p>
              <p 
                className="text-sm opacity-70"
                onMouseEnter={() => onMouseEnter("text")}
                onMouseLeave={onMouseLeave}
              >
                @flikofficial
              </p>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-emerald-500/20 blur-md group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
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
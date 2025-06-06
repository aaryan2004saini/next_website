'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVrCardboard, faTimes, faPlus, faMinus, faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { images } from '@/utils/assets';

interface VRModalProps {
  showVRModal: boolean;
  setShowVRModal: (show: boolean) => void;
  panoramaPosition: { x: number; y: number };
  setPanoramaPosition: (position: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}

const VRModal: React.FC<VRModalProps> = ({
  showVRModal,
  setShowVRModal,
  panoramaPosition,
  setPanoramaPosition,
  zoom,
  setZoom,
}) => {
  const [isVRMode, setIsVRMode] = useState(false);

  const handlePanoramaMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      setPanoramaPosition({
        x: panoramaPosition.x + e.movementX,
        y: panoramaPosition.y + e.movementY,
      });
    }
  };

  const handleZoom = (delta: number) => {
    setZoom(Math.min(Math.max(0.5, zoom + delta * 0.1), 2));
  };

  if (!showVRModal) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black">
      <div
        className="relative w-full h-full overflow-hidden"
        onMouseMove={handlePanoramaMove}
        onWheel={(e) => handleZoom(Math.sign(-e.deltaY))}
      >
        <div className="relative w-full h-full">
          <div 
            className="w-full h-full absolute" 
            style={{
              transform: `translate(${panoramaPosition.x}px, ${panoramaPosition.y}px) scale(${zoom})`,
              transition: "transform 300ms ease"
            }}
          >
            <Image
              src={images.panoramicView}
              alt="360 Panorama"
              className="object-cover"
              fill
              sizes="100vw"
              priority
            />
          </div>
        </div>
        {/* Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <button
            className="px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md"
            onClick={() => setIsVRMode(!isVRMode)}
          >
            <FontAwesomeIcon
              icon={faVrCardboard}
              className={`mr-2 ${isVRMode ? 'text-emerald-400' : ''}`}
            />
            VR Mode
          </button>
          <button
            className="px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md"
            onClick={() => {
              setShowVRModal(false);
              setPanoramaPosition({ x: 0, y: 0 });
              setZoom(1);
              setIsVRMode(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Exit Experience
          </button>
        </div>
        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <button
            className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md flex items-center justify-center"
            onClick={() => handleZoom(1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md flex items-center justify-center"
            onClick={() => handleZoom(-1)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        {/* Touch Instructions */}
        <div className="absolute bottom-4 left-4 text-white/70 text-sm backdrop-blur-md bg-black/30 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faHandPointer} className="mr-2" />
          Drag to explore | Scroll to zoom
        </div>
      </div>
    </div>
  );
};

export default VRModal; 
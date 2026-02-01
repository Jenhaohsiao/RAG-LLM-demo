import React, { useState, useEffect } from 'react';

interface SplitLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

type MaximizeState = 'left' | 'right' | null;

const SplitLayout: React.FC<SplitLayoutProps> = ({ leftContent, rightContent }) => {
  // State
  const [isLocked, setIsLocked] = useState(false);
  const [maximized, setMaximized] = useState<MaximizeState>(null);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);

  // Width Calculation Logic
  // Default: Left 30%, Right 70% (As per requirements: "Hover Right defaults")
  // Hover Left: Left 70%, Right 30%
  // Hover Right: Left 30%, Right 70%
  
  const getLeftWidth = () => {
    if (maximized === 'left') return '100%';
    if (maximized === 'right') return '0%';
    
    if (isLocked) {
      return hoverSide === 'left' ? '70%' : '30%'; 
    }

    if (hoverSide === 'left') return '70%';
    // Default is Right 70% (Left 30%)
    return '30%';
  };

  // Determine the actual width to render
  const currentLeftWidth = getLeftWidth();
  
  // Icon handlers
  const toggleLock = () => setIsLocked(!isLocked);
  const maximizeLeft = () => {
    setMaximized('left');
    setHoverSide(null);
  };
  const maximizeRight = () => {
    setMaximized('right');
    setHoverSide(null);
  };
  const restore = () => setMaximized(null);

  const handleMouseEnterLeft = () => {
    if (!isLocked && !maximized) setHoverSide('left');
  };

  const handleMouseEnterRight = () => {
    if (!isLocked && !maximized) setHoverSide('right');
  };

  const handleMouseLeave = () => {
    if (!isLocked && !maximized) setHoverSide(null);
  };

  return (
    <div className="relative w-full h-screen flex overflow-hidden bg-gray-900" onMouseLeave={handleMouseLeave}>
      
      {/* LEFT PANEL */}
      <div 
        className="h-full relative overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] will-change-[width]"
        style={{ width: currentLeftWidth }}
        onMouseEnter={handleMouseEnterLeft}
      >
        <div className="w-full h-full min-w-[30vw]">
           {leftContent}
        </div>
        
        {/* Restore Icon (Visible when Right is maximized 100%) */}
        {maximized === 'right' && (
          <button 
            onClick={restore}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-indigo-600 p-3 rounded-r-xl shadow-2xl z-50 hover:bg-indigo-50 border border-indigo-100 transition-transform hover:scale-110"
            title="Restore Split View"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>

      {/* MIDDLE CONTROL OVERLAY */}
      {/* Positioned relative to the split line (currentLeftWidth) instead of screen center */}
      {!maximized && (
        <div 
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 pointer-events-none transition-[left] duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
          style={{ left: currentLeftWidth }}
        >
           {/* Container for buttons needs pointer-events-auto */}
           <div className="flex gap-2 bg-white/10 backdrop-blur-md p-2 rounded-full shadow-xl border border-white/20 pointer-events-auto transition-opacity duration-300 hover:bg-white/20">
              
              {/* Maximize Left (Left 100%) */}
              <button 
                onClick={maximizeLeft}
                className="p-2 rounded-full hover:bg-white hover:text-indigo-600 text-white transition-all"
                title="Focus Content (Left 100%)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
              </button>

              {/* Lock / Unlock */}
              <button 
                onClick={toggleLock}
                className={`p-2 rounded-full transition-all ${isLocked ? 'bg-indigo-600 text-white' : 'hover:bg-white hover:text-indigo-600 text-white'}`}
                title={isLocked ? "Unlock Layout" : "Lock Layout"}
              >
                {isLocked ? (
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ) : (
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                )}
              </button>

              {/* Maximize Right (Right 100%) */}
              <button 
                onClick={maximizeRight}
                className="p-2 rounded-full hover:bg-white hover:text-indigo-600 text-white transition-all"
                title="Focus Chat (Right 100%)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
              </button>

           </div>
        </div>
      )}

      {/* RIGHT PANEL */}
      <div 
        className="h-full flex-1 relative overflow-hidden"
        onMouseEnter={handleMouseEnterRight}
      >
        <div className="w-full h-full min-w-[30vw]">
          {rightContent}
        </div>

        {/* Restore Icon (Visible when Left is maximized 100%) */}
        {maximized === 'left' && (
          <button 
            onClick={restore}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-indigo-600 p-3 rounded-l-xl shadow-2xl z-50 hover:bg-indigo-50 border border-indigo-100 transition-transform hover:scale-110"
            title="Restore Split View"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
          </button>
        )}
      </div>

    </div>
  );
};

export default SplitLayout;
import React from "react";

interface SplitLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const SplitLayout: React.FC<SplitLayoutProps> = ({
  leftContent,
  rightContent,
}) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 p-8">
      {/* Max Width Container with Glass Effect */}
      <div className="w-full max-w-[1800px] h-full flex overflow-hidden rounded-3xl shadow-2xl backdrop-blur-xl bg-white/40 border border-white/50">
        
        {/* LEFT PANEL - Fixed 50% with Glass Morphism */}
        <div className="w-1/2 h-full relative overflow-hidden bg-white/60 backdrop-blur-md">
          <div className="w-full h-full">{leftContent}</div>
        </div>

        {/* Divider Line */}
        <div className="w-1 bg-gradient-to-b from-white/30 via-white/50 to-white/30 shadow-lg"></div>

        {/* RIGHT PANEL - Fixed 50% with Contrast Background */}
        <div className="w-1/2 h-full relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/50">
          <div className="w-full h-full">{rightContent}</div>
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;

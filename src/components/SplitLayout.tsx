import React, { useState, useRef, useEffect } from "react";

interface SplitLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const SplitLayout: React.FC<SplitLayoutProps> = ({
  leftContent,
  rightContent,
}) => {
  const [leftWidth, setLeftWidth] = useState(50); // 50% default
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;

    // Constrain between 25% and 50%
    if (newLeftWidth >= 25 && newLeftWidth <= 50) {
      setLeftWidth(newLeftWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-2 sm:p-4 md:p-8">
      <div
        ref={containerRef}
        className="w-full max-w-[1200px] h-full flex overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl bg-white"
      >
        {/* LEFT PANEL */}
        <div
          style={{ width: `${leftWidth}%` }}
          className="h-full relative overflow-hidden bg-slate-50 border-r border-slate-200"
        >
          <div className="w-full h-full">{leftContent}</div>
        </div>

        {/* RESIZABLE DIVIDER */}
        <div
          onMouseDown={handleMouseDown}
          className={`w-1 bg-slate-300 hover:bg-indigo-500 transition-colors cursor-col-resize relative group ${
            isDragging ? "bg-indigo-500" : ""
          }`}
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
          {/* Drag indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-8 bg-white rounded-full" />
              <div className="w-0.5 h-8 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="h-full relative overflow-hidden bg-white"
        >
          <div className="w-full h-full">{rightContent}</div>
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;

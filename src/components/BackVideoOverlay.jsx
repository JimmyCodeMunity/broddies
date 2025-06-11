import React from "react";

const BackVideoOverlay = () => {
  return (
    <div>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/images/co.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />
    </div>
  );
};

export default BackVideoOverlay;

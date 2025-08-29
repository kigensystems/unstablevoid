import React from 'react';

const VideoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-20"
      >
        <source src="/storm-background-2.mp4" type="video/mp4" />
        <source src="/storm-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-void-black/40 via-void-black/60 to-void-black/80" />
      <div className="absolute inset-0 bg-noise opacity-30" />
    </div>
  );
};

export default VideoBackground;
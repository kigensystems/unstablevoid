import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-blood-red/20 bg-void-black/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-ghost-white/40 font-mono text-sm">
            © 2024 UNSTABLE VOID | Reality is optional
          </p>
          <p className="text-ghost-white/20 font-mono text-xs mt-2">
            You cannot escape what you already are
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
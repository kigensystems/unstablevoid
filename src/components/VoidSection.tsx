import React from 'react';
import GlitchText from './GlitchText';

interface VoidSectionProps {
  title: string;
  content: string;
  scrollY: number;
  delay?: number;
  reversed?: boolean;
}

const VoidSection: React.FC<VoidSectionProps> = ({ 
  title, 
  content, 
  scrollY, 
  delay = 0,
  reversed = false 
}) => {
  const parallaxOffset = (scrollY - delay) * 0.3;
  
  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className={`max-w-4xl ${reversed ? 'text-right' : 'text-left'}`}>
        <div 
          className="transform transition-transform duration-700"
          style={{
            transform: `translateY(${-parallaxOffset}px)`,
          }}
        >
          <h2 className="text-4xl md:text-6xl font-horror mb-8 text-shadow-glow">
            <GlitchText text={title} />
          </h2>
          <p className="text-lg md:text-xl font-mono opacity-80 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VoidSection;
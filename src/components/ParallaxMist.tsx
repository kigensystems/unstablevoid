import React, { useEffect, useRef } from 'react';

interface ParallaxMistProps {
  intensity?: number; // 0..1 for parallax
}

const ParallaxMist: React.FC<ParallaxMistProps> = ({ intensity = 0.08 }) => {
  const refNear = useRef<HTMLDivElement>(null);
  const refMid = useRef<HTMLDivElement>(null);
  const refFar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 2; // -1..1
      const y = (e.clientY / h - 0.5) * 2;
      const ix = intensity * 12;
      if (refNear.current) refNear.current.style.transform = `translate3d(${x * ix}px, ${y * ix}px, 0)`;
      if (refMid.current) refMid.current.style.transform = `translate3d(${x * ix * 0.6}px, ${y * ix * 0.6}px, 0)`;
      if (refFar.current) refFar.current.style.transform = `translate3d(${x * ix * 0.3}px, ${y * ix * 0.3}px, 0)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [intensity]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-5">
      <div ref={refFar} className="mist-layer slower absolute inset-0" />
      <div ref={refMid} className="mist-layer absolute inset-0" />
      <div ref={refNear} className="mist-layer faster absolute inset-0" />
    </div>
  );
};

export default ParallaxMist;



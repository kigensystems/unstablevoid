import React, { useEffect, useMemo, useRef, useState } from 'react';

const GLYPHS = '⟁⟡◬◈◇◆◇◌◎◉☍✧✦✴︎✶✷✸✹✺ᚠᚢᚦᚨᚱᚲᚷᚺᛉᛜ∆Λ∴∵';

function generateGlyphLine(length: number): string {
  const characters: string[] = [];
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * GLYPHS.length);
    characters.push(GLYPHS[idx]);
  }
  return characters.join('');
}

const FlashlightOverlay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track viewport to size the glyph grid to fill the screen
  const [{ w, h }, setDims] = useState({ w: 0, h: 0 });
  const charPx = 12; // approximate monospace+tracking width at 10px font
  const lineHeightPx = 20; // vertical spacing between rows

  const lines = useMemo(() => {
    const cols = Math.max(100, Math.ceil(w / charPx) + 10);
    const rows = Math.max(40, Math.ceil(h / lineHeightPx) + 6);
    return new Array(rows).fill(0).map(() => generateGlyphLine(cols));
  }, [w, h]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    let latestX = -1000;
    let latestY = -1000;

    const update = () => {
      el.style.setProperty('--fx', `${latestX}px`);
      el.style.setProperty('--fy', `${latestY}px`);
      raf = 0;
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        latestX = e.touches[0].clientX;
        latestY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        latestX = (e as MouseEvent).clientX;
        latestY = (e as MouseEvent).clientY;
      }
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      const radius = Math.max(140, Math.min(280, Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.18)));
      el.style.setProperty('--fr', `${radius}px`);
      // Initialize to screen center so the flashlight is visible immediately
      latestX = Math.floor(window.innerWidth / 2);
      latestY = Math.floor(window.innerHeight / 2);
      if (!raf) raf = requestAnimationFrame(update);
      setDims({ w: window.innerWidth, h: window.innerHeight });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('mousemove', onMove as any);
      window.removeEventListener('touchmove', onMove as any);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 flashlight-mask">
        {/* Blocker behind contract card so the flashlight does not show through */}
        <Blocker targetId="contract-card" />
        <div className="absolute inset-0 px-4 py-6 text-[10px] leading-[1.15] tracking-[0.25em] font-mono text-ghost-white/80 select-none">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className="opacity-90"
              style={{
                transform: `translateY(${idx * lineHeightPx}px)`,
                textShadow: '0 0 6px rgba(248,248,255,0.18)',
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Absolutely positioned rectangle matching a target element's bounds.
const Blocker: React.FC<{ targetId: string }> = ({ targetId }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById(targetId);
    const blocker = ref.current;
    if (!el || !blocker) return;

    const position = () => {
      const rect = el.getBoundingClientRect();
      blocker.style.left = `${rect.left}px`;
      blocker.style.top = `${rect.top}px`;
      blocker.style.width = `${rect.width}px`;
      blocker.style.height = `${rect.height}px`;
    };
    position();
    const ro = new ResizeObserver(position);
    ro.observe(el);
    window.addEventListener('scroll', position, { passive: true });
    window.addEventListener('resize', position);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', position);
      window.removeEventListener('resize', position);
    };
  }, [targetId]);

  return <div ref={ref} className="absolute bg-black" style={{ opacity: 1 }} />;
};

export default FlashlightOverlay;



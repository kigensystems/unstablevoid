import VideoBackground from './components/VideoBackground';

function App() {
  return (
    <div className="min-h-screen relative">
      <VideoBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="relative w-[26.4rem] h-[26.4rem] md:w-[31.2rem] md:h-[31.2rem] lg:w-[36rem] lg:h-[36rem] mx-auto mb-6 group cursor-pointer">
            <img 
              src="/void-entity.png" 
              alt="Void Entity" 
              className="w-full h-full object-contain relative z-10"
            />
            <img 
              src="/void-entity.png" 
              alt="" 
              className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1 mix-blend-screen"
              style={{ filter: 'hue-rotate(180deg) saturate(5) brightness(1.5)' }}
            />
            <img 
              src="/void-entity.png" 
              alt="" 
              className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2 mix-blend-screen"
              style={{ filter: 'hue-rotate(-180deg) saturate(5) brightness(1.5) sepia(1)' }}
            />
          </div>
          
          <h1 className="text-2xl font-mono tracking-widest mb-12 text-ghost-white/90">
            THE VOID HAS BECOME UNSTABLE
          </h1>
          
          <div className="flex gap-8 justify-center mb-16">
            <a 
              href="https://x.com/unstable_void" 
              className="text-ghost-white/70 hover:text-ghost-white transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="hover:opacity-80 transition-opacity"
              aria-label="Pump"
            >
              <img src="/pump.png" alt="Pump" className="w-8 h-8 object-contain" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App

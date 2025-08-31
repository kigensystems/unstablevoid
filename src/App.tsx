import VideoBackground from './components/VideoBackground';
import FlashlightOverlay from './components/FlashlightOverlay';
import ParallaxMist from './components/ParallaxMist';
import ContractCard from './components/ContractCard';
import useSolanaCongestion from './components/useSolanaCongestion';
import TypewriterGlitchTitle from './components/TypewriterGlitchTitle';

function App() {
  const congested = useSolanaCongestion();
  const envToken = (import.meta as any).env?.VITE_TOKEN_ADDRESS as string | undefined;
  const storedToken = typeof window !== 'undefined' ? (window.localStorage.getItem('tokenAddress') || undefined) : undefined;
  const tokenAddress = storedToken ?? envToken ?? 'H8KDgDhVuB7Fv9RgvtrB5FDbg9F5uUBsysX3z8Y4pump';
  const pillHref = tokenAddress && tokenAddress.length > 0 
    ? `https://pump.fun/coin/${tokenAddress}` 
    : 'https://pump.fun/board';
  return (
    <div className="min-h-screen relative">
      <VideoBackground />
      <ParallaxMist />
      {/* Place flashlight behind interactive UI but above background */}
      <div className="absolute inset-0 z-0">
        <FlashlightOverlay />
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className={`relative w-[26.4rem] h-[26.4rem] md:w-[31.2rem] md:h-[31.2rem] lg:w-[36rem] lg:h-[36rem] mx-auto mb-6 group cursor-pointer ${congested ? 'blink-phase' : ''}` }>
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
          
          <TypewriterGlitchTitle
            prefixText="THE VOIDCATS HAVE BECOME "
            glitchWord="UNSTABLE"
            className="text-2xl mb-12"
            loopDelayRangeMs={[1500, 3500]}
          />
          
          <div className="flex gap-8 justify-center mb-10">
            <a 
              href="https://x.com/unstable_void" 
              className="text-ghost-white/70 hover:text-ghost-white transition-colors hover-glow rounded-md p-1"
              aria-label="Twitter"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href={pillHref} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity hover-glow rounded-md p-1"
              aria-label="Pump"
            >
              <img src="/pump.png" alt="Pump" className="w-8 h-8 object-contain" />
            </a>
          </div>

          <div className="mb-16 px-6 w-full flex justify-center">
            <ContractCard address={tokenAddress} symbol="voidcat" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App

import React, { useEffect, useRef, useState } from 'react';

interface ContractCardProps {
  address: string;
  symbol?: string;
}

const ContractCard: React.FC<ContractCardProps> = ({ address, symbol = 'voidcat' }) => {
  const [copied, setCopied] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const isComingSoon = !address || address.trim() === '' || address.toLowerCase() === 'coming soon';

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  useEffect(() => {
    if (isComingSoon) return;
    const el = rowRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onCopy();
      }
    };
    el.addEventListener('keydown', onKey as any);
    return () => el.removeEventListener('keydown', onKey as any);
  }, [isComingSoon]);

  return (
    <div id="contract-card" className="mx-auto w-full max-w-3xl rounded-xl border border-ghost-white/10 bg-void-black/50 backdrop-blur-sm p-6 shadow-2xl shadow-black/50">
      <div ref={rowRef} tabIndex={isComingSoon ? -1 : 0} role={isComingSoon ? undefined : 'button'} aria-label={isComingSoon ? undefined : 'Copy contract address'} className={`group flex flex-col items-center gap-4 rounded-md outline-none focus:ring-2 focus:ring-ghost-white/30 focus:ring-offset-0 ${isComingSoon ? '' : 'cursor-pointer select-text'}`} onClick={isComingSoon ? undefined : onCopy}>
        <div className="text-center">
          <div className="text-sm font-mono uppercase tracking-[0.3em] opacity-70">Contract</div>
          {isComingSoon ? (
            <div className="mt-1 font-mono text-ghost-white/80">Coming soon</div>
          ) : (
            <div className="mt-1 font-mono break-all text-ghost-white/90">{address}</div>
          )}
          <div className="mt-2 text-xs opacity-60">Symbol: ${symbol}</div>
        </div>
        <button 
          onClick={isComingSoon ? undefined : onCopy} 
          disabled={isComingSoon}
          className={`relative inline-flex items-center justify-center px-4 py-2 rounded-md border font-mono uppercase tracking-[0.3em] text-xs transition-colors ${
            isComingSoon 
              ? 'border-ghost-white/15 bg-shadow-gray/20 opacity-50 cursor-not-allowed select-none' 
              : 'border-ghost-white/20 bg-transparent hover:bg-ghost-white/10 cursor-pointer'
          }`}
        >
          <span className={`transition-opacity ${copied ? 'opacity-0' : 'opacity-100'}`}>Copy</span>
          <span className={`absolute left-1/2 -translate-x-1/2 transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`} aria-live="polite">Copied</span>
        </button>
      </div>
      {!isComingSoon && <div className="mt-2 text-xs opacity-50 text-center">Tip: Click anywhere on the card to copy.</div>}
    </div>
  );
};

export default ContractCard;



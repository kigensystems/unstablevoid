import { useEffect, useState } from 'react';

// Simple heuristic using public RPC. You can later swap to Helius/Websocket.
export default function useSolanaCongestion(pollMs: number = 15000) {
  const [congested, setCongested] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const start = performance.now();
        const res = await fetch('https://api.mainnet-beta.solana.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getLatestBlockhash' }),
        });
        await res.json();
        const ms = performance.now() - start;
        // Very rough: > 800ms round-trip -> treat as congested
        if (!cancelled) setCongested(ms > 800);
      } catch {
        if (!cancelled) setCongested(true);
      }
    }

    check();
    const t = setInterval(check, pollMs);
    return () => { cancelled = true; clearInterval(t); };
  }, [pollMs]);

  return congested;
}



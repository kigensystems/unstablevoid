import React, { useEffect, useState } from 'react';

interface TypewriterGlitchTitleProps {
  prefixText: string;
  glitchWord: string;
  className?: string;
  loopDelayMs?: number; // base pause before repeating
  loopDelayRangeMs?: [number, number]; // overrides base if provided
}

const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/\\^~◊◇◆◈✧✦✴∆Λ';

function randomChar(): string {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const TypewriterGlitchTitle: React.FC<TypewriterGlitchTitleProps> = ({ prefixText, glitchWord, className = '', loopDelayMs = 2400, loopDelayRangeMs }) => {
  const [typedPrefix, setTypedPrefix] = useState('');
  const [typedGlitch, setTypedGlitch] = useState('');
  const [surge, setSurge] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const scramble = (word: string, intensity: number) => {
      const chars = word.split('');
      for (let i = 0; i < chars.length; i++) {
        if (Math.random() < intensity) chars[i] = randomChar();
      }
      return chars.join('');
    };

    const runOnce = async () => {
      setTypedPrefix('');
      setTypedGlitch('');
      setSurge(false);
      setShowGlitch(false);

      // Type the prefix normally
      for (let i = 0; i < prefixText.length && !cancelled; i++) {
        setTypedPrefix(prefixText.slice(0, i + 1));
        await sleep(75 + Math.random() * 120); // slower initial typing
      }

      // Reveal glitch span and type the glitch word with flicker/glitch per character
      setShowGlitch(true);
      let committed = '';
      for (let k = 0; k < glitchWord.length && !cancelled; k++) {
        setSurge(true);
        const cycles = 10 + Math.floor(Math.random() * 8);
        for (let c = 0; c < cycles && !cancelled; c++) {
          setTypedGlitch(committed + randomChar());
          await sleep(14 + Math.random() * 26);
        }
        committed += glitchWord[k];
        setTypedGlitch(committed);
        await sleep(35 + Math.random() * 60);
      }

      // Corrupt the word briefly during surge
      for (let s = 0; s < 12 && !cancelled; s++) {
        const intensity = 0.2 + 0.6 * Math.random();
        setTypedGlitch(scramble(glitchWord, intensity));
        await sleep(28 + Math.random() * 34);
      }

      // Settle to the final word and end surge
      setTypedGlitch(glitchWord);
      await sleep(500);
      if (!cancelled) setSurge(false);
    };

    const loop = async () => {
      while (!cancelled) {
        await runOnce();
        const delay = Array.isArray(loopDelayRangeMs)
          ? Math.max(0, loopDelayRangeMs[0]) + Math.random() * Math.max(0, (loopDelayRangeMs[1] ?? 0) - loopDelayRangeMs[0])
          : loopDelayMs * (0.7 + Math.random() * 0.9);
        await sleep(delay);
      }
    };

    loop();
    return () => { cancelled = true; };
  }, [prefixText, glitchWord, loopDelayMs]);

  return (
    <h1 className={`font-mono tracking-widest text-ghost-white/90 ${className}`}>
      {typedPrefix}
      {showGlitch && typedPrefix.length >= prefixText.length ? (
        <span className={`unstable-glitch ${surge ? 'unstable-surge' : ''}`} data-text={typedGlitch}>{typedGlitch}</span>
      ) : null}
      <span className="type-caret" aria-hidden="true" />
    </h1>
  );
};

export default TypewriterGlitchTitle;



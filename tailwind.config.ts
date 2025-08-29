import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void-black': '#0a0a0a',
        'blood-red': '#8B0000',
        'ghost-white': '#F8F8FF',
        'shadow-gray': '#1a1a1a',
      },
      animation: {
        'glitch': 'glitch 5s infinite',
        'flicker': 'flicker 6s infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'glitch-1': 'glitch1 0.15s infinite',
        'glitch-2': 'glitch2 0.2s infinite reverse',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        glitch1: {
          '0%, 100%': { 
            transform: 'translate(0)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          },
          '20%': { 
            transform: 'translate(-8px, 1px)',
            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          },
          '40%': { 
            transform: 'translate(8px, -1px)',
            clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          },
          '60%': { 
            transform: 'translate(-6px, 0)',
            clipPath: 'polygon(0 20%, 100% 20%, 100% 70%, 0 70%)',
          },
          '80%': { 
            transform: 'translate(5px, 0)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          },
        },
        glitch2: {
          '0%, 100%': { 
            transform: 'translate(0)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          },
          '20%': { 
            transform: 'translate(6px, -1px)',
            clipPath: 'polygon(0 25%, 100% 25%, 100% 75%, 0 75%)',
          },
          '40%': { 
            transform: 'translate(-7px, 1px)',
            clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)',
          },
          '60%': { 
            transform: 'translate(9px, 0)',
            clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)',
          },
          '80%': { 
            transform: 'translate(-8px, 0)',
            clipPath: 'polygon(0 40%, 100% 40%, 100% 60%, 0 60%)',
          },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      fontFamily: {
        'horror': ['Creepster', 'cursive'],
        'mono': ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
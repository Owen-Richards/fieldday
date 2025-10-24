import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Sunset orange - primary action color (energy, warmth, movement)
          primary: {
            50: '#FFF8F3',
            100: '#FEECD9',
            200: '#FCDAB3',
            300: '#FAC18C',
            400: '#F7A166',
            500: '#F47E3F', // Main orange
            600: '#E85D1C',
            700: '#C14415',
            800: '#9A3412',
            900: '#732710',
          },
          // Forest green - trust, nature, outdoors, community
          accent: {
            50: '#F0F9F4',
            100: '#DCF0E3',
            200: '#B8E1C7',
            300: '#7FC89E',
            400: '#4FAD77',
            500: '#2E8B57', // Main green
            600: '#247043',
            700: '#1D5837',
            800: '#18452C',
            900: '#133624',
          },
          // Sky blue - openness, possibility, freedom
          sky: {
            50: '#F0F9FF',
            100: '#E0F2FE',
            200: '#BAE6FD',
            300: '#7DD3FC',
            400: '#38BDF8',
            500: '#0EA5E9',
            600: '#0284C7',
            700: '#0369A1',
            800: '#075985',
            900: '#0C4A6E',
          },
          // Warm sand - grounding, earthy, approachable
          sand: {
            50: '#FDFCF8',
            100: '#FAF7F0',
            200: '#F4EBDA',
            300: '#EBDABD',
            400: '#E0C4A0',
            500: '#D4A574',
            600: '#BC8A5F',
            700: '#A47148',
            800: '#8B5E3C',
            900: '#6F4A31',
          },
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Impact', 'Arial Black', 'sans-serif'], // Athletic, bold
        editorial: ['var(--font-editorial)', 'Georgia', 'serif'], // Storytelling
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem', // 72px
        '8xl': '6rem', // 96px
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(244, 126, 63, 0.4)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(244, 126, 63, 0)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #F47E3F 0%, #2E8B57 100%)',
        'gradient-hero': 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
      },
    },
  },
  plugins: [],
};

export default config;

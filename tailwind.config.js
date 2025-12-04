/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        10: '10px'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' }
        },
        headerShine: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' }
        },
        logoRotate: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        galaxyPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' }
        },
        particlesFloat: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' }
        },
        iconPulse: {
          '0%, 100%': { opacity: '0', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.1)' }
        },
        statusPulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' }
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'header-shine': 'headerShine 8s ease-in-out infinite',
        'logo-rotate': 'logoRotate 10s linear infinite',
        'galaxy-pulse': 'galaxyPulse 8s ease-in-out infinite',
        'particles-float': 'particlesFloat 4s infinite',
        'icon-pulse': 'iconPulse 2s ease-in-out infinite',
        'status-pulse': 'statusPulse 2s infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out'
      },
      backdropBlur: {
        '20': '20px',
      }
    },
  },
  plugins: [],
}


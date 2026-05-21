import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
                mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                navy: {
                    50: '#E8EDF5',
                    100: '#C5D0E6',
                    200: '#9BAFD4',
                    300: '#708EC2',
                    400: '#5075B4',
                    500: '#305CA6',
                    600: '#2B549E',
                    700: '#244A95',
                    800: '#1B2B4B',
                    900: '#0F1D32',
                    950: '#0A1628',
                },
                gold: {
                    50: '#FFF9E6',
                    100: '#FFF0BF',
                    200: '#FFE799',
                    300: '#FFDD73',
                    400: '#E8C547',
                    500: '#C9A84C',
                    600: '#B8933A',
                    700: '#A67D28',
                    800: '#8B6914',
                    900: '#6B5010',
                },
                surface: {
                    dark: '#0F1D32',
                    light: '#F8FAFC',
                    card: 'rgba(15, 29, 50, 0.7)',
                },
                accent: {
                    success: '#10B981',
                    warning: '#F59E0B',
                    error: '#EF4444',
                    info: '#3B82F6',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-gold': 'linear-gradient(135deg, #C9A84C 0%, #E8C547 50%, #C9A84C 100%)',
                'gradient-navy': 'linear-gradient(135deg, #0A1628 0%, #1B2B4B 50%, #0F1D32 100%)',
                'gradient-hero': 'linear-gradient(180deg, #0A1628 0%, #1B2B4B 60%, #0F1D32 100%)',
                'glass-dark': 'linear-gradient(135deg, rgba(15, 29, 50, 0.8) 0%, rgba(10, 22, 40, 0.6) 100%)',
                'glass-light': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.7) 100%)',
            },
            boxShadow: {
                'glow-gold': '0 0 20px rgba(201, 168, 76, 0.3)',
                'glow-blue': '0 0 20px rgba(48, 92, 166, 0.3)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                'card': '0 4px 24px rgba(0, 0, 0, 0.12)',
                'card-hover': '0 8px 40px rgba(0, 0, 0, 0.2)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'counter': 'counter 2s ease-out',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(201, 168, 76, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.4)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
        },
    },

    plugins: [forms],
};

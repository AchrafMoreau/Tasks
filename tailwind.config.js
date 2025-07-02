/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  corePlugin: {
    borderOpacity: true,
  },
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#059669", 
        accent: "#D97706",    
        light: "#ECFDF5",
        red: {
          100: '#ffebee',
          400: '#f87171',
          500: '#ef4444',
        }
      }
    },
  },
  plugins: [],
}


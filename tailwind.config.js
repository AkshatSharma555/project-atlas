/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          dark: '#0a0a0a',    // Deep background
          panel: '#141414',   // Cards / Sidebar
          border: '#262626',  // Subtle borders
          primary: '#3b82f6', // Action blue
          text: '#f5f5f5',    // Primary text
          muted: '#a3a3a3',   // Secondary text
          success: '#10b981', // Healthy
          warning: '#f59e0b', // Degraded
          danger: '#ef4444',  // Critical
        }
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'car-bg-register':"url('assets/pexels-may-dayua-1545743.jpg')"
      }
    },
  },
  plugins: [],
};

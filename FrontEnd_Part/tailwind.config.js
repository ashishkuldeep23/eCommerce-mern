/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",


  ],
  theme: {

    screens: {
      'xsm': "260px",
      'smm': '366px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    },

    extend: {
      height: {
        allAk: "100vh",
        "90" : "22rem"
      },
      maxWidth: {
        allAk: "87rem" ,
        "3/5" : "60%"
      },
      
      scale : {
        '200' : "200%"
      } 
    },
  },
  plugins: [
    require("@headlessui/react"),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require("daisyui"),

  ],
}


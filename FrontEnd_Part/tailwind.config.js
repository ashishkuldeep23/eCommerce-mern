/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",


  ],
  theme: {
    extend: {
      height : {
        allAk : "98vh"
      },
      maxWidth : {
        allAk : "87rem"
      },
      

    },
  },
  plugins: [
    require("@headlessui/react"),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require("daisyui"),

  ],
}


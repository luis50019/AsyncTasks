/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens:{
        'computer': {'min': '1024px', 'max':'1920px'},
        'Desktop': {'min': '1921px', 'max': '5120px'},
        'tablet':{'min':'490px', 'max':'1023px'},
        'phone': {'min': '300px', 'max': '489px'}
      },
      fontSize: {
        'xl': '5.5rem'
      }
    },
  },
  plugins: [],
}

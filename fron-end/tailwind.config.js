/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      scale: {
        '200': '2',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'ibm-plex-serif' : ['IBM Plex Serif', 'serif'],
        'droid-arabic-kufi' : ['DroidArabicKufiRegular'],
      },
     
        colors: {
        'white-maria': '#E5E5E5',
        'white-maria-2': '#DFDFDF',
        'grey-maria': '#5A5A5A',
        'white-card' : '#FDFDFD' ,
        'custom-red' : '#C31815',
        'green-gray' : '#E6ECEF',
        'light-gray' : '#F8F8F8',
        'custom-gray' : '#ECEDEF',
        'green-dark' : '#0F3E50',
        'green-darker' : '#0A2C39',
        'white-card' : '#FDFDFD' ,
        'custom-red' : '#C31815',
        'primary': {
          300: '#20E198',
          500: '#12CD86',
          700: '#1CBD80',
        },
  
      },
    
  
    },
  },
  plugins: [],
}

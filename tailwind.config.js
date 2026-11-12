/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        hand:  ['Caveat', 'Comic Sans MS', 'cursive'],
        ui:    ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper:  '#FAF7F2',
        ink:    '#1F1F1F',
        mute:   '#6B6B66',
        line:   '#E4DFD6',
        sage:   '#D5DDCB',
        blush:  '#F2D9D3',
        sky:    '#D6E2EC',
        butter: '#F4E8B8',
        acc:    '#3F5BD8',
      },
    },
  },
  plugins: [],
}

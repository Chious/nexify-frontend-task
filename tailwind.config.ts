import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: '#1B8655',
        blue: '#0C6DFD',
        red: '#DE3548',
        gray: '#bbbbbb',
      },
    },
  },
  plugins: [],
};
export default config;

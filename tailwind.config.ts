import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        customRed: "#FFCECE",
        customGreen: "#DAF2D6",
        customYellow: "#ffef76",
        customLYellow: "#fbf3b8",
        customBlack: "#69665C",
        customBlue: "#D1E5F7",
        customPurple: "#D2CEFF",
        customGray: "#B2AFA1"
      }
    },
  },
  plugins: [],
}
export default config

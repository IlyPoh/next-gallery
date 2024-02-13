import colors from 'tailwindcss/colors';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: {
        primary: colors.pink[500],
        secondary: colors.gray[500],
      },
      backgroundColor: {
        primary: colors.pink[500],
      },
      borderColor: {
        primary: colors.pink[500],
      },
    },
  },
  plugins: [],
};
export default config;

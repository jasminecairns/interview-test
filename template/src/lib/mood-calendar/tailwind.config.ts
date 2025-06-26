import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'stroke-blue-500',
    'bg-blue-500',
    'stroke-red-500',
    'bg-red-500',
    'stroke-purple-500',
    'bg-purple-500',
    'stroke-green-500',
    'bg-green-500',
    'stroke-orange-500',
    'bg-orange-500',
    'stroke-sky-300',
    'bg-sky-300',
    'stroke-gray-300',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gtsd : 'GT-Sectra-Display',
        product : 'ProductSans',
        clash : 'ClashDisplay'
        
      },
      colors : {
        noir : "#333333",
        blanc : "#eaeaea"
      },
      screens : {
        xs : '50px',
        lg: '1024px'
      },
      brightness: {
        0: '0',
      },
    },
  },
  plugins: [],
} satisfies Config;

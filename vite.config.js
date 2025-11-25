import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Use a relative base so built files work when served from GitHub Pages
  base: '/drignei-web/',
  build: {
    outDir: 'docs',
  },
  plugins: [react(), tailwindcss()],
})

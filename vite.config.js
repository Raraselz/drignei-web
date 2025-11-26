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
  // Dev server proxy to bypass CORS for Google suggestions during development
  server: {
    proxy: {
      // Proxy requests from /suggest -> https://suggestqueries.google.com/complete/search
      '/suggest': {
        target: 'https://suggestqueries.google.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/suggest/, '/complete/search')
      }
    }
  },
  plugins: [react(), tailwindcss()],
})

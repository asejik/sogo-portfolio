import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Intercept any request to /api/views/...
      '/api/views': {
        target: 'https://api.counterapi.dev',
        changeOrigin: true,
        // Safely replaces /api/views/slug with /v1/sogo-portfolio/slug/up
        rewrite: (path) => path.replace(/^\/api\/views\//, '/v1/sogo-portfolio/') + '/up',
      }
    }
  }
});
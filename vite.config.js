// Source: cs5610_project3_template/vite.config.js (course template repo)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
      }
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://library-management-system-2yg5.onrender.com",
        changeOrigin: true,
        secure:true,
      }
    }
  }
})



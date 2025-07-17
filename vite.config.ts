import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/types': '/src/types',
      '@/components': '/src/components',
      '@/helpers': '/src/helpers',
      '@/assets': '/src/assets',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})

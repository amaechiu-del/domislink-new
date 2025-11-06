import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // you can change this if needed
    open: true,        // automatically opens in browser
  },
  build: {
    outDir: 'dist',    // build output directory
    sourcemap: false,  // disable source maps for production
  },
  resolve: {
    alias: {
      '@': '/src',     // allows you to import like: import X from '@/components/X'
    },
  },
})

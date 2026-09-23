import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  // FIX: Using a dot configuration allows Vite to build bulletproof relative paths 
  // that resolve perfectly on GitHub Pages regardless of directory caching.
  base: './', 
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});

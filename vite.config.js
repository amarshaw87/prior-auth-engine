import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Forces the local server to run on port 3000
    open: true  // Automatically opens the workspace in your browser on launch
  },
  build: {
    outDir: 'dist',
    sourcemap: false // Keeps production bundles compact and high-performance
  }
});

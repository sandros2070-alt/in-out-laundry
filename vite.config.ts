
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', 
  build: {
    // Build directly into the theme distribution folder
    outDir: 'in-and-out-theme/dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Force fixed filenames so PHP functions.php can easily find them
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/index.js',
        assetFileNames: 'assets/index.[ext]'
      }
    }
  }
});

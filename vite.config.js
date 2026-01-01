import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base path to ensure assets are loaded correctly
  // regardless of where the site is deployed (e.g., subdirectories)
  base: './',
  server: {
    // Automatically open the app in the browser on server start
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
});

import { defineConfig } from 'vite';

export default defineConfig({
  // Use root-relative base for Vercel deployment
  base: '/',
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Increase chunk size warning limit for Webflow exports
    chunkSizeWarningLimit: 1000,
  }
});

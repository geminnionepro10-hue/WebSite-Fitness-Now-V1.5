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
    // Don't process HTML as entry point to avoid script bundling issues
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});

import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/',
  server: {
    open: true,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'assets/js/*', dest: 'assets/js' },
        { src: 'assets/css/*', dest: 'assets/css' },
        { src: 'assets/images/*', dest: 'assets/images' },
      ]
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
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

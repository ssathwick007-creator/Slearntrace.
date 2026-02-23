// Vite configuration for LearnTrace
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: false
  },
  // Build only the main app; auth pages are disabled
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});

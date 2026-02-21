// Vite configuration for LearnTrace
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: false
  },
  // Ensure proper handling of HTML files
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        login: './login.html',
        profile: './profile.html'
      }
    }
  }
});

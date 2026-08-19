// Vite configuration for LearnTrace
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5173,
    open: false,
    proxy: {
      '/api/reflection': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/api/run': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/api/study-assistant': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/api/assistant': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  plugins: [react()],
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

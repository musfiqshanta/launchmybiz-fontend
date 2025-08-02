// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://lauchbackend-896056687002.europe-west1.run.app',  
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

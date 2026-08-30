import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: 'spa-404',
      closeBundle() {
        if (process.env.GITHUB_PAGES === 'true') {
          const index = resolve(__dirname, 'dist/index.html');
          const notFound = resolve(__dirname, 'dist/404.html');
          if (existsSync(index)) {
            copyFileSync(index, notFound);
          }
        }
      },
    },
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});

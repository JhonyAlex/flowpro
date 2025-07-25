// vite.config.js
import { defineConfig } from 'vite';
import { createVuePlugin as vue } from 'vite-plugin-vue2';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  root: './frontend',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'frontend/src'),
      '@nodos': resolve(__dirname, 'backend/config')
    }
  },
  build: {
    outDir: resolve(__dirname, 'frontend/dist')
  },
  server: {
    port: 5173
  }
});

// vite.config.js (modo ESM compatible con Vue 2)
import { defineConfig } from 'vite';
import vue from 'vite-plugin-vue2';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: resolve(__dirname, 'frontend'),
  plugins: [vue()],
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

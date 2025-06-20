// vite.config.js para modo ESM (Heroku + type: module)
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  root: __dirname,
    resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@nodos': resolve(__dirname, '../backend/config')
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist')
  },
  server: {
    port: 5173
  }
};

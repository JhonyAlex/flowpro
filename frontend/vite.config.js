import path from 'path';

export default defineConfig({
  plugins: [vue()],
  root: 'frontend',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend/src'),
      '@nodos': path.resolve(__dirname, 'backend/config')
    }
  },
  build: {
    outDir: 'frontend/dist'
  },
  server: {
    port: 5173
  }
});

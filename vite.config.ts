import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests.ts'
  },
  preview: {
    port: 3000,
    strictPort: true
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001', // Backend server URL
    //     changeOrigin: true
    //   }
    // }
  }
});

/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    EnvironmentPlugin(
      { API_URL: 'http://localhost', API_PORT: '8080' },
      {
        defineOn: 'import.meta.env',
        loadEnvFiles: true,
      }
    ),
  ],
  resolve: {
    alias: [
      {
        find: 'common',
        replacement: resolve(__dirname, 'src/common'),
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
});

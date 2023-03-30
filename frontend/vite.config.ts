/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';


export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: [
      {
        find: "common",
        replacement: resolve(__dirname, "src/common"),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      }
    ],
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
  }
  
});
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        courseReader: resolve(__dirname, 'course-reader.html'),
        treesReader: resolve(__dirname, 'trees-reader.html'),
        graphsReader: resolve(__dirname, 'graphs-reader.html'),
      },
    },
  },
});

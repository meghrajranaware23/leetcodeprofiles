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
        recursionReader: resolve(__dirname, 'recursion-reader.html'),
        dpReader: resolve(__dirname, 'dp-reader.html'),
        starterReader: resolve(__dirname, 'starter-reader.html'),
        packs: resolve(__dirname, 'packs.html'),
        signIn: resolve(__dirname, 'sign-in.html'),
      },
    },
  },
});

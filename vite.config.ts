import { defineConfig } from 'vite'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vr-modular-synth/',
  build: {
    outDir: 'build',
    lib: {
      entry: 'src/my-element.ts',
      formats: ['es'],
    },
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})

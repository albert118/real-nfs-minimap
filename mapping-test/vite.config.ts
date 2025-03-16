import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tsconfig from './tsconfig.app.json';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]s?$/, // .ts / .js
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\/.md$/, // .md
      ],
      dts: './src/types/auto-import.d.ts',
      imports: ['vue', 'vitest', 'vue-router'],
      vueTemplate: true,
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: Object.fromEntries(
      Object.entries(tsconfig.compilerOptions.paths).map(([key, value]) => [
        key.replace('/*', ''),
        path.resolve(__dirname, value[0].replace('/*', '')),
      ]),
    ),
  },
});

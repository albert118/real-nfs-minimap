import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tsconfig from './tsconfig.app.json';
import path from 'path';

// Components and Unplugin
import vuetify from 'vite-plugin-vuetify';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

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
    // https://vite-pwa-org.netlify.app/
    vuetify(),
    Components({
      dts: './src/types/components.d.ts',
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
    }),
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

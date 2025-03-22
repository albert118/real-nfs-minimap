import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tsconfig from './tsconfig.app.json';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import AutoImport from 'unplugin-auto-import/vite';
import packageDefintion from './package.json';
import vuetify from 'vite-plugin-vuetify';

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
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-icon-180.png', 'maskable-icon-512.png', 'maskable-icon-192.png', 'favicon-196.png'],
      manifest: {
        name: packageDefintion.name,
        short_name: packageDefintion.shortName,
        description: packageDefintion.description,
        theme_color: '#ffffff',
        icons: [
          {
            src: 'public/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'public/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'public/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'public/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      // https://vite-pwa-org.netlify.app/guide/register-service-worker.html
      workbox: {
        // TODO: implement offline caching with this configuration
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 24 * 60 * 30, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: isDevelopment(),
      },
    }),
    vuetify(),
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

function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

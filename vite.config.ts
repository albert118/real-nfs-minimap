import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tsconfig from './tsconfig.app.json';
import packageDefintion from './package.json';
import path from 'path';

// Progressive Web App
import { VitePWA } from 'vite-plugin-pwa';

// Components and Unplugin auto import plugins
import vuetify from 'vite-plugin-vuetify';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [
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
        Components({
            dts: './src/types/components.d.ts',
            types: [
                {
                    from: 'vue-router',
                    names: ['RouterLink', 'RouterView'],
                },
            ],
        }),
        vue({
            isProduction: command === 'serve',
        }),
        // must be placed AFTER the Vue plugin
        // https://vite-pwa-org.netlify.app/
        vuetify(),
        // https://vite-pwa-org.netlify.app/
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
                'favicon.ico',
                'apple-icon-180.png',
                'maskable-icon-512.png',
                'maskable-icon-192.png',
                'favicon-196.png',
            ],
            manifest: {
                name: packageDefintion.name,
                short_name: packageDefintion.shortName,
                description: packageDefintion.description,
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'manifest-icon-192.maskable.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: 'manifest-icon-192.maskable.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: 'manifest-icon-512.maskable.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: 'manifest-icon-512.maskable.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
            // https://vite-pwa-org.netlify.app/guide/register-service-worker.html
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                runtimeCaching: [
                    {
                        urlPattern: ({ request, sameOrigin }) =>
                            sameOrigin &&
                            (request.destination === 'style' ||
                                request.destination === 'script' ||
                                request.destination === 'worker'),
                        method: 'GET',
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
                        // match a URL like https://tile.openstreetmap.org/6/54/24.png
                        // this MUST match the entire URL to support CORs caching
                        urlPattern:
                            /https:\/\/tile.openstreetmap.org\/\d{1,2}\/\d{1,2}\/\d{1,2}.png/,
                        method: 'GET',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'tile-layers',
                            cacheableResponse: {
                                statuses: [0, 200], // only cache successful responses (0 is a fetch response code when handling CORs)
                            },
                            fetchOptions: {
                                mode: 'cors',
                                credentials: 'omit',
                            },
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 24 * 60 * 30, // 30 days
                            },
                        },
                    },
                    {
                        urlPattern: ({ request, sameOrigin }) =>
                            sameOrigin && request.destination === 'image',
                        method: 'GET',
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'images',
                            cacheableResponse: {
                                statuses: [0, 200], // only cache successful responses (0 is a fetch response code when handling CORs)
                            },
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 24 * 60 * 30, // 30 days
                            },
                        },
                    },
                ],
            },
            devOptions: {
                enabled: command === 'serve',
            },
        }),
    ],
    resolve: {
        alias: Object.fromEntries(
            Object.entries(tsconfig.compilerOptions.paths).map(
                ([key, value]) => [
                    key.replace('/*', ''),
                    path.resolve(__dirname, value[0].replace('/*', '')),
                ],
            ),
        ),
    },
}));

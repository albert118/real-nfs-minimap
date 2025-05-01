import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tsconfig from './tsconfig.app.json';
import path from 'path';

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
            imports: ['vue', 'vitest', 'vue-router', 'pinia'],
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

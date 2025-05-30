import { createRouter, createWebHistory } from 'vue-router';

/**
 * Explicitly define route names here
 */
export enum RouteName {
    Index = 'index',
    Settings = 'settings',
}

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: RouteName.Index,
            component: async () => await import('@views/index.vue'),
        },
        {
            path: '/settings',
            name: RouteName.Settings,
            component: async () => await import('@views/settings.vue'),
        },
    ],
});

import { createRouter, createWebHistory, type Router } from 'vue-router';
import HomeView from '@views/HomeView.vue';

export enum RouteName {
    Home = 'home',
}

////////////////////////////////////////////////////////////////////////////////
// Lazy Imports
//    aka. "route level code-splitting"
//    this generates a separate chunk (eg. About.[hash].js) for this route
//    which is lazy-loaded when the route is visited.
////////////////////////////////////////////////////////////////////////////////

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: RouteName.Home,
            component: HomeView,
        },
    ],
});

import { createRouter, createWebHistory, type Router } from 'vue-router';
import HomeView from '@views/HomeView.vue';
import { RouteName } from './routes';

////////////////////////////////////////////////////////////////////////////////
// Lazy Imports
//    aka. "route level code-splitting"
//    this generates a separate chunk (About.[hash].js) for this route
//    which is lazy-loaded when the route is visited.
////////////////////////////////////////////////////////////////////////////////

const About = () => import('@views/AboutView.vue');

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.Home,
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',

      component: About,
    },
  ],
});

////////////////////////////////////////////////////////////////////////////////
// Extension Methods
//    Implement any custom extension methods here. Don't forget to add them
//    to the interface definition within ./vue-router.d.ts
////////////////////////////////////////////////////////////////////////////////

router.isCurrentRoute = isCurrentRoute;

function isCurrentRoute(this: Router, routeName: RouteName) {
  return this.currentRoute.value.name === routeName;
}

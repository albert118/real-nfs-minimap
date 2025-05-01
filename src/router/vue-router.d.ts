import 'vue-router';

declare module 'vue-router' {
  interface Router {
    /**
     * Asserts if a the given route is the current route.
     * @param routeName the route name to assert.
     */
    isCurrentRoute(routeName: RouteName);
  }
}

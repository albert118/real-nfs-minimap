import { type Router } from 'vue-router';
import { router, type RouteName } from '@router';

/**
 * Asserts if the given route is the current route.
 *
 * @param routeName the route name to assert
 * @returns true || false
 */
router.isCurrentRoute = function (this: Router, routeName: RouteName) {
    return this.currentRoute.value.name === routeName;
};

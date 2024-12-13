import {
  createRouter,
  createMemoryHistory,
  RouteLocationNormalized
} from 'vue-router';
import { useStore } from './store';

export enum Routes {
  LOGIN = 'login',
  REGISTER = 'register',
  USERS = 'users',
  USER = 'user'
}

export const getRoutePath = (routeName: Routes) =>
  routes.find((r) => r.name === routeName)!.path;

const routes = [
  {
    path: '/login',
    name: Routes.LOGIN,
    component: () => import('@/views/login.vue')
  },
  {
    path: '/',
    name: Routes.USERS,
    meta: { protected: true },
    component: () => import('@/views/users.vue')
  },
  {
    path: '/users/:id',
    name: Routes.USER,
    meta: { protected: true },
    component: () => import('@/views/user.vue')
  }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes
});

router.beforeEach(async (to: RouteLocationNormalized) => {
  const { user, userUpdate } = useStore();

  // add protection check for all the protected pages
  if (!user.value && to.meta.protected) {
    return { name: Routes.LOGIN };
  }

  // clear the user when logout
  if (to.name === Routes.LOGIN && user.value) {
    userUpdate(null);
  }
});

export default router;

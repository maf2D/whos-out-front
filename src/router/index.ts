import type { ApiUserResponse } from '@/types/api.ts';

import { useApi } from '@/composables/use-api';
import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';
import { useState } from '@/composables/use-state.ts';

const routes = [
  {
    path: '/',
    redirect: '/widget',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/register.vue')
  },
  {
    path: '/widget',
    name: 'widget',
    meta: { protected: true },
    component: () => import('@/views/widget/widget.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    meta: { protected: true, restrictToAdmin: true },
    component: () => import('@/views/admin/admin.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to: RouteLocationNormalized) => {
  const { loggedInUser } = useState();
  const { api } = useApi();

  // protected pages check
  if (to.meta.protected && !loggedInUser.value) {
    return { name: 'login' };
  }

  // restricted pages check
  if (to.meta.restrictToAdmin && loggedInUser.value) {

    // check if an admin
    const { response } = await api(`/users/${loggedInUser.value._id}`, { credentials: 'include' });
    const { data }: ApiUserResponse = await response.value?.json();

    // if not then redirect to the login page
    if (data.user.role !== 'admin') {
      alert('Sorry, but your not an admin! Login as an admin to perform this action.')

      return { name: 'login' };
    }
  }
});

export default router;
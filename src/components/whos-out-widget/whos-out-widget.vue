<template>
  <widget-container title="Who's out widget" :menu="menu">
    <login-page v-if="activePage.name === Pages.LOGIN" />

    <users-page v-if="activePage.name === Pages.USERS" />

    <user-page v-if="activePage.name === Pages.USER" />
  </widget-container>
</template>

<script lang="ts" setup>
import type { MenuItem } from '@/lib/widget-container/widget-container.vue';

import { onMounted } from 'vue';
import { Pages, useStore } from '@/store';

import WidgetContainer from '@/lib/widget-container/widget-container.vue';
import LoginPage from './login-page/login-page.vue';
import UsersPage from './users-page/users-page.vue';
import UserPage from './user-page/user-page.vue';

onMounted(() => {
  // if there is a logged in user then open the users page
  if (user.value) {
    openUsersPage();
  }
});

const { user, activePage, userUpdate, activePageUpdate } = useStore();

const openMePage = () =>
  activePageUpdate({ name: Pages.USER, id: user.value?.id });

const openUsersPage = () => activePageUpdate({ name: Pages.USERS });

const logoutAndOpenLoginPage = () => {
  userUpdate(null);
  activePageUpdate({ name: Pages.LOGIN });
};

// widget container menu
const menu: MenuItem[] = [
  { name: 'Me', cb: openMePage },
  { name: 'Users', cb: openUsersPage },
  { name: 'Log out', cb: logoutAndOpenLoginPage }
];
</script>

<style lang="scss" scoped></style>

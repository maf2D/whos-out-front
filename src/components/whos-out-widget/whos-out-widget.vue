<template>
  <widget-container text="Who's out widget">
    <login-page
      v-if="!loggedInUser"
      @onLoggedInUserUpdate="(user: User) => loggedInUser = user"
    />

    <users-page v-else />
  </widget-container>
</template>

<script lang="ts" setup>
import type { User } from '@/types/api';

import { StorageSerializers, useStorage } from '@vueuse/core';

import WidgetContainer from '@/lib/widget-container/widget-container.vue';
import LoginPage from './login-page/login-page.vue';
import UsersPage from './users-page/users-page.vue';

const loggedInUser = useStorage<User | null>('whos-out-user', null, undefined, {
  serializer: StorageSerializers.object
});
</script>

<style lang="scss" scoped></style>

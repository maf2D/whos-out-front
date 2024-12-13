<template>
  <widget-container title="Who's out widget" :menu="menu">
    <router-view />
  </widget-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import { Routes } from '@/router';
import { HEADER_MENU } from '@/constants/header-menu';

import WidgetContainer from '@/lib/widget-container/widget-container.vue';

const { user } = useStore();

const menu = computed(() => {
  if (user.value) {
    const userId = user.value.id.toString();

    return HEADER_MENU().map((menuItem) => {
      if (menuItem.name === Routes.USER) {
        menuItem.url = menuItem.url.replace(':id', userId);
      }

      return menuItem;
    });
  }

  return [];
});
</script>

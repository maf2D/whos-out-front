<template>
  <div class="users-list">
    <div v-if="users.length" class="virtual-list" v-bind="containerProps">
      <div v-bind="wrapperProps">
        <users-list-item
          v-for="item of list"
          :img="defaultAvatar"
          :title="`${item.data.firstName} ${item.data.lastName}`"
          subtitle="some"
          :onVacation="item.data.onVacation"
          :id="item.data.id"
          :link="getUserLink(item.data.id)"
          :key="item.data.id"
        />

        <div ref="lastItemRef" />
      </div>
    </div>

    <loader v-if="loading" />

    <p v-if="!list.length && !loading" class="error">No users found</p>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '@/types/api';

import { computed, onUnmounted, ref } from 'vue';
import { useIntersectionObserver, useVirtualList } from '@vueuse/core';
import { getRoutePath, Routes } from '@/router';

import UsersListItem from '@/lib/users-list-item/users-list-item.vue';
import Loader from '@/lib/loader/loader.vue';
import defaultAvatar from '@/assets/user-stub.png';

const props = withDefaults(
  defineProps<{
    // all the users
    users: User[];

    // loading status
    loading: boolean;

    // error
    error: string | null;
  }>(),
  {
    // default values
    users: () => [] as User[],
    loading: false,
    error: null
  }
);

defineEmits<{
  (event: 'user-click', userId: number): void;
}>();

// disable observer when unmounted
onUnmounted(() => stop());

// last user in the list
const lastItemRef = ref<HTMLElement | null>(null);
const isLastItemIntersected = ref(false);

// composable that shows only n list items in the view port
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  computed(() => props.users),
  { itemHeight: 44 }
);

// update isLastItemIntersected when intersecting last item
const { stop } = useIntersectionObserver(
  // target
  lastItemRef,

  // intersection cb
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isLastItemIntersected.value = true;
    }
  }
);

const getUserLink = (id: number) =>
  getRoutePath(Routes.USER).replace(':id', id.toString());

defineExpose({
  isLastItemIntersected,

  resetIsLastItemIntersected: () => (isLastItemIntersected.value = false),
  scrollToTop: () => scrollTo(0)
});
</script>

<style lang="scss" scoped>
.users-list {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  position: relative;

  .virtual-list {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .loader-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000f30;
    opacity: 0.05;
  }

  .error {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #000f30;
    line-height: 1;
    padding-top: 16px;
    padding-bottom: 16px;
    height: 100%;
  }
}
</style>

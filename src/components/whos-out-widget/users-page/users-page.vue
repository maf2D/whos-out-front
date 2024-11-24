<template>
  <div class="top-panel">
    <search class="search" v-model="widgetState.searchStr" ref="searchRef" />

    <tabs-list
      :tabs="tabs"
      :active-tab="widgetState.activeTab"
      @set-active-tab="(tab: string) => widgetState.activeTab = tab"
    />
  </div>

  <users-list
    class="users-list"
    :users="users?.users || []"
    :loading="isFetching"
    :error="error"
    @set-skip="(skip: number) => widgetState.skip = skip"
    ref="usersListRef"
  />
</template>

<script lang="ts" setup>
import type { Tab } from '@/lib/tabs-list/tabs-list.vue';

import { computed, reactive, ref, toRefs, watch } from 'vue';
import { useUsers } from '@/composables/use-users';

import Search from '@/lib/search/search.vue';
import TabsList from '@/lib/tabs-list/tabs-list.vue';
import UsersList from '@/lib/users-list/users-list.vue';

export type WidgetState = {
  searchStr: string;
  activeTab: string;
  skip: number;
  limit: number;
};

const widgetState = reactive<WidgetState>({
  searchStr: '',
  activeTab: 'All',
  skip: 0,
  limit: 20
});

// components refs
const usersListRef = ref<InstanceType<typeof UsersList> | null>(null);
const searchRef = ref<InstanceType<typeof Search> | null>(null);

// up-to-date users
const { users, allFetched, isFetching, error, fetchUsers } = useUsers(
  toRefs(widgetState)
);

// users list tabs
const tabs = computed<Tab[]>(() => [
  { label: 'All', badge: users.value?.usersCount },
  { label: 'On Vacation', badge: users.value?.usersOnVacationCount }
  // { label: 'On Holidays', badge: users.value?.usersOnHolidays }
]);

// watcher that resets widget when tab or search was changed
watch([() => widgetState.searchStr, () => widgetState.activeTab], () => {
  // update widget
  usersListRef.value && usersListRef.value.scrollToTop();
  searchRef.value && searchRef.value.focusSearch();

  // fetch new users
  widgetState.skip = 0;
  allFetched.value = false;

  fetchUsers();
});

// watcher that updates skip variable when intersecting last item
watch(
  () => usersListRef.value?.isLastItemIntersected,
  () => {
    // reset last user item
    usersListRef.value && usersListRef.value.resetIsLastItemIntersected();

    // fetch new users
    if (!allFetched.value) {
      widgetState.skip = users.value?.users.length || 0;

      fetchUsers();
    }
  }
);
</script>

<style lang="scss" scoped>
.top-panel {
  border-bottom: 1px solid #d3dfeb;
  padding-bottom: 10px;

  .search {
    margin-bottom: 8px;
  }
}

.users-list {
  height: 324px;
}

.tabs-list {
  display: flex;

  @media (max-width: 475px) {
    flex-direction: row;
  }

  :deep(.tabs-list-item) {
    margin-right: 0;

    @media (max-width: 475px) {
      margin-right: 8px;
    }
  }
}
</style>

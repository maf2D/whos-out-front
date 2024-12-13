<template>
  <div v-if="fetchedUser && !isFetching" class="user-container">
    <user-info
      :user="fetchedUser.data"
      :me="me"
      @delete-vacation="deleteVacationHandler"
    />

    <!-- show an add vacation form if its me (a logged in user) -->
    <add-vacation-form v-if="me" @on-submit="fetchUserWithVacations" />
  </div>

  <loader v-else />
</template>

<script lang="ts" setup>
import type { ApiUserResponse } from '@/types/api';

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import { useApi } from '@/composables/use-api';

import Loader from '@/lib/loader/loader.vue';
import UserInfo from '@/components/user-user-info.vue';
import AddVacationForm from '@/components/user-add-vacation-form.vue';

const api = useApi();
const route = useRoute();
const { user } = useStore();

// if its a current logged in user
const me = computed(() => +route.params.id === user.value?.id);

// fetch a user when a prop is changed
const {
  isFetching,
  execute: fetchUserWithVacations,
  data: fetchedUser
} = api<ApiUserResponse>(
  computed(() => `/users/${route.params.id}`),
  { refetch: true }
)
  .get()
  .json();

// delete a user vacation and refetch a user
const deleteVacationHandler = async (id: number) => {
  await api(`/vacations/${id}`).delete();

  await fetchUserWithVacations();
};
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  justify-content: space-around;
  padding: 16px 12px;

  :deep(.user-info) {
    flex: 1;
    padding-right: 30px;
  }

  :deep(.add-vacation) {
    flex-basis: 35%;
  }
}
</style>

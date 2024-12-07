<template>
  <div class="user-info">
    <div class="main-info">
      <div class="user-img">
        <img :src="defaultAvatar" alt="user" />
      </div>

      <ul class="user-description">
        <li>{{ user.firstName }} {{ user.lastName }}</li>
        <li>{{ user.email }}</li>
        <li>
          <b>{{ user.remainingVacationDays }}</b> vacation days left
        </li>
      </ul>
    </div>

    <div class="additional-info">
      <h4>Vacations</h4>

      <ul v-if="user.vacations.length" class="vacations-list" :class="{ me }">
        <li v-for="vacation of user.vacations" :key="vacation.id">
          {{ formatDate(vacation.startDate) }} -
          {{ formatDate(vacation.endDate) }}

          <x v-if="me" @click="$emit('delete-vacation', vacation.id)" />
        </li>
      </ul>

      <p v-else>There are no vacations</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/api';
import defaultAvatar from '@/assets/user-stub.png';
import X from '@/lib/icons/x/x.vue';

defineProps<{
  user: User;
  me: boolean;
}>();

defineEmits<{
  (event: 'delete-vacation', id: number): void;
}>();

const formatDate = (date: Date) => {
  const newDate = new Date(date);

  return newDate.toISOString().split('T')[0];
};
</script>

<style lang="scss" scoped>
.main-info {
  margin-bottom: 25px;

  display: flex;
  align-items: center;
  flex-direction: column;
}

.user-img {
  width: 70px;
  height: 70px;

  img {
    width: inherit;
    height: inherit;
    border-radius: 50%;
    border: 1px solid #d3dfeb;
  }
}

.user-description {
  list-style: none;

  li {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
  }
}

.additional-info {
  h4 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .vacations-list {
    list-style: none;

    &.me li:hover {
      background: #f6f9fb;

      &:hover {
        svg {
          display: block;
        }
      }
    }

    li {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 5px;
      position: relative;
      padding: 10px;
      border-radius: 6px;

      svg {
        display: none;
        position: absolute;
        right: 10px;
        top: 11px;
        cursor: pointer;
        padding: 4px;
      }
    }
  }

  p {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>

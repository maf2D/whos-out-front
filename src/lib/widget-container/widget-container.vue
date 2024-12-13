<template>
  <div class="widget-container">
    <div class="header">
      <div class="logo-container">
        <div class="logo">
          <icon-logo />
        </div>

        <h1>{{ title }}</h1>
      </div>

      <ul class="right-menu">
        <li v-for="menuItem of menu" :key="menuItem.title">
          <router-link :to="menuItem.url">
            {{ menuItem.title }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="slot">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { HeaderMenu } from '@/constants/header-menu';
import IconLogo from '@/lib/icons/logo/logo.vue';

withDefaults(
  defineProps<{
    title: string;
    menu: HeaderMenu[];
  }>(),
  {
    isLoggedIn: false,
    title: ''
  }
);
</script>

<style lang="scss" scoped>
.widget-container {
  max-width: 906px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #d3dfeb;
  border-radius: 6px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #d3dfeb;
  }

  .logo-container {
    display: flex;
    align-items: center;

    .logo {
      padding: 10px;
      background-color: #f1f5f8;
      border-radius: 6px;
    }

    h1 {
      margin-left: 10px;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .right-menu {
    list-style: none;

    display: flex;
    align-items: center;

    li {
      margin-left: 20px;
    }

    a {
      font-size: 14px;
      font-weight: 500;
      color: #000000;
      cursor: pointer;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .slot {
    min-height: 424px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;
    padding-bottom: 12px;

    position: relative;
  }
}
</style>

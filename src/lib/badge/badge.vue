<template>
  <div class="badge" data-testid="badge" :class="{ dark: type === 'dark' }">
    {{ label }}
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    // badge label
    label: number | string;

    // is badge active
    type: 'dark' | 'light';
  }>(),
  {
    // default values
    label: '',
    type: 'light'
  }
);
</script>

<style lang="scss" scoped>
.badge {
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: transparent;
  color: #476887;
  display: inline-flex;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 3px 6px;
  font-size: 10px;
  font-weight: 500;
  line-height: 1;

  &.dark {
    background-color: #f1f5f8;
  }
}
</style>

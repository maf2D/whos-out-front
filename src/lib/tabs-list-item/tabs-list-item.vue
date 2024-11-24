<template>
  <div
    class='tabs-list-item'
    :class='{ "active": isActive }'
    data-testid='tabs-list-item'
  >
    <span class='label'>
      {{ label }}
    </span>

    <badge
      v-if='badge'
      :label='badge'
      :type='isActive ? "light" : "dark"'
      class='badge'
    />
  </div>
</template>

<script lang='ts' setup>
  import Badge from '@/lib/badge/badge.vue';

  withDefaults(defineProps<{

    // tab label
    label: string;

    // tab type (active or not)
    isActive: boolean;

    // tab badge
    badge?: number | string;
  }>(), {

    // default values
    label: '',
    isActive: false,
    badge: ''
  });
</script>

<style lang='scss' scoped>
.tabs-list-item {
  padding: 9px 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  color: #6c869f;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F6F9FB;
  }

  &.active {
    background-color: #F1F5F8;
    border: 1px solid #E5ECF3;
  }

  .label {
    font-size: 14px;
    font-weight: 500;
    color: #000F30;
    line-height: 1;
  }

  .badge {
    margin-left: 8px;
  }
}

</style>

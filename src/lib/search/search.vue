<template>
  <div class="search-container" :class="{ focused }">
    <icon-search class="mr-2" />

    <input
      data-testid="search-input"
      class="search-input"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      @focus="focused = true"
      @blur="focused = false"
      ref="input"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import IconSearch from '@/lib/icons/search/search.vue';

withDefaults(
  defineProps<{
    // model value
    modelValue: string;

    // input placeholder
    placeholder?: string;
  }>(),
  {
    // default values
    modelValue: '',
    placeholder: 'Search...'
  }
);

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

// refs
const input = ref<HTMLElement | null>(null);
const focused = ref(false);

// input handler
const onInput = useDebounceFn((event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}, 500);

defineExpose({ focusSearch: () => input.value?.focus() });
</script>

<style lang="scss" scoped>
.search-container {
  padding: 6px 12px;
  background-color: #f6f9fb;

  display: flex;
  align-items: center;

  border-radius: 6px;
  border: 1px solid transparent;

  &.focused {
    border: 1px solid #2c8dff;
    box-shadow: 0 0 0 2px rgba(0, 133, 255, 0.16),
      0 1px 4px 0 rgba(9, 8, 61, 0.08);
  }
}

.search-input {
  background-color: transparent;
  outline: none;
  width: 100%;
  font-size: 14px;
  line-height: 24px;
  color: #000f30;
  border: none;

  &::placeholder {
    color: #6c869f;
  }
}
</style>

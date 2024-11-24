<template>
  <label :for="name" class="input">
    <input
      :id="name"
      :type="type"
      :class="{ error }"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />

    <span v-if="error" class="error">{{ error }}</span>
  </label>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    // name
    name: string;

    // type
    type: string;

    // model value
    modelValue: string;

    // input placeholder
    placeholder?: string;

    // error
    error: string;
  }>(),
  {
    // default values
    modelValue: '',
    placeholder: '',
    type: 'text'
  }
);
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  display: block;
  padding-bottom: 1.25rem;

  input {
    background-color: #F6F9FB;
    outline: 2px solid transparent;
    width: 100%;
    font-size: 14px;
    padding: 6px 10px;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 6px;

    &.error {
      border: 1px solid #f87171;
    }
  }

  span.error {
    font-size: 12px;
    color: #f87171;

    position: absolute;
    bottom: 0;
    left: 0;
    padding-top: 4px;
    width: 100%;
  }
}
</style>


<template>
  <label :for="name" class="input">
    <input
      :id="name"
      :type="type"
      :class="{ error }"
      :placeholder='placeholder'
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <span v-if="error" class="error">{{ error }}</span>
  </label>
</template>

<script lang='ts' setup>
  withDefaults(defineProps<{

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
  }>(), {

    // default values
    modelValue: '',
    placeholder: '',
    type: 'text'
  });
</script>

<style lang='scss' scoped>
  @import 'input';
</style>
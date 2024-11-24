<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang='scss' scoped>
.button {
  padding: 8px;
  width: 100%;
  font-size: 14px;
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #EDF2F7;
}
</style>

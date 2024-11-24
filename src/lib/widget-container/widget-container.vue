<template>
  <div class='widget-container'>
    <div class='header'>
      <div class='logo-container'>
        <div class='logo'>
          <icon-logo />
        </div>

        <h1>{{ text }}</h1>
      </div>

      <!-- <x
        class='close-btn'
        @click="$emit('close')"
      /> -->
    </div>

    <div class='slot'>
      <slot />
    </div>
  </div>
</template>

<script lang='ts' setup>
  // import X from '@/lib/icons/x/x.vue';
  import IconLogo from '@/lib/icons/logo/logo.vue';

  withDefaults(defineProps<{

    // widget text
    text: string;
  }>(), {

    // default values
    text: ''
  });

  defineEmits<{
    (event: 'close'): void;
  }>();
</script>

<style lang='scss' scoped>
.widget-container {
  max-width: 906px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #D3DFEB;
  border-radius: 6px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #D3DFEB;
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

  .close-btn {
    cursor: pointer;
  }

  .slot {
    min-height: 424px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
}

</style>

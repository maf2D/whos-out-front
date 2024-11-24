<template>
  <div class='users-list-item'>
    <div class='item-left'>
      <div class='avatar'>
        <img :src='img' :alt='title' />
      </div>

      <div class='info'>
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </div>
    </div>

    <div v-if="onVacation" class='item-right'>
      <span>
        <icon-plane />
      </span>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import IconPlane from '@/lib/icons/plane/plane.vue';

  withDefaults(defineProps<{

    // item title
    title: string;

    // item image
    img: string;

    // away until some date
    onVacation: boolean;

    // item subtitle
    subtitle?: string;

  }>(), {

    // default values
    title: '',
    img: '',
    subtitle: '',
    onVacation: false
  });
</script>

<style lang='scss' scoped>
.users-list-item {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 44px;
}

.item-left {
  display: flex;
  flex-direction: row;
  align-items: center;

  .avatar {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    flex-shrink: 0;

    img {
      border-radius: 50%;
      border: 1px solid #D3DFEB;
      width: 100%;
      height: 100%;
    }
  }

  .info {
    text-align: left;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      font-size: 14px;
      font-weight: 500;
      color: #000f30;
      line-height: 1;
    }

    p {
      font-size: 12px;
      color: #476887;
      line-height: 1;
    }
  }
}

.item-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;

  p {
    font-size: 12px;
    line-height: 1;
    color: #476887;
    margin-right: 8px;
  }

  span {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EDF2F7;
  }
}

</style>

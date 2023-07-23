<template>
  <a-button class="white-btn">
    <slot name="icon"/>
    <slot name="title" />
  </a-button>
</template>
<style lang="scss">
  .ant-btn.white-btn {
    background: $flowkit-white;
    color: $primary-red;
    height: 100%;
    border-radius: 8px;
    // width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid $primary-red
  }
</style>

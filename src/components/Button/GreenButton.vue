<template>
  <a-button class="green-btn">
    <slot name="icon"/>
    <slot name="title" />
  </a-button>
</template>
<style lang="scss">
  .ant-btn.green-btn {
    background: $flowkit-white;
    color: $status-active;
    height: 100%;
    border-radius: 8px;
    // width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid $status-active
  }
</style>

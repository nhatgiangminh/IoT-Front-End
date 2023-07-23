<template>
  <a-button class="red-btn">
    <slot name="icon"/>
    <slot name="title" />
  </a-button>
</template>
<style lang="scss" scoped>
  .red-btn {
    background: $primary-red;
    color: $flowkit-white;
    height: 100%;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 400;
    border: 1px solid $primary-red;
    &:hover {
      border: 1px solid $primary-red;
      color: $flowkit-white !important;
      font-weight: 400;
      box-shadow: 0 0 0 5px $primary-lightred;
    }
  }
</style>

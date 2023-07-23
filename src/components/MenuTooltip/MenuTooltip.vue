<template>
  <a-tooltip v-bind="$attrs" class="menu-tooltip">
    <template v-slot:title>
      <slot name="content" />
    </template>
    <div class="menutooltip-icon">
      <slot name="logo" />
    </div>
  </a-tooltip>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.ant-tooltip-arrow-content {
  background: $main-light;
}

.ant-tooltip-inner {
  background-color: white;
  color: black;
  padding: 0;

  .menu-tooltip {
    padding: 8px;
    padding-right: 30px;
    cursor: pointer;

    // border-bottom: 1px solid #d0d0d0;
    // &:last-child {
    //   border: none;
    // }
    &:hover {
      background-color: #eeeeee;
    }
  }
}

.ant-tooltip-arrow::before {
  background: none;
}

.menutooltip-icon {
  // padding: 5px 0;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  // &:hover {
  //   background-color: #eeeeee;
  //   border-radius: 50%;
  // }
}
</style>

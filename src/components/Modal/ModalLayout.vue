<template>
  <a-modal class="custom-modal" :visible="visible" @ok="handleOk" @cancel="handleCancel" :title="$attrs['title']"
    :width="$attrs['width']">
    <template #title>
      <slot name="title"/>
    </template>
    <slot></slot>
    <template #closeIcon>
      <img src="@/assets/Icon/FunctionIcons/CloseModalIcon.svg" />
    </template>
    <template #footer>
      <div class="button-field">
        <slot name="footer" />
      </div>
    </template>
  </a-modal>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({ visible: Boolean })
const emit = defineEmits(['submit', 'closeModal'])
const handleOk = () => {
  emit('submit')
}
const handleCancel = () => {
  emit('closeModal')
}
</script>
<style lang="scss">
.custom-modal.ant-modal {
  font-family: Roboto;

  .ant-modal-title {
    font-weight: 800;
    font-size: 32px;
    line-height: 38px;
    display: flex;
    align-items: center;
  }

  .button-field {
    width: 100%;
    display: flex;
    justify-content: center;

    .ant-btn {
      display: flex;
      justify-content: center;
      width: 20%;
    }
  }

  .ant-modal-footer {
    border: none
  }

  .ant-modal-header {
    border-bottom: none;
    border-radius: 8px;
  }

  .ant-modal-content {
    border-radius: 8px;
  }

  .ant-modal-body {
    padding-top: 0;
  }
}</style>

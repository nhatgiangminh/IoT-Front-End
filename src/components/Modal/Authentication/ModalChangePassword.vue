<template>
  <ModalLayout :visible="visible" width="35%" @closeModal="closeModal">
    <a-form :model="formChangePassword" ref="formRef" layout="vertical">
      <a-row class="modal-create-income">
        <a-col span="24">
          <a-form-item :label="t('ModalChangePassword.currentPassword')" name="oldPassword" :rules="rules.oldPassword">
            <a-input-password v-model:value="formChangePassword.oldPassword" />
          </a-form-item>
        </a-col>
        <a-col span=24>
          <a-form-item :label="t('ModalChangePassword.newPassword')" name="newPassword" :rules="rules.newPassword">
            <a-input-password v-model:value="formChangePassword.newPassword" />
          </a-form-item>
        </a-col>
        <a-col span=24>
          <a-form-item :label="t('ModalChangePassword.confirmNewPassword')" name="confirmNewPassword" :rules="rules.confirmPassword">
            <a-input-password v-model:value="formChangePassword.confirmNewPassword" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <RedButton @click="onSubmit">
        <template #title>
          {{ t('button.confirm') }}
        </template>
      </RedButton>
    </template>
  </ModalLayout>
</template>
<script setup>

import { defineComponent, defineProps, defineEmits, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'

import ModalLayout from '@/components/Modal/ModalLayout.vue'
import RedButton from '@/components/Button/RedButton.vue'

defineComponent({ ModalLayout })
defineProps({ visible: Boolean })
const emit = defineEmits(['update:visible'])
const formRef = ref()
const store = useStore()

const formChangePassword = reactive({
  oldPassword: null,
  newPassword: null,
  confirmNewPassword: null
})
const validatePass2 = async (_rule, value) => {
  if (value !== formChangePassword.newPassword) {
    return Promise.reject(new Error('Mật khẩu không trùng khớp'))
  } else {
    return Promise.resolve()
  }
}
const rules = {
  oldPassword: [{ required: true, message: 'Vui lòng nhập giá trị' }],
  newPassword: [{ required: true, message: 'Vui lòng nhập giá trị' }],
  confirmPassword: [{ validator: validatePass2 }, { required: true, message: 'Vui lòng nhập giá trị' }]
}

const closeModal = () => {
  formRef.value.resetFields()
  emit('update:visible', false)
}
const onSubmit = () => {
  formRef.value.validateFields().then((values) => {
    const userPassword = {
      ...values
    }
    delete userPassword.confirmNewPassword
    return store.dispatch('auth/changePassword', userPassword)
  }).then(() => {
    message.success('Đổi mật khẩu thành công!')
    formRef.value.resetFields()
    emit('update:visible', false)
    store.dispatch('auth/logout')
  }).catch((error) => {
    if (error.response?.data.error) {
      message.error(error.response.data.error)
    } else if (error.errorFields.length === 0) {
      message.error('Đổi mật khẩu thất bại!')
    }
  })
}
</script>
<style lang="scss">
.modal-create-income {}
</style>

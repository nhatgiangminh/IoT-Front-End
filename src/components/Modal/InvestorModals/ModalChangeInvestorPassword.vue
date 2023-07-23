<template>
  <ModalLayout :visible="visible" width="35%" @closeModal="closeModal">
    <a-form :model="formChangeInvestorPassword" ref="formRef" layout="vertical">
      <a-row class="modal-create-income">
        <a-col span="24">
          <a-form-item :label="t('ModalChangePassword.adminPassword')" name="adminPassword" :rules="rules.adminPassword">
            <a-input-password v-model:value="formChangeInvestorPassword.adminPassword" />
          </a-form-item>
        </a-col>
        <a-col span=24>
          <a-form-item :label="t('ModalChangePassword.investorPassword')" name="userPassword" :rules="rules.userPassword">
            <a-input-password v-model:value="formChangeInvestorPassword.userPassword" />
          </a-form-item>
        </a-col>
        <a-col span=24>
          <a-form-item :label="t('ModalChangePassword.confirmNewPassword')" name="confirmNewPassword" :rules="rules.confirmPassword">
            <a-input-password v-model:value="formChangeInvestorPassword.confirmNewPassword" />
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
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'

import ModalLayout from '@/components/Modal/ModalLayout.vue'
import RedButton from '@/components/Button/RedButton.vue'

defineComponent({ ModalLayout })
const props = defineProps({ visible: Boolean, investorId: String })
const { t } = useI18n()
const emit = defineEmits(['update:visible'])
const formRef = ref()
const store = useStore()

const formChangeInvestorPassword = reactive({
  adminPassword: null,
  userPassword: null,
  confirmNewPassword: null
})
const validatePass2 = async (_rule, value) => {
  if (value !== formChangeInvestorPassword.userPassword) {
    return Promise.reject(new Error(t('ModalChangePassword.checkConfirmNewPassword')))
  } else {
    return Promise.resolve()
  }
}
const rules = {
  adminPassword: [{ required: true, message: t('ModalChangePassword.validateAdminPassword') }],
  userPassword: [{ required: true, message: t('ModalChangePassword.validateNewPassword') }],
  confirmPassword: [{ validator: validatePass2 }, { required: true, message: t('ModalChangePassword.validateConfirmNewPassword') }]
}

const closeModal = () => {
  formRef.value.resetFields()
  emit('update:visible', false)
}
const onSubmit = () => {
  formRef.value.validateFields().then((values) => {
    const apiData = {
      ...values
    }
    delete apiData.confirmNewPassword
    return store.dispatch('investor/resetInvestorPassword', { id: props.investorId, apiData })
  }).then(() => {
    message.success('Đổi mật khẩu thành công!')
    formRef.value.resetFields()
    emit('update:visible', false)
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

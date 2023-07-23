<template>
  <ModalLayout :visible="visible" width="60%" @closeModal="handleClose">
    <template #title>
      <span>Thêm sinh viên</span>
    </template>
    <a-form :model="formState" ref="formRef" layout="vertical">
      <a-form-item name="listSinhVien" label="Chọn sinh viên" :rules="[{ required: true, message: ''}]">
        <a-select v-model:value="formState.listSinhVien" mode="multiple">
          <a-select-option v-for="sv in listStudent" :key="sv._id" :value="sv._id">
            {{ sv.fullName + ' - '+ sv.code }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <template #footer>
      <RedButton @click="onSubmit">
        <template #title>
          Xác nhận
        </template>
      </RedButton>
    </template>
  </ModalLayout>
</template>
<script setup>
import ModalLayout from '@/components/Modal/ModalLayout.vue'
import RedButton from '@/components/Button/RedButton.vue'
import { ref, computed, reactive, defineEmits, defineProps } from 'vue'
import { useStore } from 'vuex'

defineProps({ visible: Boolean })
const emit = defineEmits(['update:visible'])
const store = useStore()
const formRef = ref()
await store.dispatch('user/fetchListUser')
const listStudent = computed(() => store.getters['user/getListUser'])
const formState = reactive({
  listSinhVien: []
})

const onSubmit = () => {
  formRef.value.validateFields().then((values) => {
    return store.dispatch('classR/addSinhVien', values)
  })
    .then(() => {
      emit('update:visible', false)
      formRef.value.resetFields()
    })
    .catch((error) => {
      console.log(error)
    })
}
const handleClose = () => {
  emit('update:visible', false)
  formRef.value.resetFields()
}
</script>

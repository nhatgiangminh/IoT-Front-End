<template>
  <ModalLayout :visible="visible" @closeModal="handleClose" width="50%">
    <a-upload
      v-model:fileList="fileList"
      name="file"
      :action="action"
      :headers="headers"
      :show-upload-list="false"
      @change="handleChange"
   >
    <a-button class="upload-btn">
      <upload-outlined></upload-outlined>
      Click to Upload
    </a-button>
   </a-upload>
  </ModalLayout>
</template>
<script setup>
import ModalLayout from '@/components/Modal/ModalLayout.vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { ref, defineEmits, defineProps, computed, reactive } from 'vue'
import { message } from 'ant-design-vue'

const store = useStore()
const emit = defineEmits(['update:visible'])

const fileList = ref([])
const currentClassR = computed(() => store.getters['classR/getClass'])
const action = `${process.env.VUE_APP_AXIOS_ADMIN}` + `/v1/file/upload-file/${currentClassR.value._id}`
const headers = reactive({ Authorization: `Bearer ${localStorage.getItem('token')}` })

defineProps({ visible: Boolean })

const handleChange = (info) => {
  const status = info.file.status
  if (status === 'uploading') {
    return
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`)
    store.dispatch('classR/fetchAllFile')
    emit('update:visible', false)
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`)
  }
}
const handleClose = () => {
  emit('update:visible', false)
}
</script>
<style lang="scss">
.ant-btn.upload-btn {
  width: 100%;
  background: #d0d0d0;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  img {
    margin-right: 10px;
  }
}
.ant-upload.ant-upload-select {
  width: 90%;
}
</style>

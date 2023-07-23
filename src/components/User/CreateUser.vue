<template>
  <a-form
    class="create-investor"
    :model="formState"
    @finish="handleFinish"
    ref="formRef"
    :rules="rules"
    layout="vertical"
  >
    <a-row class="page-header">
      <a-col span="1">
        <img class="back-btn" src="@/assets/Icon/FunctionIcons/ArrowLeftIcon.svg" alt="" @click="router.push('/users')">
      </a-col>
      <a-col span="20">
        <span class="page-title">Tạo tài khoản</span>
      </a-col>
    </a-row>
    <a-row :gutter="[0, 8]">
      <a-col span="24">
        <span class="detail-title">Thông tin</span>
      </a-col>
      <a-col span="11">
        <a-form-item has-feedback name="fullName" label="Họ và tên">
          <a-input class="input-field" v-model:value="formState.fullName" />
        </a-form-item>
      </a-col>
      <a-col span="11" offset="1">
        <a-form-item has-feedback name="username" label="Tên người dùng">
          <a-input class="input-field" v-model:value="formState.username"/>
        </a-form-item>
      </a-col>
      <a-col span="11">
        <a-form-item has-feedback name="code" label="Mã số sinh viên/giảng viên">
          <a-input class="input-field" v-model:value="formState.code"/>
        </a-form-item>
      </a-col>
      <a-col span="11" offset="1">
        <a-form-item name="major" label="Ngành học">
          <a-input class="input-field" v-model:value="formState.major"/>
        </a-form-item>
      </a-col>
      <a-col span="11">
        <a-form-item has-feedback name="email" label="Email">
          <a-input class="input-field" v-model:value="formState.email"/>
        </a-form-item>
      </a-col>
      <a-col span="11" offset="1">
        <a-form-item name="role" label="Vai trò">
          <a-select v-model:value="formState.role">
            <a-select-option value="STUDENT">Sinh viên</a-select-option>
            <a-select-option value="TEACHER">Giảng viên</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <!-- <a-col span="24">
        <a-row :gutter="[0, 5]">
          <a-col span="24">{{ t('CreateUpdateInvestorPage.image') }}</a-col>
          <a-col span="11" class="avatar-container">
            <a-upload
              v-model:file-list="avatar"
              :action="useProcessEnv"
              :headers="header"
              accept="image/*"
              @change="handleChangeAvatar"
              name="file"
              :show-upload-list="false"
            >
              <a-button v-if="!avatarImgUrl" class="upload-btn">
                <img src="@/assets/Icon/FunctionIcons/AddWhiteIcon.svg">
                {{ t('CreateUpdateInvestorPage.addImage') }}
              </a-button>
              <img id="avatar" v-if="avatarImgUrl" :src="avatarImgUrl" alt="avatar" />
            </a-upload>
          </a-col>
        </a-row>
      </a-col> -->
    </a-row>
    <a-form-item>
      <a-col span="23" class="button-field">
        <RedButton html-type="submit">
          <template #icon>
            <img src="@/assets/Icon/FunctionIcons/AddUserIcon.svg" class="icon-btn" alt="">
          </template>
          <template #title>Xác nhận</template>
        </RedButton>
      </a-col>
    </a-form-item>
  </a-form>
</template>
<script setup>

import { message } from 'ant-design-vue'
import { reactive, ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// import { useProcessEnv } from '@/composables/process-env'
import RedButton from '@/components/Button/RedButton.vue'
// import { previewImage } from '@/composables/preview-image'

defineComponent({ RedButton })
const store = useStore()
const formRef = ref()
const router = useRouter()
// const header = reactive({ Authorization: `Bearer ${localStorage.getItem('token')}` })
const formState = reactive({
  fullName: null,
  code: null,
  username: null,
  email: null,
  major: null,
  role: null
})
// const avatar = ref([])
// const avatarImgUrl = ref('')
// const avatarName = ref(null)

const rules = reactive({
  fullName: [{ required: true, message: 'Vui lòng nhập giá trị' }],
  code: [
    { required: true, message: 'Vui lòng nhập giá trị' },
    { pattern: '^[0-9]+$', message: 'Mã số không đúng định dạng' }
  ],
  email: [
    { required: true, message: 'Vui lòng nhập giá trị' },
    { type: 'email', message: 'Email không đúng định dạng' }
  ],
  major: [{ required: true, message: 'Vui lòng nhập giá trị' }],
  role: [{ required: true, message: 'Vui lòng nhập giá trị' }]
  // username: [{ required: true, message: t('validate.userName') }]
})
const handleFinish = async () => {
  formRef.value.validateFields().then((values) => {
    const inputData = {
      ...values,
      birthDay: null
      // avatar: avatarName.value,
    }
    return store.dispatch('user/createUser', inputData)
  }).then(() => {
    message.success('Tạo tài khoản thành công!')
    router.push('/users')
    formRef.value.resetFields()
  }).catch((error) => {
    if (error.response?.data.error) {
      message.error(error.response.data.error)
    } else if (error.errorFields.length === 0) {
      message.error('Đã có lỗi xảy ra, vui lòng thử lại!')
    }
  })
}
// const handleChangeAvatar = info => {
//   if (info.file.status === 'uploading') {
//     return
//   }
//   if (info.file.status === 'done') {
//     avatarName.value = info.file.response.data.file_name
//     previewImage(info.file.originFileObj, (result) => {
//       avatarImgUrl.value = result
//     })
//   } else if (info.file.status === 'error') {
//     message.error(`${info.file.name} file upload failed.`)
//   }
// }

</script>
<style lang="scss" scoped>
  .create-investor {
    padding-bottom: 10px !important;
    // height: 100%;
    text-align: left;
    padding: 0 4%;
    .page-header {
      display: flex;
      align-items: center;
      padding: 20px 0;
      .back-btn {
        cursor: pointer;
      }
      .page-title {
        font-size: 32px;
        color: $primary-red;
        font-weight: bold;
      }
    }
    .detail-title {
      font-size: 20px;
      color: #434343;
      padding-bottom: 16px;
      font-weight: bold;
      padding-top: 15px;
      margin-right: 12px;
    }
    .language {
      width: 60px;
    }
    :deep(.ant-upload.ant-upload-select) {
      width: 100%;
    }
    .upload-btn {
      // &.ant-btn{
        width: 100%;
        background: #d0d0d0;
        padding: 30px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
      // }
        img {
        margin-right: 10px;
      }
      &:hover, &:focus {
        color:$primary-red;
        font-weight: 500;
        border-color: $primary-red
      }
    }
    .avatar-container {
      #avatar {
        object-fit: cover;
        width: 40%;
        height: auto;
      }
    padding-bottom: 16px;
    }
    .button-field {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>

<template>
  <a-form
    class="create-brand"
    :model="formUpdateProfile"
    @finish="handleFinish"
    ref="formRef"
    :rules="rules"
    layout="vertical"
  >
    <a-row class="page-header">
      <a-col span="1">
        <img class="back-btn" src="@/assets/Icon/FunctionIcons/ArrowLeftIcon.svg" alt="" @click="router.push('/profile')">
      </a-col>
      <a-col span="20">
        <span class="page-title">Cập nhật thông tin</span>
      </a-col>
    </a-row>
    <a-row :gutter="[0, 8]">
      <a-col span="24">
        <span class="detail-title">Thông tin chi tiết</span>
      </a-col>
      <a-col span="11">
        <a-form-item name="fullName" label="Họ tên">
          <a-input class="input-field" v-model:value="formUpdateProfile.fullName" />
        </a-form-item>
      </a-col>
      <a-col span="11" offset="1">
        <a-form-item has-feedback label="Mã số sinh viên/giảng viên" name="code">
          <a-input disabled class="input-field" v-model:value="formUpdateProfile.code"/>
        </a-form-item>
      </a-col>
      <a-col span="11">
        <a-form-item name="major" label="Ngành học">
          <a-input class="input-field" v-model:value="formUpdateProfile.major"/>
        </a-form-item>
      </a-col>
      <a-col span="11" offset="1">
        <a-form-item has-feedback name="username" label="Tên người dùng">
          <a-input class="input-field" v-model:value="formUpdateProfile.username"/>
        </a-form-item>
      </a-col>
      <a-col span="11">
        <a-form-item name="email" label="Email">
          <a-input class="input-field" v-model:value="formUpdateProfile.email"/>
        </a-form-item>
      </a-col>
      <a-col span="11" offset="1">
        <a-form-item name="role" label="Vai trò">
          <a-select v-model:value="formUpdateProfile.role">
            <a-select-option value="STUDENT">Sinh viên</a-select-option>
            <a-select-option value="TEACHER">Giảng viên</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <!-- <a-col span="24">
        <a-row :gutter="[0, 5]">
          <a-col span="24">{{ t('ProfilePage.image') }}</a-col>
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
                {{ t('ProfilePage.addImage') }}
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
          <template #title>Xác nhận </template>
        </RedButton>
      </a-col>
    </a-form-item>
  </a-form>
</template>
<script setup>

import { message } from 'ant-design-vue'
import { reactive, ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import RedButton from '@/components/Button/RedButton.vue'

const formRef = ref()
const store = useStore()
const router = useRouter()
const userProfile = computed(() => store.getters['user/getUser'])
const formUpdateProfile = ref({})
watchEffect(() => {
  if (userProfile.value) {
    formUpdateProfile.value = {
      fullName: userProfile.value.fullName,
      code: userProfile.value.code,
      username: userProfile.value.userName ?? null,
      email: userProfile.value.email,
      major: userProfile.value.major,
      role: userProfile.value.role.value
    }
  }
})

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
    const userData = {
      ...values
    }
    console.log(userData)
    return store.dispatch('user/editUser', { id: userProfile.value._id, userData })
  }).then(() => {
    message.success('Cập nhật thành công!')
  }).catch((error) => {
    if (error.response?.data.error) {
      message.error(error.response.data.error)
    } else if (error.errorFields.length === 0) {
      message.error('Đã có lỗi xảy ra, vui lòng thử lại!')
    }
  })
}

</script>
<style lang="scss">
  .create-brand {
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
    .id-image {
      object-fit: cover;
      width: 100%;
      height: auto;
    }
    .detail-title {
      font-size: 20px;
      color: #434343;
      padding-bottom: 16px;
      font-weight: bold;
      padding-top: 15px;
      margin-right: 12px;
    }
    .ant-upload.ant-upload-select {
      width: 100%;
    }
    .upload-btn {
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
    .input-field {
      .partner-name {
        width: 85%;
        border-radius: 8px 0 0 8px !important;
      }
      .language {
        width: 15%;
        :first-child {
          border-radius: 0 8px 8px 0 !important;
        }
      }
    }
  }
</style>

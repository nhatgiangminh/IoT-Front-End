<template>
  <a-row type="flex" align="middle" class="login-form-wrapper">
    <!-- <a-col span="10" class="login-img-container">
      <img src="@/assets/image/LoginImg.jpg" alt="img" />
    </a-col> -->
    <a-col :xs="{ span: 12, offset: 6 }" :md="{ span: 12, offset: 6 }" :lg="{ span: 8, offset: 8 }">
      <!-- <div class="login-logo-container">
        <img src="@/assets/HouseRoofLogo.svg" />
      </div> -->
      <div class="login-label-text">
        <div>Chào mừng</div>
        <div>đến với Have2Grad App</div>
      </div>
      <a-form @finish="onFinish" @finishFailed="onFinishFailed" :model="formModel" name="login">
        <a-form-item name="userName" :rules="rules.userName">
          <a-input class="form-item-container" placeholder="Tên đăng nhập" v-model:value="formModel.userName"></a-input>
        </a-form-item>
        <a-form-item name="password" :rules="rules.password">
          <a-input-password class="form-item-container" placeholder="Mật khẩu" v-model:value="formModel.password"></a-input-password>
        </a-form-item>
        <a-row>
          <a-col span="24" class="login-submit-btn">
            <a-button :disabled="!disableCheck" class="form-button" html-type="submit" type="primary">Đăng nhập</a-button>
          </a-col>
        </a-row>
      </a-form>
      <!-- <router-link to="/">Quên mật khẩu</router-link> -->
    </a-col>
  </a-row>
</template>
<script setup>
import { computed } from '@vue/reactivity'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const rules = reactive({
  userName: [{ required: true, message: 'Tên đăng nhập không được để trống!' }],
  password: [{ required: true, message: 'Mật khẩu không được để trống!' }]
})

// const userData = computed(() => store.getters['auth/getUserData'])

const formModel = reactive({
  userName: '',
  password: ''
})
const store = useStore()
const router = useRouter()
const onFinish = async values => {
  await store.dispatch('auth/login', { username: values.userName, password: values.password })
  router.replace({ name: 'ProfileUser' })
}
const onFinishFailed = error => {
  console.log('Failed', error)
}
const disableCheck = computed(() => Boolean(formModel.userName && formModel.password))

</script>

<style lang="scss">
.login-form-wrapper {
  height: 80vh;
}
.login-label-text {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 20px;
  text-align: left;
  :last-child {
    font-size: 24px;
    font-weight: 500;
  }
}
.login-img-container {
  img {
    min-height: 100vh;
    width: 100%;
    object-fit: cover;
  }
}
.form-item-container.ant-input {
  font-size: 16px;
  border-radius: 8px;
}
.form-item-container.ant-input-password {
  font-size: 16px;
  border-radius: 8px;
}
.form-button.ant-btn {
  width: 40%;
  font-weight: 500;
  border-radius: 8px;
  background-color: $primary-red;
  color: $light-gray;
  border-color: transparent;
  padding: 11px 0px;
  height: auto;
  font-size: 16px;
  &:hover {
    background-color: $primary-red;
    color: $light-gray;
  }
  &:focus {
    background-color: $primary-red;
  }
  &:disabled {
    background-color: #D4D4D4;
  }
}
.login-logo-container {
  margin-bottom: 50px;
}
.login-submit-btn {
  display: flex;
  justify-content: center;
}
</style>

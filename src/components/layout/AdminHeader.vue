<template>
  <a-layout class="header">
    <a-layout-header class="layout-header">
      <a-row justify="end">
        <!-- <a-col :lg="{ span: 1 }" :sm="{ span: 2 }" :xs="{ span: 4 }"><noti-icon /></a-col>
        <a-col :lg="{ span: 1 }" :sm="{ span: 2 }" :xs="{ span: 4 }"><message-icon /></a-col> -->
        <a-col :lg="{ span: 2 }" :sm="{ span: 3 }" :xs="{ span: 5 }">
          <a-dropdown trigger="click" placement="bottomLeft">
            <a-row>
              <a-col class="header-user-info">
                <img v-if="user?.avatarPath" :src="user.avatarPath" alt="profile" class="image-profile-header"/>
                <img v-else src="@/assets/Icon/HeaderIcons/ProfileImg.png" alt="profile" class="image-profile-header"/>
                <span>{{ user?.username ?? 'username' }}</span>
              </a-col>
            </a-row>
            <template #overlay>
              <a-menu @click="handleClickMenu">
                <a-menu-item key="profile">
                  <template #icon>
                    <user-outlined />
                  </template>
                  Thông tin cá nhân
                </a-menu-item>
                <a-menu-item key="change-password">
                  <template #icon>
                    <img src="@/assets/Icon/FunctionIcons/KeyIcon.svg" alt="" srcset="">
                  </template>
                  Đổi mật khẩu
                </a-menu-item>
                <a-menu-item key="logout">
                  <template #icon>
                    <LockFilled />
                  </template>
                  Đăng xuất
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-col>
        <!-- <a-col :lg="{ span: 1 }" :sm="{ span: 2 }" :xs="{ span: 4 }">
          <a-dropdown trigger="click" placement="bottomLeft">
            <global-outlined />
            <template #overlay>
              <a-menu @click="changeLanguage">
                <a-menu-item key="vi">
                  <template #icon>
                    <img src="@/assets/Icon/MenuIcons/VNFlagIcon.svg" class="language-icon"/>
                  </template>
                  {{ t('title.vietnamese') }}
                </a-menu-item>
                <a-menu-item key="en">
                  <template #icon>
                    <img src="@/assets/Icon/MenuIcons/USFlagIcon.svg" class="language-icon"/>
                  </template>
                  {{ t('title.english') }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-col> -->
        <!-- <a-col>
          <a-switch v-model:checked="checkDarkTheme" @change="changeTheme">
            <template #checkedChildren><img src="@/assets/sun.png" class="theme-mode-icon" /></template>
            <template #unCheckedChildren><img src="@/assets/moon.png" class="theme-mode-icon" /></template>
          </a-switch>
        </a-col> -->
      </a-row>
    </a-layout-header>
    <ModalChangePassword v-model:visible="visibleModalChangePassword" title="Đổi mật khẩu"/>
  </a-layout>
</template>
<script setup>
import { UserOutlined, LockFilled } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

import ModalChangePassword from '@/components/Modal/Authentication/ModalChangePassword.vue'
// import NotiIcon from '@/assets/Icon/HeaderIcons/NotiIcon.vue'
// import MessageIcon from '@/assets/Icon/HeaderIcons/MessageIcon.vue'

const store = useStore()
// const checkDarkTheme = ref(store.getters['getDarkTheme'])
const router = useRouter()
const visibleModalChangePassword = ref(false)
const user = computed(() => store.getters['auth/getUserData'])
const handleClickMenu = ({ key }) => {
  if (key === 'logout') {
    store.dispatch('auth/logout')
  } else if (key === 'profile') {
    router.push('/profile')
  } else {
    visibleModalChangePassword.value = true
  }
}
// const changeTheme = (checked) => {
//   store.commit('setDarkTheme', checked)
// }
// const changeLanguage = ({ key }) => {
//   window.location.reload()
//   store.commit('setLanguage', key)
//   locale.value = key
// }
</script>
<style lang="scss" scoped>
  .header {
    max-height: 64px;
    background: #fff;
    .theme-mode-icon {
      width: 12px;
      height: 12px;
    }
    .layout-header {
      z-index: 100;
      background: #fff;
      border-bottom: 1px solid $secondary-gray;
      box-shadow: 0px 2px 5px $secondary-gray;
    }
    .image-profile-header {
      cursor: pointer;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      object-fit: fill;
    }
    .layout-header {
      .logo {
        height: 60%;
        cursor: pointer;
      }
      .layout-header-title-container {
        margin-right: 10px;
        min-width: 150px;
        display: flex;
        align-items: center;
        .layout-header__title {
          display: flex;
          width: 100%;
          height: 32px;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          font-weight: 700;
          padding: 8px 12px;
          font-size: 16px;
          color: $main-black;
          border: 1px solid $secondary-gray;
          border-radius: 8px
        }
      }
    }
    .header-user-info {
      display: flex;
      align-items: center;
      gap: 10%;
      span {
        font-weight: 700;
        &:hover {
         cursor: pointer;
         color: $secondary-darkgrey;
        }
      }
    }
  }
</style>
<style lang="scss">
  .ant-layout-header.layout-header {
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      border-bottom: none;
      color: $primary-red
    }
    .ant-tabs-large > .ant-tabs-nav .ant-tabs-tab {
      padding: 20px 0;
    }
    .ant-tabs-tab:hover, .ant-tabs-tab-btn:focus, .ant-tabs-tab-remove:focus, .ant-tabs-tab-btn:active, .ant-tabs-tab-remove:active {
      color: $primary-red
    }
    .ant-tabs-top > .ant-tabs-nav::before, .ant-tabs-top > div > .ant-tabs-nav::before {
      display: none;
    }
    .ant-tabs-ink-bar {
      display: none;
      background: $primary-red;
    }
  }
</style>

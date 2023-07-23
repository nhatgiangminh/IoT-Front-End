<template>
  <a-row type="flex" class="profile-details">
    <a-col span="24" class="detail-profile-header">
      <a-row class="detail-profile-field">
        <a-col span="20" offset="1">
          <span class="page-title">Thông tin cá nhân</span>
        </a-col>
      </a-row>
    </a-col>
    <!-- <a-col :lg="{ span: 8, offset: 2 }" :xs="{ span: 22, offset: 1 }"> -->
    <a-col span="22" offset="1">
      <a-row type="flex" class="left">
        <a-col span="24" class="avatar-container">
          <img :src="user?.avatarPath ?? ''" class="avatar">
        </a-col>
        <a-col span="24" class="info-main">
          <div class="user-fullname">
            <span>{{ user.fullName }}</span>
          </div>
        </a-col>
        <a-col span="24" class="info-detail">
          <a-row class="user-detail">
            <a-col span="6" offset="8" class="info-title">Mã số sinh viên</a-col>
            <a-col span="6">{{ user.code }}</a-col>
          </a-row>
          <a-row class="user-detail">
            <a-col span="6" offset="8" class="info-title">Email</a-col>
            <a-col span="6">{{ user.email }}</a-col>
          </a-row>
          <a-row class="user-detail">
            <a-col span="6" offset="8" class="info-title">Ngày tham gia</a-col>
            <a-col span="6">{{ dateFormat(user.createdAt) }}</a-col>
          </a-row>
          <a-row class="user-detail">
            <a-col span="6" offset="8" class="info-title">Ngành học</a-col>
            <a-col span="6">{{ user.major }}</a-col>
          </a-row>
          <a-row class="user-detail">
            <a-col span="6" offset="8" class="info-title">Giới tính</a-col>
            <a-col span="6">{{ userGender(user.gender) }}</a-col>
          </a-row>
          <!-- <a-row class="user-detail">
            <a-col span="6" offset="8" class="info-title">Website</a-col>
            <a-col span="6" v-if="user.website">
              <a :href="user.website" target="_blank">{{ user.website }}</a>
            </a-col>
            <a-col span="6" v-else>Chưa cập nhật</a-col>
          </a-row> -->
          <a-row class="button-field">
            <RedButton class="edit-btn" @click="handleClickEdit">
              <template #icon>
                <img src="@/assets/Icon/FunctionIcons/EditIcon.svg" class="edit-icon" alt="">
              </template>
              <template #title>
                Kiểm tra thẻ
              </template>
            </RedButton>
          </a-row>
        </a-col>
      </a-row>
    </a-col>
    <ModalCheckRfid v-model:visible="visible"/>
  </a-row>
</template>
<script>
// import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

import { dateFormat } from '@/composables/convert-timestamp'
import RedButton from '../Button/RedButton.vue'
import { message } from 'ant-design-vue'
import ModalCheckRfid from '../Modal/ModalCheckRfid.vue'

export default {
  setup() {
    const store = useStore()
    // const router = useRouter()
    const userGender = (user) => user.gender === '0' ? 'Nam' : user.gender === '1' ? 'Nữ' : 'Khác'
    const visible = ref(false)
    const handleClickEdit = async () => {
      store.commit('setLoadingState', true)
      try {
        await store.dispatch('user/checkRfid')
        message.success('Lấy thông tin RFID thành công!')
        store.commit('setLoadingState', false)
        visible.value = true
      } catch (error) {
        store.commit('setLoadingState', false)
        if (error.response?.data.error) {
          message.error(error.response.data.error)
        } else {
          message.error('Đã có lỗi xảy ra, vui lòng thử lại!')
        }
      }
      store.commit('setLoadingState', false)
    }
    return {
      user: computed(() => store.getters['auth/getUserData']),
      userGender,
      handleClickEdit,
      dateFormat,
      visible
      // showModal
    }
  },
  components: { RedButton, ModalCheckRfid }
}
</script>
<style lang="scss">
.detail-profile-header {
  display: flex;
  align-items: center;
  padding: 20px 0;
  // background: $light-gray;
  text-align: left;

  .detail-profile-field {
    display: flex;
    width: 100%;
    align-items: center;

    .back-btn {
      cursor: pointer;
    }
  }

  .page-title {
    font-size: 32px;
    color: $primary-red;
    font-weight: bold;
  }
}

.ant-row.profile-details {
  text-align: left;
  // background: $light-gray;
  height: 100%;

  .left {
    padding: 16px 16px 22px 16px;
    background-color: white;
    display: flex;
    align-items: center;
    gap: 40px;
    height: 100%;

    .avatar-container {
      display: flex;
      // position: relative;
      justify-content: center;
      // align-items: center;
      padding-bottom: 20px;
      height: auto;
      width: 30%;

      .avatar {
        width: 25%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
      }
    }

    .info-main {
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      text-align: center;
    }

    .user-fullname {
      // padding-top: 16px;
      // display: flex;
      // justify-content: space-between;
      font-size: 24px;
      color: #EF4129;
      font-weight: 500;
    }

    .user-online {
      color: #00AC30;
      font-size: 12px;

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #00AC30;
        display: inline-block;
        margin-right: 5px;
      }
    }

    .user-offline {
      color: #d0d0d0;
      font-size: 12px;

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #d0d0d0;
        display: inline-block;
        margin-right: 5px;
      }
    }

    .user-detail {
      font-size: 14px;
      // display: flex;
      // justify-content: space-around;
      padding-top: 16px;
    }

    .button-field {
      display: flex;
      justify-content: flex-end;
      padding-top: 10px;

      .edit-btn {
        width: 15%;
        padding: 8px;
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
    }
  }

  .right {
    padding: 24px;
    background-color: white;
    height: 100%;
    gap: 10px;

    .info-container {
      width: 100%;

      &:first-child {
        margin-bottom: 40px;
      }

      .thong-tin-ca-nhan {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 16px;
      }

      .user-info {
        font-size: 16px;
        text-align: left;

        .info-content {
          padding-bottom: 12px;
        }

        .image-card {
          width: 80%
        }
      }
    }
  }

  .info-title {
    font-size: 14px;
    color: #868181;
    padding-bottom: 6px;
  }
}</style>

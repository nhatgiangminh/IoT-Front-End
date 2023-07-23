<template>
  <ModalLayout :visible="visible" width="50%" @closeModal="closeModal">
    <template #title>
      <span class="modal-detail-partner-title">Kiểm tra RFID</span>
    </template>
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
      </a-col>
    </a-row>
  </ModalLayout>
</template>
<script setup>

import { defineComponent, defineProps, defineEmits, computed } from 'vue'
import { useStore } from 'vuex'
import { dateFormat } from '@/composables/convert-timestamp'

import ModalLayout from '@/components/Modal/ModalLayout.vue'

defineComponent({ ModalLayout })
defineProps({ visible: Boolean })
const store = useStore()
const userGender = (user) => user.gender === '0' ? 'Nam' : user.gender === '1' ? 'Nữ' : 'Khác'
const user = computed(() => store.getters['user/getRfidData'])

const emit = defineEmits(['update:visible'])

const closeModal = () => {
  emit('update:visible', false)
}

</script>
<style lang="scss">
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
</style>

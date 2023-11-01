<template>
  <ModalLayout :visible="visible" width="50%" @closeModal="closeModal">
    <template #title>
      <span class="modal-detail-investor-title">Chi tiết người dùng</span>
    </template>
    <a-row class="modal-detail-investor">
      <a-col span="12">
        <img :src="userDetail.avatarPath" class="investor-image"/>
        <span class="investor-name">{{ userDetail.fullName }}</span>
      </a-col>
      <a-col span="12" class="investor-created-time">
        {{ dateFormat(userDetail.createdAt) }}
      </a-col>
      <a-col span="24" class="investor-detail-title">
        Thông tin
      </a-col>
      <a-col span="24">
        <a-row>
          <a-col span="4">
            Ngành
          </a-col>
          <a-col span="20" class="investor-detail">
            <span>{{ userDetail.major ?? '-' }}</span>
          </a-col>
        </a-row>
      </a-col>
      <a-col span="24">
        <a-row>
          <a-col span="4">
            Mã số
          </a-col>
          <a-col span="20" class="investor-detail">
            <span>{{ userDetail.code ?? '-' }}</span>
          </a-col>
        </a-row>
      </a-col>
      <a-col span="24">
        <a-row>
          <a-col span="4">
            Email
          </a-col>
          <a-col span="20" class="investor-detail">
            <span>{{ userDetail.email ?? '-' }}</span>
          </a-col>
        </a-row>
      </a-col>
      <a-col span=24>
        <RedButton @click="updateRfid">
          <template #title>
            Cập nhật thẻ
          </template>
        </RedButton>
      </a-col>
    </a-row>
  </ModalLayout>
</template>
<script setup>

import { defineComponent, defineProps, defineEmits, computed } from 'vue'
import { useStore } from 'vuex'

import ModalLayout from '@/components/Modal/ModalLayout.vue'
import { dateFormat } from '@/composables/convert-timestamp'
import RedButton from '@/components/Button/RedButton.vue'

defineComponent({ ModalLayout, RedButton })
defineProps({ visible: Boolean })
const store = useStore()
const userDetail = computed(() => store.getters['user/getUser'])

const emit = defineEmits(['update:visible'])

const closeModal = () => {
  emit('update:visible', false)
}

const updateRfid = async () => {
  store.commit('setLoadingState', true)
  await store.dispatch('user/updateRfid', userDetail.value._id)
  await store.dispatch('user/fetchListUser')
  store.commit('setLoadingState', false)
}
</script>
<style lang="scss" scoped>
.modal-detail-investor-title {
  margin-right: 12px;
}
.modal-detail-investor {
  .investor-image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 12px;
  }
  .investor-name {
    font-weight: 500;
    font-size: 24px;
  }
  .investor-created-time {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
  }
  .investor-detail-title {
    font-weight: 500;
    font-size: 20px;
    padding-top: 12px;
  }
  .investor-category-field {
    padding-top: 5px;
    :first-child {
      padding-bottom: 5px;
    }
    .investor-category {
      padding: 5px;
      background: $secondary-gray;
      font-weight: 500;
      margin-right: 8px;
      border-radius: 8px;
    }
  }
  .investor-detail {
    font-weight: 500;
    padding-bottom: 5px;
  }
}
</style>

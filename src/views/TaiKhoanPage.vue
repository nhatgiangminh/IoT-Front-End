<template>
  <a-row class="overview-wrapper">
    <a-col span="16" class="investor-page-title">
      Quản lý tài khoản
    </a-col>
    <a-col span="4" offset = 4 class="overview-btn-field">
      <RedButton class="manage-btn" @click="createUser">
        <template #title>
          Tạo tài khoản
        </template>
      </RedButton>
    </a-col>
    <!-- <a-col :span="10" class="investor-search-field">
      <input
        v-model="keywords"
        :placeholder="t('function.searchPlaceholder')"
        class="investor-search-input-field"
        @input="handleSearch(keywords)"
      >
      <SearchOutlined class="investor-search-icon" />
    </a-col> -->
    <a-col span="24" class="table-investor-container">
      <a-table
        :columns="columns"
        :data-source="listUser"
        :custom-row="openDetailUser"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <img :src="record.avatarPath" alt="" class="investor-image">
          </template>
          <template v-else-if="column.key === 'fullName'">
            <span class="investor-name">{{ record.fullName }}</span>
          </template>
          <template v-else-if="column.key === 'contact'">
            <a-row>{{ record.role.value }}</a-row>
            <a-row>{{ record.email }}</a-row>
          </template>
          <template v-else-if="column.key === 'rfid'">
            <span>{{ record.rfid ? record.rfid : 'Chưa cập nhật' }}</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-dropdown trigger="click" placement="bottomLeft" @click.stop>
              <img class="action-icon" src="@/assets/Icon/FunctionIcons/IconMenuTooltip.svg" alt="" srcset="">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="profile" @click.stop="updateUser(record)">
                    <template #icon>
                      <img src="@/assets/Icon/FunctionIcons/EditIconBlack.svg" alt="" srcset="">
                    </template>
                    Cập nhật
                  </a-menu-item>
                  <!-- <a-menu-item key="change-password" @click.stop="openModalChangeInvestorPassword(record)">
                    <template #icon>
                      <img src="@/assets/Icon/FunctionIcons/KeyIcon.svg" alt="" srcset="">
                    </template>
                    Đổi mật khẩu
                  </a-menu-item> -->
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </template>
      </a-table>
    </a-col>
    <ModalDetailUser v-model:visible="visibleModalDetailUser"/>
    <!-- <ModalChangeInvestorPassword v-model:visible="visibleModalChangeInvestorPassword" v-model:investor-id="investorId" title="Đổi mật khẩu" /> -->
  </a-row>
</template>
<script setup>

import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

import ModalDetailUser from '@/components/Modal/InvestorModals/ModalDetailUser.vue'
// import ModalChangeInvestorPassword from '@/components/Modal/InvestorModals/ModalChangeInvestorPassword.vue'
import RedButton from '@/components/Button/RedButton.vue'

const store = useStore()
await store.dispatch('user/fetchListUser')
const listUser = computed(() => store.getters['user/getListUser'])
const router = useRouter()
const visibleModalDetailUser = ref(false)
// const visibleModalChangeInvestorPassword = ref(false)
// const investorId = ref()
const columns = [
  {
    key: 'avatar',
    width: '1%'
  },
  {
    key: 'fullName',
    title: 'Tên người dùng',
    dataIndex: 'fullName'
  },
  {
    key: 'contact',
    title: 'Thông tin'
  },
  {
    key: 'code',
    dataIndex: 'code',
    title: 'Mã số sinh viên/giảng viên'
  },
  {
    key: 'rfid',
    title: 'Mã số thẻ'
  },
  {
    key: 'major',
    dataIndex: 'major',
    title: 'Ngành'
  },
  {
    key: 'action',
    width: '7%'
  }
]
// const openModalChangeInvestorPassword = (record) => {
//   investorId.value = record._id
//   visibleModalChangeInvestorPassword.value = true
// }
const openDetailUser = (record) => {
  return {
    onClick: async () => {
      await store.dispatch('user/getUser', record._id)
      visibleModalDetailUser.value = true
    }
  }
}
const createUser = () => {
  router.push('/users/create')
}
const updateUser = async (record) => {
  await store.dispatch('user/getUser', record._id)
  router.push(`/users/chinh-sua/${record._id}`)
}

</script>
<style lang="scss" scoped>
.overview-wrapper {
  margin-top: 15px;
  .overview-btn-field {
    display: flex;
    align-items: center;
    .manage-btn {
      height: 70%;
    }
  }
  .investor-search-field {
    display: flex;
    align-items: center;
    padding-left: 20px;

    .investor-search-input-field {
      min-height: 40px;
      width: 100%;
      border-radius: 6px;
      border: 1px solid #d0d0d0;
      z-index: 1;
      outline-offset: unset;
      padding-left: 5%;
      font-size: 14px;
      line-height: 25px;
    }

    .investor-search-icon {
      right: 5%;
      z-index: 10;
      position: absolute;
      color: #262626
    }
  }
  .table-investor-container {
    padding: 24px;
    .investor-website {
      color: $status-done;
      font-weight: 500;
      padding: 8px 0;
      border-radius: 8px;
      &:hover {
        background-color: $status-boxdone;
      }
    }
    .investor-image {
      height: 35px;
      width: 35px;
      border-radius: 8px;
    }
    .investor-name {
      font-weight: 500;
    }
    .action-icon {
      padding: 10px 15px;
      &:hover {
        background: $secondary-gray;
        border-radius: 8px;
      }
    }
    .category-name {
      display: inline-block;
      padding: 5px;
      font-weight: 500;
      border-radius: 8px;
      background-color: $secondary-gray;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .investor-page-title {
    text-align: left;
    padding: 12px 20px;
    font-size: 30px;
    font-weight: 600;
  }
}
</style>

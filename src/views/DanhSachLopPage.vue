<template>
  <a-row class="overview-wrapper">
    <a-col span="16" class="investor-page-title">
      Quản lý lớp học
    </a-col>
    <a-col span="4" offset = 4 class="overview-btn-field" v-if="user.role.value === 'ADMIN'">
      <RedButton class="manage-btn" @click="createClass">
        <template #title>
          Tạo lớp học
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
        :data-source="listClass"
        :custom-row="openDetailClass"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <span class="investor-name">{{ record.name }}</span>
          </template>
          <template v-else-if="column.key === 'time'">
            <a-row>{{ record.time.day }}</a-row>
            <a-row>{{ record.time.from }}</a-row>
            <a-row>{{ record.time.to }}</a-row>
          </template>
          <template v-else-if="column.key === 'code'">
            <span>{{ record.code ? record.code : 'Chưa cập nhật' }}</span>
          </template>
          <template v-else-if="column.key === 'amount'">
            <span>{{ record.amount }}</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-dropdown trigger="click" placement="bottomLeft" @click.stop>
              <img class="action-icon" src="@/assets/Icon/FunctionIcons/IconMenuTooltip.svg" alt="" srcset="">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="profile">
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
    <ModalCreateClass v-model:visible="visible" title="Tạo lớp học mới" v-if="user.role.value === 'ADMIN'"/>
  </a-row>
</template>
<script setup>

import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import RedButton from '@/components/Button/RedButton.vue'
import ModalCreateClass from '@/components/Modal/ModalCreateClass.vue'

const store = useStore()
const router = useRouter()
const user = computed(() => store.getters['auth/getUserData'])
await store.dispatch('classR/fetchListClass')
const listClass = computed(() => store.getters['classR/getListClass'])
const visible = ref(false)
const columns = [
  {
    key: 'name',
    title: 'Tên lớp',
    dataIndex: 'name'
  },
  {
    key: 'code',
    title: 'Mã lớp'
  },
  {
    key: 'description',
    title: 'Mô tả',
    dataIndex: 'description',
    elipsis: true
  },
  {
    key: 'amount',
    title: 'Số lượng tối đa'
  },
  {
    key: 'time',
    title: 'Thời gian'
  },
  {
    key: 'action',
    width: '7%'
  }
]

const createClass = () => {
  visible.value = true
}
const openDetailClass = (record) => {
  return {
    onClick: () => {
      router.push(`/classes/${record._id}`)
    }
  }
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

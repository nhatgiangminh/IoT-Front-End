<template>
  <a-row>
    <a-col span="24" class="table-investor-container">
      <a-table
        :columns="columns"
        :data-source="listUser"
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
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>
<script setup>
// import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
// const router = useRouter()
// const moveToLopHocDetail = (record) => {
//   return {
//     onClick: () => {
//       router.push(`/cu-dan/${record._id}`)
//     }
//   }
// }
const listUser = computed(() => store.getters['classR/getClass'].students)
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
    key: 'major',
    dataIndex: 'major',
    title: 'Ngành'
  },
  {
    key: 'action',
    width: '7%'
  }
]
</script>
<style scoped lang="scss">
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
</style>

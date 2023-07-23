<template>
  <a-row class="class-detail">
    <a-col span="20">
      <span class="class-detail--title">
        Buổi học {{ dateFormat(session.createdAt) }}
      </span>
    </a-col>
    <a-col span="12">
      <p>Số lượng tham gia: {{ session.attendance.length }}</p>
    </a-col>
    <a-col span="12">
      <p>Thời lượng: {{ duration(session.updatedAt, session.createdAt) }}</p>
    </a-col>
    <a-col span="24" class="table-investor-container">
      <a-table
        :columns="columns"
        :data-source="session.attendance"
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { dateFormat, duration } from '@/composables/convert-timestamp.js'

const store = useStore()
await store.dispatch('classR/fetchAllFile')
const session = computed(() => store.getters['session/getSession'])

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
  }
]
</script>
<style scoped lang="scss">
.class-detail {
  padding-top: 24px;
  &--title {
    font-size: 2.75rem;
    font-weight: 700;
  }
}
p {
  font-size: 1.125rem;
  font-weight: 400;
  margin-top: 24px;
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
</style>

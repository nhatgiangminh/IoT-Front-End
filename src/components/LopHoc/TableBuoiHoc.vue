<template>
  <a-row>
    <a-col span="24" class="table-investor-container">
      <a-table
        :columns="columns"
        :data-source="classR.sessions"
        :customRow="moveToSesion"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'createdAt'">
            <span class="investor-name">{{ dateFormat(record.createdAt) }}</span>
          </template>
          <template v-else-if="column.key === 'attendance'">
            <a-row>{{ record.attendance.length }}</a-row>
          </template>
          <template v-else-if="column.key === 'duration'">
            <a-row v-if="record.isActive">Đang diễn ra</a-row>
            <a-row v-else>{{ duration(record.updatedAt, record.createdAt) }}</a-row>
          </template>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { socket } from '@/socket'
import { message } from 'ant-design-vue'
import { dateFormat, duration } from '@/composables/convert-timestamp.js'

const store = useStore()
const router = useRouter()
const user = computed(() => store.getters['auth/getUserData'])
const moveToSesion = (record) => {
  return {
    onClick: async () => {
      if (record.isActive) {
        if (user.value.role.value === 'TEACHER') {
          await store.dispatch('session/fetchSession', record._id)
          router.push(`/classes/${classR.value._id}/session`)
        } else {
          try {
            store.commit('setLoadingState', true)
            await store.dispatch('session/joinSession', record._id)
            socket.connect()
            store.commit('setLoadingState', false)
            router.push(`/classes/${classR.value._id}/session`)
          } catch (error) {
            store.commit('setLoadingState', false)
            if (error.response?.data.error) {
              message.error(error.response?.data.error)
            } else {
              message.error('Đã có lỗi xảy ra vui lòng thử lại!')
            }
          }
        }
      } else {
        await store.dispatch('session/fetchSession', record._id)
        router.push(`/classes/session/${record._id}`)
      }
    }
  }
}
const classR = computed(() => store.getters['classR/getClass'])
const columns = [
  {
    key: 'createdAt',
    title: 'Ngày tạo',
    dataIndex: 'createdAt'
  },
  {
    key: 'attendance',
    dataIndex: 'attendance',
    title: 'Số lượng tham gia'
  },
  {
    key: 'duration',
    title: 'Thời lượng'
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

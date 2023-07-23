<template>
  <a-row class="class-detail">
    <a-col span="20">
      <span class="class-detail--title">
        {{ classR.name + ' - ' + classR.code }}
      </span>
    </a-col>
    <a-col span=4>
      <RedButton @click="openModal" v-if="user.role.value === 'ADMIN' || user.role.value === 'TEACHER'">
        <template #title>
          Thêm sinh viên
        </template>
      </RedButton>
    </a-col>
    <a-col span="12">
      <p>Số lượng: {{ classR.amount }}</p>
    </a-col>
    <a-col span="12">
      <p>Thời gian: thứ {{ classR.time.day }} từ {{  classR.time.from }} đến {{ classR.time.to }}</p>
    </a-col>
    <a-col span="4" offset="18" v-if="user.role.value==='TEACHER'">
      <RedButton @click="handleCreateSession">
        <template #title>
          Tạo buổi học
        </template>
      </RedButton>
    </a-col>
    <a-col span="24">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Thành viên">
          <TableLopHoc />
        </a-tab-pane>
        <a-tab-pane key="2" tab="File chia sẻ">
          <FileLopHoc />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Danh sách các buổi học">
          <TableBuoiHoc />
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <ModalThemSinhVien v-model:visible="visible" v-if="user.role.value==='ADMIN' || user.role.value==='TEACHER'"/>
  </a-row>
</template>
<script setup>
import { ref, computed } from 'vue'
import TableLopHoc from '@/components/LopHoc/TableLopHoc.vue'
import { useStore } from 'vuex'
import { socket } from '@/socket'
import RedButton from '@/components/Button/RedButton.vue'
import ModalThemSinhVien from '@/components/Modal/ModalThemSinhVien.vue'
import FileLopHoc from '@/components/LopHoc/FileLopHoc.vue'
import { useRouter, useRoute } from 'vue-router'
import TableBuoiHoc from '@/components/LopHoc/TableBuoiHoc.vue'

const store = useStore()
const route = useRoute()
await store.dispatch('classR/getClass', { classId: route.params.id })
await store.dispatch('classR/fetchAllFile')
const classR = computed(() => store.getters['classR/getClass'])
const user = computed(() => store.getters['auth/getUserData'])
const activeKey = ref('1')
const visible = ref(false)
const router = useRouter()

const openModal = () => {
  visible.value = true
}
const handleCreateSession = async () => {
  socket.connect()
  await store.dispatch('session/createSession')
  router.push(`/classes/${classR.value._id}/session`)
}
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
</style>

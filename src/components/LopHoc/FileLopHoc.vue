<template>
  <a-row class="list-file">
    <a-col span="3" class="list-file--button" v-if="user.role.value === 'TEACHER'">
      <RedButton @click="openModal">
        <template #title>
          Thêm file mới
        </template>
      </RedButton>
    </a-col>
    <a-col span="22" class="list-file--data">
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <DeleteOutlined @click="handleRemove(item)"/>
            </template>
            <a-list-item-meta
              :description="dateFormat(item.name.split('.')[0])"
            >
              <template #title>
                <a :href="item.url" target="_blank">{{ item.name }}</a>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-col>
    <ModalUploadFile v-model:visible="visible" v-if="user.role.value === 'TEACHER'"/>
  </a-row>
</template>
<script setup>
import RedButton from '@/components/Button/RedButton.vue'
import ModalUploadFile from '@/components/Modal/ModalUploadFile.vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { dateFormat } from '@/composables/convert-timestamp'

const store = useStore()

const visible = ref(false)
const openModal = () => {
  visible.value = true
}
const data = computed(() => store.getters['classR/getListFile'])
const user = computed(() => store.getters['auth/getUserData'])
const handleRemove = async (item) => {
  store.commit('setLoadingState', true)
  await store.dispatch('classR/removeFile', item.name)
  store.commit('setLoadingState', false)
}

</script>
<style lang="scss">
.list-file {
  &--button {
    margin: 24px 0px;
  }
}
</style>

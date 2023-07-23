<template>
  <a-row class="project-detail-container">
    <a-col span="16">
      <div class="project-title-container">
        <span class="project-title">{{ project.name }}</span>
      </div>
    </a-col>
    <a-col span="8" class="right">
      <!-- <a-button class="custom-btn-project" @click="openModal">
        <template #icon>
          <img src="@/assets/Icon/ThongTinPage/UpdateIcon.svg" alt="" class="add-icon">
        </template>
        <span>Cập nhật dự án</span>
      </a-button> -->
      <RedButton class="update-project-button" @click="openModal">
        <template #icon>
          <img src="@/assets/Icon/ThongTinPage/UpdateIcon.svg" />
        </template>
        <template #title>
          <span>Cập nhật dự án</span>
        </template>
      </RedButton>
    </a-col>
    <a-col span="16">
      <div class="detail-container">
        <span class="detail">Mô tả</span>
        <p style="white-space: pre-wrap;">{{ project.description }}</p>
      </div>
      <div class="address">
        <span><b>Địa chỉ:</b> {{ address }}</span>
      </div>
    </a-col>
    <a-col span="8" class="right">
      <div>
        <span class="detail">Hotline</span>
        <p class="hotline-project-detail"> {{ project.hotline }} </p>
      </div>
    </a-col>
    <ModalUpdateProject v-model:visible="visible" title="Cập nhật thông tin dự án"/>
  </a-row>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ModalUpdateProject from '@/components/Modal/ModalUpdateProject.vue'
import RedButton from '@/components/Button/RedButton.vue'
export default {
  components: { ModalUpdateProject, RedButton },
  setup() {
    const store = useStore()
    const addressGenerator = (value) => {
      const first = value ?? ''
      return (first ? first + ', ' : '')
    }
    const project = computed(() => store.getters['project/getCurrentProject'])
    const address = computed(() => {
      const formatAddress = addressGenerator(project.value.address) + addressGenerator(project.value.ward) + addressGenerator(project.value.district) + project.value.province
      return (formatAddress === 'null' ? 'Trống' : formatAddress)
    })
    const visible = ref(false)
    const openModal = () => {
      visible.value = true
    }
    return {
      project,
      address,
      visible,
      openModal
    }
  }
}
</script>
<style lang="scss" scoped>
.project-detail-container {
  padding: 24px;
  border-radius: 8px;
  background-color: $main-light;
  text-align: left;
  height: 100%;
  .project-title-container {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .project-title {
      font-size: 42px;
      font-weight: 800;
    }
  }
  .detail {
    font-size: 24px;
    font-weight: 800;
  }
  .detail-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 8px;
    min-height: 200px;
    overflow-wrap: break-word;
  }
  .address {
    display: flex;
    overflow-wrap: break-word;
    width: 100%;
  }
  .right {
    padding-left: 16px;
  }
  .hotline-project-detail {
    margin-top: 1em;
    font-size: 18px;
    font-weight: 500;
  }
}
// .ant-btn.custom-btn-project {
//   background: $primary-red;
//   color: white;
//   height: 4em;
//   border-radius: 8px;
//   width: 100%;
//   .add-icon {
//     padding-right: 5px;
//     width: auto;
//     height: auto;
//   }
// }
.update-project-button {
  height: 4em !important;
}
</style>

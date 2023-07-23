<template>
  <a-row :gutter="24">
    <a-col :lg="{span: 20}" :md="{span: 19}" style="text-align:left; margin-bottom: 23px;">
      <span class="duan-title">{{ t('message.hello') }}</span>
    </a-col>
    <a-col :md="{span: 5}" :lg="{span: 4}">
      <a-dropdown trigger="click" placement="bottomLeft">
        <RedButton class="custom-btn" @click="openModal">
          <template #icon>
            <img src="@/assets/Icon/FunctionIcons/AddWhiteIcon.svg" alt="" class="add-icon">
          </template>
          <template #title>{{ t('button.create') }}</template>
        </RedButton>
        <template #overlay>
          <a-menu @click="handleClickMenu">
            <a-menu-item key="tao-brand">
              <!-- <template #icon>
                <user-outlined />
              </template> -->
              {{ t('title.createBrand') }}
            </a-menu-item>
            <a-menu-item key="tao-gian-hang">
              <!-- <template #icon>
                <logout-outlined />
              </template> -->
              {{ t('title.createStall') }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-col>
    <a-col span="8" v-for="project in projects" :key="project._id">
      <DuAnCard :project="project"/>
    </a-col>
  </a-row>
  <!-- <ModalCreateProject v-model:visible="visible" title="Tạo dự án mới"/> -->
</template>
<script>

import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import DuAnCard from '@/components/DuAn/DuAnCard.vue'
import RedButton from '@/components/Button/RedButton.vue'
// import ModalCreateProject from '@/components/Modal/ModalCreateProject.vue';
export default {
  components: {
    DuAnCard,
    RedButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const projects = computed(() => store.getters['project/getListProjects'])
    const visible = ref(false)
    const { t } = useI18n()
    const handleClickMenu = ({ key }) => {
      if (key === 'tao-brand') {
        router.push('/tao-brand')
      }
    }
    const openModal = () => {
      // visible.value = true
    }
    return {
      handleClickMenu,
      projects,
      openModal,
      visible,
      t
    }
  }
}
</script>
<style lang="scss">
.duan-title {
  font-size: 24px;
  font-weight: 700;
  color: $primary-red;
}
.ant-btn.custom-btn {
  background: $primary-red;
  color: white;
  height: 70%;
  border-radius: 8px;
  width: 100%;
  .add-icon {
    padding-right: 5px;
  }
}
</style>

<template>
  <a-spin :spinning="isLoading">
    <!-- <ErrorPage v-if="error" :error="error">
    </ErrorPage> -->
    <a-layout class="layout-admin">
      <AdminSider class="admin-sider" />
      <a-layout>
        <AdminHeader class="admin-header" :isHomePage="false" />
        <AdminContent class="layout-content" :class="collapsed" />
      </a-layout>
    </a-layout>
  </a-spin>
</template>
<script>
import { computed, defineComponent, onBeforeMount, ref, onErrorCaptured } from 'vue'
import { useStore } from 'vuex'

import AdminSider from '@/components/layout/AdminSider.vue'
import AdminContent from '@/components/layout/AdminContent.vue'
import AdminHeader from '@/components/layout/AdminHeader.vue'
// import ErrorPage from '@/views/ErrorPage.vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    AdminSider,
    AdminContent,
    AdminHeader
    // ErrorPage
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const isLoading = computed(() => store.getters['getLoadingState'])
    const error = ref(null)
    onErrorCaptured((e) => {
      error.value = e
    })
    onBeforeMount(() => {
      if (route.path.slice(1).indexOf('/') === -1) {
        sessionStorage.setItem('menuItem', route.path.slice(1))
      } else {
        sessionStorage.setItem('menuItem', route.path.slice(1).substring(0, route.path.slice(1).indexOf('/')))
      }
    })
    return {
      collapsed: computed(() => store.state.collapsed ? 'collapsed' : 'unCollapsed'),
      isLoading,
      error
    }
  }
})
</script>
<style lang="scss" scoped>
.layout-admin {
  background: $main-light;
  flex-direction: row;

  .admin-sider {
    position: fixed;
    z-index: 1000;
    overflow: auto;
    height: 100vh;
  }

  .admin-header {
    position: fixed;
    width: 100%;
    z-index: 100;
  }
}

.ant-layout-content.layout-content {
  margin-top: 64px;
  background: $main-light;
}

.collapsed {
  margin-left: 100px;
}

.unCollapsed {
  margin-left: 270px;
}
</style>

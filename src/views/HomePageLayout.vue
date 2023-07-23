<template>
  <a-layout>
    <AdminHeader :isHomePage="true" class="admin-header" />
    <Suspense>
      <AdminContent class="layout-content" />
      <template #fallback>
        <a-layout-content class="layout-content">
          <LoadingOutlined :style="{ marginTop: '60px', fontSize: '64px' }" />
        </a-layout-content>
      </template>
    </Suspense>
  </a-layout>
</template>
<script>
import AdminContent from '@/components/layout/AdminContent.vue'
import AdminHeader from '@/components/layout/AdminHeader.vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    AdminContent,
    AdminHeader,
    LoadingOutlined
  },
  setup() {

  }
}
</script>
<style lang="scss">
.layout-admin.ant-layout {
  flex-direction: row;
}

.ant-layout-content.layout-content {
  // height: calc(100vh - 64px);
  // background: $light-gray;
  margin-top: 64px;
  // padding-top: 20px;
  // height: 100%;
}

.admin-header {
  position: fixed;
  width: 100vw;
  z-index: 100;
}
</style>

<template>
  <a-layout-content>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <Suspense timeout="0">
          <component :is="Component"></component>
          <template #fallback>
            <div>
              <LoadingOutlined :style="{margin: '20% 45%', fontSize: '64px'}"/>
            </div>
          </template>
        </Suspense>
      </template>
    </router-view>
  </a-layout-content>
</template>
<script>
import { defineComponent } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    LoadingOutlined
  }
})
</script>
<style lang="scss">
.layout-content.ant-layout-content {
  margin-left: calc(200px);
}
</style>

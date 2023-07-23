<template>
  <div class="duan-page-wrapper">
    <a-row>
      <a-col span="6" class="side-bar-duan-page">
        <DuAnSideBar />
      </a-col>
      <a-col span="18" offset="6" style="padding:24px 16px;">
        <DuAnList />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import DuAnList from '@/components/DuAn/DuAnList.vue'
import DuAnSideBar from '@/components/DuAn/DuAnSideBar.vue'
// import { onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  components: { DuAnList, DuAnSideBar },
  async setup() {
    const store = useStore()
    // onMounted(async () => {
    await store.dispatch('project/fetchListProjects')
    // })
  }
}
</script>
<style lang="scss">
.duan-page-wrapper {
  min-height: 100%;
  background-color: $light-gray;
  .side-bar-duan-page {
    min-height: calc(100vh - 64px);
    position: fixed;
    padding: 24px 16px;
    width: 100%;
    background-color: $main-light;
  }
}
</style>

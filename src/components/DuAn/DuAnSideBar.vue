<template>
  <a-row class="lef-page">
    <a-col span="24" style="text-align:left">
      <span>DỰ ÁN</span>
      <div class="duan-search-field">
        <input
          v-model="keyword"
          class="input-field"
          @input="handleSearch(keyword)"
        >
        <search-outlined class="search-icon"/>
      </div>
    </a-col>
    <a-col span="24">
      <div class="list-item-container">
        <DuAnItem  v-for="project in availabelProjects" :key="project._id" :project="project" @click="onClick(project._id)"/>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { SearchOutlined } from '@ant-design/icons-vue'
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import DuAnItem from '@/components/DuAn/DuAnItem.vue'

export default {
  components: {
    SearchOutlined,
    DuAnItem
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const keyword = ref('')
    const projects = computed(() => store.getters['project/getListProjects'])
    const onClick = (id) => {
      router.push(`thong-tin/${id}`)
    }
    const availabelProjects = ref([...projects.value])
    const handleSearch = (keyword) => {
      const filteredProject = projects.value.filter((pj) => {
        return pj.name.toLowerCase().includes(keyword.toLowerCase())
      })
      availabelProjects.value = [...filteredProject]
    }
    watch(projects, () => {
      keyword.value = ''
      availabelProjects.value = [...projects.value]
    })
    return {
      keyword,
      projects,
      onClick,
      handleSearch,
      availabelProjects
    }
  }
}
</script>
<style lang="scss">
.lef-page {
  width: 100%;
  .duan-search-field {
    margin: 10px 0px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    // height: 80%;
    .input-field {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #d0d0d0;
      z-index: 1;
      outline-offset: unset;
      padding: 10px 16px;
      font-size: 14px;
    }
    .search-icon {
      right: 5%;
      z-index: 10;
      position: absolute;
      color: #262626
    }
  }
  .list-item-container {
    max-height: 70vh;
    overflow-y: auto;
  }
  #navigate {
    margin-top: 20px;
    display: block;
    border-radius: 4px;
    background-color: $primary-lightgrey;
  }
}
</style>

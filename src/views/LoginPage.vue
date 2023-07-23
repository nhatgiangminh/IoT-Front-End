<template>
  <div>
    <a-spin :spinning="isLoading">
    <router-view></router-view>
  </a-spin>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const isLoading = computed(() => store.getters['getLoadingState'])
</script>
<style></style>

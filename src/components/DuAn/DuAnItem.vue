<template>
  <div class="project-item-container">
    <div class="img-container">
      <img :src="project.thumbnailPath" alt="project">
    </div>
    <div class="project-item-name-container">
      <span>{{ project.name.toUpperCase() }}</span>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

defineProps({ project: Object })
</script>
<style lang="scss" scoped>
.project-item-container {
  display: flex;
  width: 100%;
  padding: 16px;
  align-items: center;
  gap: 20px;
  min-height: 7em;
  border-bottom: 0.5px solid #d0d0d0;
  &:hover {
    cursor: pointer;
    background-color: #d0d0d061;
  }
  .project-item-name-container {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 3;
    span {
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      overflow-wrap: break-word;
    }
  }
  .img-container {
    flex: 2;
    min-width: 60px;
    height: 100%;
    img {
      width: 100%;
      max-height: 70px;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>

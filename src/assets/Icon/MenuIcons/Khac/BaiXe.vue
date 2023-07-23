<template>
  <icon>
    <template #component>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_2932_13078" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <rect width="16" height="16" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_2932_13078)">
          <path
            d="M5.33333 14C4.96667 14 4.65289 13.8696 4.392 13.6087C4.13067 13.3473 4 13.0333 4 12.6667V3.33333C4 2.96667 4.13067 2.65267 4.392 2.39133C4.65289 2.13044 4.96667 2 5.33333 2H8.66667C9.77778 2 10.7222 2.38889 11.5 3.16667C12.2778 3.94444 12.6667 4.88889 12.6667 6C12.6667 7.11111 12.2778 8.05556 11.5 8.83333C10.7222 9.61111 9.77778 10 8.66667 10H6.66667V12.6667C6.66667 13.0333 6.53622 13.3473 6.27533 13.6087C6.014 13.8696 5.7 14 5.33333 14ZM6.66667 7.33333H8.8C9.16667 7.33333 9.48067 7.20267 9.742 6.94133C10.0029 6.68044 10.1333 6.36667 10.1333 6C10.1333 5.63333 10.0029 5.31933 9.742 5.058C9.48067 4.79711 9.16667 4.66667 8.8 4.66667H6.66667V7.33333Z"
            fill="currentColor" />
        </g>
      </svg>
    </template>
  </icon>
</template>
<script>
import { defineComponent } from 'vue'
import Icon from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    Icon
  }
})
</script>
<style scoped>
.custom-icons-list :deep(.anticon) {
  margin-top: 6px;
}
</style>

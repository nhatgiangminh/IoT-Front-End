<template>
  <icon>
    <template #component>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_3471_13143" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <rect width="16" height="16" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_3471_13143)">
          <path
            d="M3 14C2.72222 14 2.48622 13.9027 2.292 13.708C2.09733 13.5138 2 13.2778 2 13V11.7333L4.66667 9.36667V14H3ZM5.33333 14V11.3333H10.6667V14H5.33333ZM11.3333 14V8.53334L8.48333 6.00001L10.5 4.21667L13.6667 7.03334C13.7778 7.13334 13.8611 7.24712 13.9167 7.37467C13.9722 7.50267 14 7.6389 14 7.78334V13C14 13.2778 13.9027 13.5138 13.708 13.708C13.5138 13.9027 13.2778 14 13 14H11.3333ZM2 10.8333V7.78334C2 7.6389 2.02778 7.50001 2.08333 7.36667C2.13889 7.23334 2.22222 7.12223 2.33333 7.03334L7.33333 2.60001C7.42222 2.51112 7.52511 2.44712 7.642 2.40801C7.75844 2.36934 7.87778 2.35001 8 2.35001C8.12222 2.35001 8.24178 2.36934 8.35867 2.40801C8.47511 2.44712 8.57778 2.51112 8.66667 2.60001L10 3.78334L2 10.8333Z"
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

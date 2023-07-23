<template>
  <div class="chitiet-profile-page-wrapper">
    <ProfileUser />
  </div>
</template>
<script>
import ProfileUser from '@/components/Authenticate/ProfileUser.vue'
export default {
  components: { ProfileUser },
  setup() {

  }
}
</script>
<style lang="scss">
.chitiet-profile-page-wrapper {
  height: calc(100vh - 64px);
}
</style>

<template>
  <a-row class="streaming-page">
    <a-col span="24" class="streaming-page--title">
      <p>Lớp {{ classR.name }} {{ classR.code }} stream</p>
    </a-col>
    <a-col span="12" offset="6">
      <div class="streaming-page--container">
        <img :src="videoSrc" v-if="state.imageString" class="stream"/>
        <img v-else src="@/assets/no-data.svg" class="nodata"/>
      </div>
    </a-col>
    <a-col span="4" offset="20" v-if="user.role.value==='TEACHER' || user.role.value==='ADMIN'">
      <RedButton @click="finishHandler">
        <template #title>
          Kết thúc buổi học
        </template>
      </RedButton>
    </a-col>
  </a-row>
</template>
<script setup>
import RedButton from '@/components/Button/RedButton.vue'
import { state, socket } from '@/socket'
import { computed, onUnmounted, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

onUnmounted(() => {
  // socket.emit('cancel-stream')
  socket.disconnect()
})
onMounted(() => {
  socket.emit('request')
})
const router = useRouter()
const videoSrc = computed(() => `data:image/jpeg;base64,${state.imageString}`)
const store = useStore()
const classR = computed(() => store.getters['classR/getClass'])
const user = computed(() => store.getters['auth/getUserData'])

const finishHandler = async () => {
  await store.dispatch('session/endSession')
  socket.emit('cancel-stream')
  router.go(-1)
}

</script>
<style lang="scss" scoped>
.streaming-page {
  &--title {
    display: flex;
    justify-content: center;
    margin: 100px 0px 50px 0px;
    p {
      font-size: 2rem;
      font-weight: bold;
    }
  }
  &--conatiner {
    width: 100%;
    height: auto;
    .stream {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
    .nodata {
      height: auto;
      width: 50%;
      object-fit: contain;
    }
  }
}
</style>

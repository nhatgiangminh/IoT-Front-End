<template>
    <a-config-provider :locale="lang === 'en' ? enUS : viVN">
      <router-view></router-view>
    </a-config-provider>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const lang = computed(() => store.getters['getLanguage'])

    return {
      lang
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import "@/assets/style/content-style.css";
@import "@/assets/style/antdv-custom-style.scss";
  #app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    // background-color: red;
    color: #2c3e50;
    height: 100%;
    background: $main-light;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: $secondary-darkgrey;
    border-radius: 20px;
  }
  ::-webkit-scrollbar:horizontal {
    height: 8px;
  }
</style>

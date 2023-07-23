import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import { setup } from '@/plugins/axios'
import router from '@/router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import HighchartsVue from 'highcharts-vue'

setup(store)

const app = createApp(App)
app.use(Antd).use(store).use(router).use(HighchartsVue).mount('#app')

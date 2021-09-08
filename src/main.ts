import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from './router'
import './assets/styles/scss/global.scss'

import elementplus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

app.use(VueRouter).use(elementplus).mount('#app')

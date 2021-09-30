import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/scss/global.scss'

import elementplus from 'element-plus'
import locale from 'element-plus/packages/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'

import store from './store'

import Packages from './package'

const app = createApp(App)

app.use(router).use(store).use(elementplus, { size: 'small ', locale }).use(Packages).mount('#app')

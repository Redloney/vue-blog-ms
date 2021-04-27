import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from './router'
import axios from 'axios'
const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(VueRouter)
  .mount('#app')

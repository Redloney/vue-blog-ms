import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../pages/login.vue')
  },
  {
    path: '/Home',
    component: () => import('../pages/Home.vue')
  },
]

const VueRouter = createRouter({
  history: createWebHistory(),
  routes
})

export default VueRouter
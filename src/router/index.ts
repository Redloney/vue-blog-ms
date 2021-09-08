import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home',
  },
  {
    path: '/login',
    component: () => import('../pages/login.vue'),
  },
  {
    path: '/Home',
    component: () => import('../pages/index.vue'),
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '',
        redirect: '/wellcome',
      },
      {
        path: '/wellcome',
        component: () => import('../container/wellcome.vue'),
        meta: {
          title: '欢迎页',
        },
      },
      {
        path: '/blog/article',
        component: () => import('../container/article.vue'),
        meta: {
          title: '文章管理',
        },
      },
    ],
  },
]

const VueRouter = createRouter({
  history: createWebHistory(),
  routes,
})

export default VueRouter

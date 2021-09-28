import { login } from './../api/user'
import lodash from 'lodash'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import storage from '../utils/storage'
import NProgress from 'nprogress'

NProgress.configure({
  parent: '#app',
  showSpinner: false,
  easing: 'case',
  speed: 500,
})

import 'nprogress/nprogress.css'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    meta: {
      title: '登录页',
    },
    component: () => import('../view/login.vue'),
  },
  {
    path: '/main',
    component: () => import('../layout/layout.vue'),
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '',
        component: () => import('../container/main.vue'),
      },
      {
        path: '404',
        component: () => import('../container/404.vue'),
        meta: {
          title: '404',
        },
      },
    ],
  },
  {
    path: '/role',
    component: () => import('../layout/layout.vue'),
    meta: {
      title: '角色管理',
    },
    children: [
      {
        path: '/role',
        component: () => import('../container/system/role.vue'),
        meta: {
          title: '',
        },
      },
    ],
  },
  {
    path: '/blog',
    component: () => import('../layout/layout.vue'),
    meta: {
      title: '博客信息',
    },
    children: [
      {
        path: '',
        component: () => import('../container/article/home.vue'),
      },
      {
        path: 'article',
        component: () => import('../container/article/article.vue'),
        meta: {
          title: '文章管理',
        },
      },
      {
        path: 'comment',
        component: () => import('../container/comment/comment.vue'),
        meta: {
          title: '留言管理',
        },
      },
      {
        path: 'user',
        component: () => import('../container/user/user.vue'),
        meta: {
          title: '用户管理',
        },
      },
    ],
  },
]

const VueRouter = createRouter({
  history: createWebHistory(),
  routes,
})

//全局守卫
VueRouter.beforeEach((to, _from, next) => {
  NProgress.start() // 进度条开始加载
  // token 验证 没有 token 不准许进一步操作
  // const token = storage.get('token')
  // if (lodash.isEmpty(token)) {
  //     next({ path: '/login' })
  // }
  if (to.matched.length !== 0) {
    next()
    document.title = to.meta.title as string
  } else {
    next({ path: '/main/404' })
  }
})

VueRouter.afterEach(() => {
  NProgress.done() // 进度条记载完毕
})

export default VueRouter

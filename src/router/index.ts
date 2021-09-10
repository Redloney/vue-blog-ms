import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
        name: '404',
        path: '/404',
        component: () => import('../container/404.vue'),
        meta: {
          title: '页面不存在',
        },
      },
      {
        name: 'wellcome',
        path: '/wellcome',
        component: () => import('../container/wellcome.vue'),
        meta: {
          title: '欢迎页',
        },
      },
      {
        name: 'blog',
        path: '/blog',
        component: () => import('../pages/blog.vue'),
        meta: {
          title: '博客',
        },
        children: [
          {
            name: '',
            path: '',
            component: () => import('../container/article/home.vue'),
            meta: {
              title: '博客数据',
            },
          },
          {
            name: 'article',
            path: 'article',
            component: () => import('../container/Article/Article.vue'),
            meta: {
              title: '文章管理',
            },
          },
          {
            name: 'classify',
            path: 'classify',
            component: () => import('../container/Article/Classify.vue'),
            meta: {
              title: '文章分类',
            },
          },
        ],
      },
    ],
  },
]

const VueRouter = createRouter({
  history: createWebHistory(),
  routes,
})

//全局守卫
VueRouter.beforeEach((to, from, next) => {
  if (to.matched.length !== 0) {
    next()
    document.title = to.meta.title as string
  } else {
    next({ path: '/404' })
  }
})

export default VueRouter

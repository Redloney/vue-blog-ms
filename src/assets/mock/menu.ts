export const menu = [
  {
    path: '/main',
    label: '首页',
    icon: 'iconshouye',
    disabled: false,
    children: [],
  },
  {
    path: '/role',
    label: '角色管理',
    icon: 'iconuser',
    disabled: false,
    children: [],
  },
  {
    path: '/blog',
    label: '博客管理',
    icon: 'iconpaper',
    disabled: false,
    children: [
      {
        path: '/blog',
        label: '博客信息',
        disabled: false,
      },
      {
        path: '/blog/article',
        label: '文章管理',
        disabled: false,
      },
      {
        path: '/blog/comment',
        label: '留言管理',
        disabled: false,
      },
      {
        path: '/blog/user',
        label: '用户管理',
        disabled: false,
      },
      {
        path: '/blog/category',
        label: '分类管理',
        disabled: false,
      },
      {
        path: '/blog/tag',
        label: '标签管理',
        disabled: false,
      },
    ],
  },
  {
    path: '/setting',
    label: '系统管理',
    icon: 'iconshezhi',
    disabled: false,
    children: [],
  },
  {
    path: '/laboratory',
    label: '实验室',
    icon: 'iconlab',
    disabled: false,
    children: [],
  },
]

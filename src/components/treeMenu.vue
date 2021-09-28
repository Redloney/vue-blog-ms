<template>
  <template v-for="el in state.menu">
    <!-- 一级菜单 -->
    <el-menu-item :disabled="el.disabled" :index="el.path" v-if="el.children.length <= 0">
      <i :class="`iconfont ${el.icon}`"></i>
      <template #title>
        <span>{{ el.label }}</span>
      </template>
    </el-menu-item>
    <!-- 二级菜单 -->
    <el-submenu :disabled="el.disabled" v-else :index="el.path">
      <template #title>
        <i :class="`iconfont ${el.icon}`"></i>
        <span>{{ el.label }}</span>
      </template>
      <el-menu-item :disabled="elc.disabled" v-for="elc in el.children" :index="elc.path">
        <template #title>
          <span>{{ elc.label }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </template>
</template>

<script lang="ts" setup>
import { defineProps, reactive } from "vue";
defineProps({
  userMenu: {
    type: [Array],
    default: () => [],
  },
  isCollapse: {
    type: Boolean,
    default: () => false,
  },
});

const state = reactive<{ menu: Array<any> }>({
  menu: [
    {
      path: "/main",
      label: "首页",
      icon: "iconshouye",
      disabled: false,
      children: [],
    },
    {
      path: "/role",
      label: "角色管理",
      icon: "iconuser",
      disabled: false,
      children: [],
    },
    {
      path: "/blog",
      label: "博客管理",
      icon: "iconpaper",
      disabled: false,
      children: [
        {
          path: "/blog",
          label: "博客信息",
          disabled: false,
        },
        {
          path: "/blog/article",
          label: "文章管理",
          disabled: false,
        },
        {
          path: "/blog/comment",
          label: "留言管理",
          disabled: false,
        },
        {
          path: "/blog/user",
          label: "用户管理",
          disabled: false,
        },
        {
          path: "/blog/category",
          label: "分类管理",
          disabled: true,
        },
        {
          path: "/blog/tag",
          label: "标签管理",
          disabled: true,
        },
      ],
    },
  ],
});
</script>

<style lang="scss">
// .el-menu-item {
//   display: flex;
//   align-items: center;
//   .iconfont {
//     margin-right: 15px;
//   }
// }
i.iconfont {
  margin-right: 10px;
  // font-weight: bold;
  color: #fff;
}
</style>

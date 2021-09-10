<template>
  <el-menu-item index="/wellcome">
    <i class="iconfont iconshouye"></i>
    <template #title>
      <span>首页</span>
    </template>
  </el-menu-item>
  <el-submenu index="/blog">
    <template #title>
      <i class="iconfont iconpaper"></i>
      <span>博客管理</span>
    </template>
    <el-menu-item index="/blog">
      <template #title>博客信息</template>
    </el-menu-item>
    <el-menu-item index="/blog/article">
      <template #title>文章管理</template>
    </el-menu-item>
    <el-menu-item index="/blog/user">
      <template #title>用户管理</template>
    </el-menu-item>
    <el-menu-item index="/blog/classify">
      <template #title>分类管理</template>
    </el-menu-item>
    <el-submenu index="/blog/tag">
      <template #title>
        <i class="iconfont iconzhekou"></i>
        <span>标签管理</span>
      </template>
      <el-menu-item index="2-4-1">
        <template #title>标签分类</template>
      </el-menu-item>
      <el-menu-item index="2-4-2">
        <template #title>标签添加</template>
      </el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-submenu index="3">
    <template #title>
      <i class="iconfont iconspeechbubble"></i>
      <span>评论管理</span>
    </template>
    <el-menu-item index="3-1">
      <template #title>评论列表</template>
    </el-menu-item>
    <el-menu-item index="3-2">
      <template #title>评论分类</template>
    </el-menu-item>
  </el-submenu>
  <el-submenu index="4">
    <template #title>
      <i class="iconfont iconuser"></i>
      <span>用户管理</span>
    </template>
    <el-menu-item index="4-1">
      <template #title>用户列表</template>
    </el-menu-item>
    <el-menu-item index="4-2">
      <template #title>权限管理</template>
    </el-menu-item>
  </el-submenu>
  <el-menu-item index="5">
    <i class="iconfont iconshezhi"></i>
    <template #title>
      <span>系统管理</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
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

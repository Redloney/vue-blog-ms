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
import { menu } from "../assets/mock/menu";
import { defineProps, reactive, onMounted } from "vue";
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

onMounted(() => {
  state.menu = menu;
});
const state = reactive<{ menu: Array<any> }>({
  menu: [],
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

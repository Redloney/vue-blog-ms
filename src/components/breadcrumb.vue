<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-left">
      <el-breadcrumb-item
        v-for="item in route.matched"
        :to="{ path: item.path }"
        :key="item.path"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  width: 100%;
  padding: 15px;
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom: 20px;
  // font-family: webmo;
  .el-breadcrumb {
    color: #333;
    user-select: none;
    cursor: pointer;
    .el-breadcrumb-item {
      font-weight: normal;
      cursor: pointer;
    }
  }

  ::v-deep(.el-breadcrumb) {
    .el-breadcrumb__inner a:hover,
    .el-breadcrumb__inner.is-link:hover {
      color: #ff3366;
    }
  }
}
</style>

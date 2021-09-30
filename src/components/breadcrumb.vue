<template>
  <div class="breadcrumb-wrapper">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in route.matched"
          :to="{ path: item.path }"
          :key="index + item.path"
        >
          <!-- <el-tag v-show="item.meta.title" closable> -->
          {{ item.meta.title }}
          <!-- </el-tag> -->
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom: 20px;
  :deep(.el-breadcrumb) {
    user-select: none;
    .el-breadcrumb__item {
      font-size: 13px;
      .is-link {
        color: #333;
      }
    }
  }

  :deep(.el-breadcrumb) {
    .el-breadcrumb__inner a:hover,
    .el-breadcrumb__inner.is-link:hover {
      color: #ff3366;
    }
  }
}
</style>

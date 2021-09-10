<template>
  <el-header class="header" height="60px">
    <!-- 展开按钮 -->
    <el-row align="middle" type="flex" :gutter="20">
      <el-col :span="5" class="hidden-md-only">
        <div class="menu-fold" @click="toggle">
          <i v-if="isCollapse" class="el-icon-s-unfold"></i>
          <i v-else class="el-icon-s-fold"></i>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts" setup>
import { defineEmit, ref } from "vue";
let isCollapse = ref(false);

let userinfo = ref({
  nickname: "张三",
  email: "zs@213.com",
});

const toggle = () => {
  isCollapse.value = !isCollapse.value;
};
</script>
<style lang="scss" scoped>
::v-deep(.el-header) {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  .menu-fold {
    cursor: pointer;
    font-size: 0.3rem;
    transition: 200ms linear;
    text-align: left;
  }
  .self {
    text-align: right;
  }
  .notice {
    line-height: 0.2rem;
    margin-right: 0.1rem;
  }
  .user-link {
    cursor: pointer;
    color: #409eff;
  }
}
</style>

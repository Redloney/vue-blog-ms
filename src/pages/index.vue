<template>
  <div id="home">
    <SideMenu :isCollapse="isCollapse" />
    <el-container>
      <el-header height="60px">
        <!-- Header content -->
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
      <el-main>
        <!-- 面包屑 -->
        <BreadCrumb />
        <router-view />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import SideMenu from "../components/sideMenu.vue";
import Footer from "../components/footer.vue";
import { ref } from "vue";

import BreadCrumb from "../components/breadcrumb.vue";

let isCollapse = ref(false);

let userinfo = ref({
  nickname: "张三",
  email: "zs@213.com",
});

const toggle = () => {
  isCollapse.value = !isCollapse.value;
};
const handleCommand = () => {};
</script>

<style lang="scss">
#home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-container {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .el-header {
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
    .el-main {
      overflow: hidden;
      background-color: #eef0f3;
      flex-basis: 70%;
    }
    .el-footer {
      padding: 0;
      flex-basis: 20%;
    }
  }
}
</style>

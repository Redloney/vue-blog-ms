<template>
  <div class="layout">
    <SideMenu :isCollapse="isCollapse" />
    <el-container>
      <el-header>
        <div class="menu-fold" @click="toggle">
          <i v-show="isCollapse" class="el-icon-s-unfold"></i>
          <i v-show="!isCollapse" class="el-icon-s-fold"></i>
        </div>
        <div class="avatar">
          <el-dropdown trigger="click">
            <el-avatar
              icon="el-icon-user-solid"
              size="medium"
              shape="square"
              src="https://img0.baidu.com/it/u=1599297019,276943708&fm=26&fmt=auto"
              fit="fill"
            ></el-avatar>
            <!-- <i class="icon el-icon-caret-bottom"></i> -->
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!-- 面包屑 -->
        <BreadCrumb />
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <!-- <Footer /> -->
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import SideMenu from "../components/sideMenu.vue";
import Footer from "../components/footer.vue";
import Header from "../components/Header.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

import BreadCrumb from "../components/breadcrumb.vue";
import storage from "../utils/storage";

let isCollapse = ref<boolean | undefined>(false);

const logout = () => {
  storage.del("token");
  router.push("/login");
};

const toggle = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .el-header {
      z-index: 100;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #fff;
      box-shadow: 0 0 10px #333;
      .menu-fold {
        cursor: pointer;
        font-size: 0.3rem;
        transition: 200ms linear;
        text-align: left;
      }
      .avatar {
        margin-left: auto;
        margin-right: 20px;
        text-align: right;
        .icon {
          margin-left: 5px;
          color: #666;
          font-weight: bold;
          font-size: 12px;
        }
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
      background-color: #eef0f3;
      height: auto;
      overflow-y: scroll;
      box-sizing: border-box;
      padding-bottom: 100px;
      &::-webkit-scrollbar {
        display: none;
      }

      .view {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

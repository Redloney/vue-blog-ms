<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <!-- 导航菜单 -->
    <el-menu
      class="nav-menu"
      background-color="#23262e"
      text-color="#fff"
      active-text-color="#ff3366"
      router
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <!-- 作者信息 -->
      <div class="userinfo" :class="{ shrink: isCollapse }">
        <el-avatar
          class="avatar"
          src="https://tva2.sinaimg.cn/large/9bd9b167ly1fzjwip4qfxj20b40b4mxc.jpg"
        />
        <h1 class="nickname">RedLoney</h1>
      </div>
      <!-- 递归遍历菜单子项 -->
      <TreeMenu :isCollapse="isCollapse" />
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import TreeMenu from "./treeMenu.vue";

defineProps({
  isCollapse: Boolean,
});

const handleOpen = (key: number, path: string) => {};
const handleClose = (key: number, path: string) => {};
</script>

<style lang="scss">
.el-aside {
  height: 100%;
  overflow-x: hidden !important;
  user-select: none;
  position: relative;
  transition: width 0.5s;
  background-color: #23262e;
  .el-menu {
    * {
      font-family: webmo;
    }
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    border-right: solid 1px #23262e;
    &::-webkit-scrollbar {
      display: none;
    }
    .userinfo {
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      transition: transform 0.5s;
      &:hover {
        cursor: pointer;
        transition: 500ms linear;
        background: url("@/assets/image/snow.gif");
        background-size: cover;
      }
      .avatar {
        width: 85px;
        height: 85px;
        border-radius: 50%;
        object-fit: cover;
        overflow: hidden;
        border: 3px solid #eee;
        transform-origin: center;
        transition: 200ms linear;
      }
      .nickname {
        margin-top: 15px;
        font-weight: bold;
        font-size: 18px;
        letter-spacing: 1.5px;
      }
    }
    .userinfo.shrink {
      transform: scale(0.6);
      height: auto;
      background: none !important;
      transition: transform 0.5s;
      // padding: 25px 0;
      // height: auto;
      // &:hover {
      //   background: none;
      // }
      // border-bottom: 2px solid #ffffff;
      // .avatar {
      //   width: 50px;
      //   height: 50px;
      //   border-radius: 50%;
      //   overflow: hidden;
      //   border: 1px solid #eee;
      // }
      // .nickname {
      //   display: none;
      //   margin-top: 5px;
      //   font-weight: bold;
      //   font-size: 10px;
      //   letter-spacing: 1.5px;
      //   transform: scale(0);
      //   transform-origin: center;
      //   transition: 200ms linear;
      // }
    }
    .el-submenu__icon-arrow {
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>

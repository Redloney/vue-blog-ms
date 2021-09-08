<template>
  <div class="login">
    <el-form :model="formState" status-icon ref="loginForm" class="form">
      <h1 class="title">Redloney`s 后台管理系统</h1>
      <el-form-item prop="nickname">
        <el-input
          v-model="formState.nickname"
          prefix-icon="el-icon-user"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="formState.password"
          prefix-icon="el-icon-lock"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-checkbox v-model="formState.remember">记住我</el-checkbox>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-button type="text">注册</el-button>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-button
              style="width: 100%; margin-top: 15px"
              type="primary"
              @click="submitForm()"
              >登录</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div class="copyright">Copyright @ 2019-2021 by redloney`s</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { ElForm, ElFormItem, ElButton, ElInput } from "element-plus";

import { useRouter } from "vue-router";

const router = useRouter();

// 接口
interface formTypes {
  nickname: string;
  password: string;
  remember: boolean;
}

// 表单Dom
// const loginForm: Ref<HTMLElement | null> = ref(null);

// 表单数据
const formState = reactive<formTypes>({
  nickname: "",
  password: "",
  remember: false,
});

// 提交
const submitForm = () => {
  router.push("/Home");
};
// 重置
const resetForm = () => {};

// onMounted(() => {});

// onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  @include flex-center;
  flex-direction: column;
  background: url("https://w.wallhaven.cc/full/dp/wallhaven-dpem7g.jpg") 100% 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .form {
    width: 400px;
    background-color: #fff;
    padding: 15px 30px;
    box-sizing: border-box;
    border: 1.5px solid #dddddd;
    border-radius: 5px;
    .title {
      text-align: center;
      font-weight: bold;
      font-family: webmo;
      color: #2d94cf;
      margin: 30px;
      font-size: 20px;
      letter-spacing: 1px;
    }
  }
  .copyright {
    position: absolute;
    bottom: 0.5rem;
    font-size: 15px;
    font-family: webmo;
    color: #fff;
    letter-spacing: 1.5px;
    justify-self: flex-end;
  }
}
</style>

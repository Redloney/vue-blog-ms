<template>
  <div class="login">
    <el-form :model="formData" :rules="rules" status-icon ref="loginForm" class="form">
      <h1 class="title">Redloney`s 后台管理系统</h1>
      <el-form-item prop="nickname">
        <el-input
          v-model="formData.nickname"
          prefix-icon="el-icon-user"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="formData.email"
          prefix-icon="el-icon-lock"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-row :gutter="20">
          <!-- <el-col :span="12" :offset="0">
            <el-checkbox v-model="formData.remember">记住我</el-checkbox>
          </el-col>-->
          <!-- <el-col :span="12" :offset="0">
            <el-button type="text">注册</el-button>
          </el-col>-->
          <el-col :span="24" :offset="0">
            <el-button
              style="width: 100%; padding: 10px 0; margin-top: 15px"
              type="primary"
              @click="submitForm()"
              >登录</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div class="copyright">
      <p>
        Copyright © 2019-2021 By Redloney`s |
        <a href="https://beian.miit.gov.cn/">鄂ICP备20004008号-1</a>
      </p>
      <p>Power by Vue & ElementPlus</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, Ref } from "vue";
import { ElForm, ElFormItem, ElButton, ElInput, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { login } from "../api/user";

const router = useRouter();

// 接口
interface formTypes {
  nickname: string;
  email: string;
  remember: boolean;
}

// 表单Dom
const loginForm: Ref<any | null> = ref(null);

// 表单数据
const formData = reactive<formTypes>({
  nickname: "admin",
  email: "admin@admin.com",
  remember: true,
});

const rules = {
  nickname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

// 提交
const submitForm = () => {
  loginForm.value?.validate(async (valid: boolean) => {
    if (valid) {
      const isLogin = await login(formData);
      if (isLogin) {
        ElMessage.success("登录成功!");
        router.push("/main");
        return;
      }
      ElMessage.warning("登录失败!");
    } else {
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  @include flex-center;
  flex-direction: column;
  background: url("../assets/image/wallhaven-1krg3g.jpg") 100% 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  * {
    &::selection {
      color: #333;
      background-color: #fff;
    }
  }
  .form {
    width: 400px;
    padding: 15px 30px;
    box-sizing: border-box;
    border-radius: 5px;
    transform: translateY(-50%);
    .title {
      text-align: center;
      font-weight: bold;
      font-family: webmo;
      color: #fff;
      margin: 50px 0;
      font-size: 25px;
      letter-spacing: 1px;
    }
  }
  .copyright {
    position: absolute;
    bottom: 5vh;
    font-size: 14px;
    font-family: "SentyTEA";
    color: #fff;
    letter-spacing: 1.5px;
    justify-self: flex-end;
    font-weight: bold;
    p {
      text-align: center;
      padding: 10px 0;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>

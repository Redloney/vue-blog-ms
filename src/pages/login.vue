<template>
    <div class="login">
        <el-form
            :model="formModel"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="账号" prop="nickname">
                <el-input
                    type="password"
                    v-model="formModel.nickname"
                    autocomplete="off"
                ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input
                    type="password"
                    v-model="formModel.password"
                    autocomplete="off"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    Ref,
    ref,
    reactive,
    onMounted,
    onUnmounted
} from 'vue';
import { ElForm, ElFormItem, ElButton, ElInput } from 'element-plus';
export default defineComponent({
    components: {
        ElForm,
        ElFormItem,
        ElButton,
        ElInput
    },
    setup() {
        // 接口
        interface formTypes {
            nickname: string;
            password: string;
        }

        // 表单Dom
        const loginForm: Ref<HTMLElement | null> = ref(null);

        // 表单数据
        const formModel = reactive<formTypes>({
            nickname: '',
            password: ''
        });

        // 提交
        const submitForm = () => {};
        // 重置
        const resetForm = () => {};

        // onMounted(() => {});

        // onUnmounted(() => {});

        return { loginForm, formModel, resetForm, submitForm };
    }
});
</script>

<style lang="scss" scoped></style>

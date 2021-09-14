<template>
  <el-dialog
    class="dialog"
    :title="title"
    top="5vh"
    lock-scroll
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    v-model="visible"
  >
    <!-- <el-form label-position="top" ref="dialogForm" size="medium" label-width="1rem">
      <el-row :gutter="20">
        <el-col :span="6" :offset="0">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model.trim="artFormData.title" placeholder="请输入文章标题" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="文章分类" prop="articleClass">
            <el-select v-model="formData.category" size="small">
              <el-option
                v-for="(cate, index) in category"
                :value="cate.value"
                :label="cate.label"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="文章状态" prop="state">
            <el-select v-model="artFormData.state" size="small">
              <el-option :value="1" label="公开"></el-option>
              <el-option :value="2" label="隐藏"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="文章描述" prop="desc">
            <el-input placeholder="请输入文章描述" v-model.trim="artFormData.desc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="文章内容" prop="content">
            <Editor v-model:content="artFormData.content" ref="editor" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>-->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>

import { ref, defineProps } from 'vue'

defineProps({
  title: String,
  visible: String,
})

// 声明区

// 取消
const dialogCancel = () => {

}
// 确定
const dialogConfirm = () => {

}



// 函数区




// 类型区




</script>



<style lang="scss" scoped>
</style>
<template>
  <div class="search-bar">
    <el-form size="mini">
      <el-row :gutter="5">
        <el-col :span="5" :offset="0">
          <el-form-item label="标题">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="0">
          <el-form-item label="作者">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="0">
          <el-form-item label="分类">
            <el-select v-model="formData.category">
              <el-option
                v-for="cate in category"
                :key="cate.value"
                :label="cate.label"
                :value="cate.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="0">
          <el-form-item label="状态">
            <el-select v-model="formData.artState">
              <el-option
                v-for="state in artState"
                :key="state.value"
                :label="state.label"
                :value="state.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="0" class="flex-a-center">
          <el-button size="small" type="primary">查询</el-button>
          <el-button size="small">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div class="insert">
    <el-button size="small" type="primary">添加文章</el-button>
    <br />
    <Editor />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Editor from '../components/art_editor.vue'
const formData = reactive({
  category: '1',
  artState: '1',
})
const category = reactive([
  {
    value: '1',
    label: '技术'
  },
  {
    value: '2',
    label: '生活'
  },
  {
    value: '3',
    label: '游戏'
  }
])
const artState = reactive([
  {
    value: '1',
    label: '正常'
  },
  {
    value: '2',
    label: '修改中'
  },
  {
    value: '3',
    label: '废弃'
  }
])
</script>

<style lang='scss' scoped>
.search-bar {
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  .el-form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .el-form-item {
      margin-right: 25px;
    }
  }
}
.insert {
  margin-top: 20px;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
}
</style>
<template>
  <el-row :gutter="20">
    <el-col :span="6" :offset="0">
      <el-card shadow="always">访客</el-card>
    </el-col>
    <el-col :span="6" :offset="0">
      <el-card shadow="always">消息</el-card>
    </el-col>
    <el-col :span="6" :offset="0">
      <el-card shadow="always">金额</el-card>
    </el-col>
    <el-col :span="6" :offset="0">
      <el-card shadow="always">订单</el-card>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="mt-20">
    <el-col :span="24" :offset="0">
      <el-card shadow="always">
        <Echarts />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import Echarts from "../../components/echarts.vue";
</script>
<style lang="scss" scoped>
.mt-20 {
  margin-top: 20px;
}
</style>

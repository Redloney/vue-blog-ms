<template>
  <el-form
    class="search-bar"
    v-show="visible"
    :label-width="`${config.labelWidth}`"
  >
    <!-- if input -->
    <template v-for="(item, index) in state.fields" :key="index">
      <el-form-item :class="item.class" :prop="item.prop" :label="item.label">
        <el-input
          v-if="item.type == 'input'"
          :placeholder="item.placeholder"
          v-model="state.searchField[item.value]"
        ></el-input>
      </el-form-item>
    </template>
    <!-- if select -->
    <el-form-item class="input" prop="artState" label="状态">
      <el-select v-model="state.status">
        <el-option
          v-for="item in state.status"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <div class="btns">
      <el-button icon="el-icon-search" @click="search">查询</el-button>
      <el-button icon="el-icon-delete">清除</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, onMounted, defineProps } from 'vue'
import { getStatus } from '../api/status'
import { getTags } from '../api/tag'

// 接口数据

/**
 *
 *  显示
 *  input
 *  组件只负责收集数据 通过 emit 传递给父级组件
 *
 */

// Props
const props = defineProps({
  config: {
    type: Object,
    default: () => {},
  },
  visible: {
    type: Boolean,
    default: () => true,
  },
})

interface State {
  category: Array<any>
  status: Array<any>
  searchField: Field
}

interface Field {
  author: String
  title: String
  category: String
  status: String
}

// 数据
const state = reactive<any>({
  category: [],
  status: [],
  searchField: {
    author: '',
    title: '',
    category: '',
    status: '',
  },
  fields: [
    {
      type: 'input',
      label: '作者',
      prop: 'author',
      value: 'author',
    },
  ],
})

// init

const load = async () => {
  const tags = await getTags()
  const status = await getStatus({})
  state.category = tags
  state.status = status
}

onMounted(() => {
  load()
})

// 搜索

const search = () => {
  console.log(state.searchField)
}

// 显示
</script>

<style lang="scss" scoped></style>

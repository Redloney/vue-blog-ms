<template>
  <div class="query-bar">
    <el-form
      label-width="100px"
      ref="quertform"
      :model="querModel"
      size="small"
    >
      <div class="input-box">
        <template v-for="item in querModel" :key="index">
          <div class="input">
            <el-form-item :prop="item?.model" :label="item.label">
              <el-input v-if="item?.type === 'input'" v-bind="$attrs" />
              <el-select v-if="item?.type === 'select'" v-bind="$attrs">
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  v-bind="option"
                />
              </el-select>
            </el-form-item>
          </div>
        </template>
        <div class="btns">
          <el-form-item>
            <el-button size="mini" type="primary">查询</el-button>
            <el-button size="mini">重置</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmit, Ref, ref, onMounted, PropType } from 'vue'
import { ElFormContext } from 'element-plus/lib/el-form'
import FormItem from './FormItem.vue'

interface Option {
  label?: String
  value?: String | Number
}

interface Item {
  type?: String
  model?: String
  label?: String
  placeholder?: String
  options?: Array<Option>
}

const querModel: Array<Item> = [
  {
    type: 'input',
    model: 'title',
    label: '文章标题',
    placeholder: '请输入文章标题',
  },
  {
    type: 'input',
    model: 'author',
    label: '作者',
    placeholder: '请输入作者名称',
  },
  {
    type: 'select',
    model: 'state',
    label: '状态',
    placeholder: '请选择文章状态',
    options: [
      {
        label: '全部',
        value: '',
      },
      {
        label: '公开',
        value: 1,
      },
      {
        label: '隐藏',
        value: 2,
      },
    ],
  },
  {
    type: 'select',
    model: 'classify',
    label: '文章分类',
    placeholder: '请选择文章分类',
    options: [
      {
        label: '全部',
        value: '',
      },
    ],
  },
]

defineProps({
  querModel: Object as PropType<{}>,
})

defineEmit({
  handleQuery: () => {
    console.log('Query')
  },
})

onMounted(() => {})

const quertform: Ref<ElFormContext | null> = ref(null)
// 声明区

// 函数区

// 类型区
</script>

<style lang="scss" scoped>
.query-bar {
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .el-form {
    .input-box {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .input {
        flex-basis: 300px;
        justify-content: flex-start;
        margin: 10px 0;
      }
      .btns {
        justify-content: flex-start;
      }
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  .query-bar {
    .el-form {
      .input-box {
        .input {
          flex-grow: 1;
          max-width: 450px;
        }
      }
    }
  }
}
</style>

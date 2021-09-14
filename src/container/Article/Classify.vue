<template>
  <transition name="el-fade-in-linear">
    <div class="search-bar" v-show="showSearchBar">
      <el-form size="mini">
        <el-row :gutter="20">
          <el-col :span="5" :offset="0">
            <el-form-item label="分类名称">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="0">
            <el-form-item label="分类ID">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="0">
            <el-form-item label="状态">
              <el-select v-model="formData.artState">
                <el-option
                  v-for="state in ClassifyState"
                  :key="state.value"
                  :label="state.label"
                  :value="state.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="0" class="flex-center">
            <el-button size="small" type="primary">查询</el-button>
            <el-button size="small">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </transition>

  <div class="insert">
    <!-- tool bar -->
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-button
          icon="el-icon-plus"
          size="mini"
          type="primary"
          plain
          @click="dialogFormVisible = true"
        >添加分类</el-button>
      </el-col>
      <el-col :span="12" :offset="0" style="text-align: right; margin-left: auto">
        <el-tooltip content="隐藏搜索栏" placement="top">
          <el-button
            circle
            size="mini"
            icon="el-icon-search"
            @click="showSearchBar = !showSearchBar"
          ></el-button>
        </el-tooltip>
        <el-tooltip content="刷新数据" placement="top">
          <el-button circle size="mini" icon="el-icon-refresh"></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- 添加弹框 -->
    <el-dialog
      class="insert-dialog"
      title="添加分类"
      top="5vh"
      lock-scroll
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      v-model="dialogFormVisible"
    >
      <el-form label-position="top" ref="dialogForm" size="medium" label-width="1rem">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="分类名称" prop="title">
              <el-input v-model.trim="artFormData.title" placeholder="请输入文章标题" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="分类描述" prop="articleClass">
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
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <!-- 分类表格 -->
  <div class="table">
    <el-table stripe highlight-current-row style="width: 100%" :indent="60" :data="tableData">
      <el-table-column align="center" v-for="item in tableHeader" :key="item.prop" v-bind="item" />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <div class="btns">
            <el-button circle size="mini" icon="el-icon-edit"></el-button>
            <el-button circle size="mini" icon="el-icon-plus"></el-button>
            <el-popconfirm size="medium" title="这是一段内容确定删除吗？">
              <template #reference>
                <el-button circle size="mini" type="danger" icon="el-icon-delete"></el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

/**
 * 声明区
 */

const showSearchBar = ref(false);

let dialogFormVisible = ref(false);

/**
 * 函数区
 */

const handleSizeChange = (val: any) => {
  console.log(`每页 ${val} 条`);
};

const handleCurrentChange = (val: any) => {
  console.log(`当前页: ${val}`);
};

const formData = reactive({
  category: "1",
  artState: "1",
});

const category = reactive([
  {
    value: "1",
    label: "技术",
  },
  {
    value: "2",
    label: "生活",
  },
  {
    value: "3",
    label: "游戏",
  },
]);

const ClassifyState = reactive([
  {
    value: "1",
    label: "公开",
  },
  {
    value: "2",
    label: "隐藏",
  },
  {
    value: "3",
    label: "废弃",
  },
]);

const classifyAll = reactive([]);

const tableHeader = reactive([
  {
    label: "分类名称",
    prop: "ClassifyName",
    // width: 180,
  },
  {
    label: "分类ID",
    prop: "ClassifyId",
    // width: 180,
  },
  {
    label: "分类描述",
    prop: "ClassifyDesc",
    // width: 180,
  },
  {
    label: "状态",
    prop: "ClassifyState",
    formatter(row: any, column: any, value: string | number) {
      return {
        1: "公开",
        2: "隐藏",
      }[value];
    },
  },
  {
    label: "更新时间",
    prop: "updateTime",
    // width: 180,
    formatter(row: any, column: any, value: string | number | Date) {
      // return utils.formateDate(new Date(value));
    },
  },
  {
    label: "创建时间",
    prop: "createTime",
    // width: 180,
    formatter(row: any, column: any, value: string | number | Date) {
      // return utils.formateDate(new Date(value));
    },
  },
]);
const tableData = reactive([
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
  },
]);
const formatter = (row: { address: any }, column: any) => {
  return row.address;
};
const artFormData = reactive({
  title: "",
  desc: "",
  coverPic: [],
  state: 1,
  content: "",
});
</script>

<style lang="scss" scoped>
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
.flex-center {
  @include flex-center;
}
.insert {
  margin-top: 20px;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
}

.table {
  .btns {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .el-button {
      margin: 0px;
      margin: 5px;
    }
  }
}

::v-deep(.el-overlay) {
  &::-webkit-scrollbar {
    display: none;
  }
}
::v-deep(.el-dialog) {
  width: 80vw !important;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>

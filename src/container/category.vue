<template>
  <div class="category">
    <transition name="fade">
      <section class="search-bar" v-show="state.queryFormVisible">
        <el-form label-width="80px" ref="queryform">
          <div class="inputs">
            <el-form-item class="input" size="small" prop="nickname" label="名称">
              <el-input
                placeholder="请输入分类名称"
                v-model="state.queryFormValue.nickname"
              ></el-input>
            </el-form-item>
            <div class="btns">
              <el-form-item class="input">
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-search"
                  @click="search"
                  >查询</el-button
                >
                <el-button size="small" icon="el-icon-delete">清除</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </section>
    </transition>
    <section class="table-form">
      <div class="table-toolbar">
        <div class="btns">
          <el-button icon="el-icon-plus" size="mini" type="primary" plain>新增</el-button>
          <!-- <el-button icon="el-icon-edit" size="mini" type="success" plain
            >修改</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="danger" plain
            >删除</el-button
          >
          <el-button icon="el-icon-search" size="mini" type="warning" plain
            >导出</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" type="primary" plain
            >刷新</el-button
          > -->
        </div>
        <div class="right">
          <el-tooltip content="隐藏搜索栏" placement="top">
            <el-button
              circle
              size="mini"
              icon="el-icon-search"
              @click="hideSerachBar"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="刷新数据" placement="top">
            <el-button
              @click="getCateData"
              circle
              size="mini"
              icon="el-icon-refresh"
            ></el-button>
          </el-tooltip>
        </div>
      </div>
      <el-table
        stripe
        highlight-current-row
        style="width: 100%"
        :indent="60"
        :data="state.tableData"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          v-for="item in state.tableFields"
          :class="item.prop"
          :key="item.prop"
          v-bind="item"
        >
          <template #default="scope" v-if="item.prop == 'label'">
            <el-tag>
              {{ scope.row.label }}
            </el-tag>
          </template>
          <template #default="scope" v-if="item.prop == 'enable'">
            <el-switch v-model="scope.row.enable"> </el-switch>
          </template>
          <template #default="scope" v-else-if="item.prop == 'hidden'">
            <el-switch v-model="scope.row.hidden"> </el-switch>
          </template>
          <template #default="scope" v-else-if="item.prop == 'createdAt'">
            {{ format(scope.row.address, "YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <div class="btns">
              <el-button circle size="mini" icon="el-icon-view"></el-button>
              <el-button circle size="mini" icon="el-icon-edit"></el-button>

              <el-popconfirm title="你确定要删除此用户么？">
                <template #reference>
                  <el-button
                    circle
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getCategorys } from "../api/category";
import { format } from "../utils/day";
const search = () => {};

const load = async () => {
  const categorys = await getCategorys();
  state.tableData = categorys;
};

onMounted(() => {
  load();
});

// 查询表单
const state = reactive<any>({
  tableData: [],
  tableFields: [
    {
      label: "名称",
      prop: "label",
      width: "100px",
    },
    {
      label: "启用",
      prop: "enable",
      width: "100px",
    },
    {
      label: "隐藏",
      prop: "hidden",
      width: "100px",
    },
    {
      label: "注册时间",
      prop: "createdAt",
      width: "160px",
    },
  ],
  queryFormVisible: true,
  queryFormValue: {
    nickname: "",
    gender: "",
  },
});

const hideSerachBar = () => {
  state.queryFormVisible = !state.queryFormVisible;
};

const getCateData = () => {};
</script>

<style lang="scss" scoped>
.category {
  .search-bar {
    background-color: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    .el-form {
      .inputs {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .input {
          flex-basis: 240px;
          justify-content: flex-start;
          margin: 10px;
        }
        .btns {
          text-align: center;
          // justify-content: flex-start;
        }
        .el-form-item {
          text-align: center;
          // margin-bottom: 0;
        }
      }
    }
  }
  .table-form {
    margin-top: 20px;
    .table-toolbar {
      @include flex-center;
      padding: 10px;
      background-color: #fff;
      justify-content: flex-start;
      .right {
        margin-left: auto;
      }
    }
    .btns {
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: flex-start;
      .el-button {
        margin: 0px;
        margin: 5px;
      }
    }
    .pagination {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>

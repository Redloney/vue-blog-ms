<template>
  <div class="role">
    <transition name="fade">
      <section class="search-bar" v-show="state.queryFormVisible">
        <el-form label-width="80px" ref="queryform">
          <div class="inputs">
            <el-form-item class="input" size="small" prop="nickname" label="昵称">
              <el-input
                placeholder="请输入角色名称"
                v-model="state.queryFormValue.nickname"
              ></el-input>
            </el-form-item>
            <el-form-item class="input" size="small" prop="gender" label="性别">
              <el-select
                v-model="state.queryFormValue.gender"
                placeholder="选择角色状态"
                clearable
                filterable
              >
                <el-option
                  v-for="item in [
                    { label: '启用', value: 'able' },
                    { label: '停用', value: 'disable' },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
              @click="getRoleData"
              circle
              size="mini"
              icon="el-icon-refresh"
            ></el-button>
          </el-tooltip>
        </div>
      </div>
      <el-table
        stripe
        fit
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
          <template #default="scope" v-if="item.prop == 'status'">
            <el-switch v-model="scope.row.status" @change="changeRoleStatus"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <div class="btns">
              <el-button circle size="mini" icon="el-icon-view"></el-button>
              <el-button circle size="mini" icon="el-icon-edit"></el-button>

              <el-popconfirm
                title="你确定要删除此用户么？"
                @confirm="() => scope.row._id"
              >
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
      <!-- <el-pagination
        @size-change="sizeChange"
        class="pagination"
        :current-page="1"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1"
      ></el-pagination> -->
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive } from "vue";

const state = reactive({
  tableData: [
    {
      rolename: "超级管理员",
      authority: "admin",
      status: true,
      createdAt: "2021-09-01",
    },
  ],
  tableFields: [
    {
      label: "角色名称",
      prop: "rolename",
    },
    {
      label: "权限字符",
      prop: "authority",
    },
    {
      label: "状态",
      prop: "status",
    },
    {
      label: "评论时间",
      prop: "createdAt",
    },
  ],
  queryFormVisible: true,
  queryFormValue: {
    nickname: "",
    gender: "",
  },
});

const search = () => {};

const changeRoleStatus = () => {
  ElMessageBox.confirm('你确定要"停用"此角色么?', "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "停用成功!",
      });
    })
    .catch(() => {
      ElMessage({
        type: "error",
        message: "停用失败!",
      });
    });
};

const hideSerachBar = () => {
  state.queryFormVisible = !state.queryFormVisible;
};

const getRoleData = () => {};
</script>

<style lang="scss" scoped>
.role {
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

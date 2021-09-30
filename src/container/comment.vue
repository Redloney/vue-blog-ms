<template>
  <div class="comment">
    <transition name="fade">
      <section class="search-bar" v-show="state.queryFormVisible">
        <el-form label-width="80px" ref="queryform">
          <div class="inputs">
            <el-form-item class="input" size="small" prop="nickname" label="昵称">
              <el-input
                placeholder="请输入用户昵称"
                v-model="state.queryFormValue.nickname"
              ></el-input>
            </el-form-item>
            <el-form-item class="input" size="small" prop="gender" label="性别">
              <el-select
                v-model="state.queryFormValue.gender"
                placeholder="选择用户性别"
                clearable
                filterable
              >
                <el-option
                  v-for="item in [
                    { label: '男', value: 'male' },
                    { label: '女', value: 'female' },
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
              @click="getCommData"
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
        empty-text="暂无回复"
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
          <template #default="scope" v-if="item.prop == 'userinfo.avatar'">
            <el-avatar
              icon="el-icon-user-solid"
              shape="circle"
              :src="scope.row.userinfo.avatar"
              fit="fill"
            ></el-avatar>
          </template>
          <template #default="scope" v-else-if="item.prop == 'userinfo.gender'">
            <el-tag v-if="scope.row.userinfo.gender == 'male'">男</el-tag>
            <el-tag v-else type="danger">女</el-tag>
          </template>
          <template
            class="reply-table"
            #default="scope"
            v-else-if="item.prop == 'children'"
          >
            <el-table
              :show-header="false"
              stripe
              fit
              empty-text="暂无回复"
              highlight-current-row
              style="width: 100%"
              :indent="60"
              :data="scope.row.children"
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
                <template #default="scope" v-if="item.prop == 'userinfo.avatar'">
                  <el-avatar
                    icon="el-icon-user-solid"
                    shape="circle"
                    :src="scope.row.userinfo.avatar"
                    fit="fill"
                  ></el-avatar>
                </template>
                <template #default="scope" v-else-if="item.prop == 'userinfo.gender'">
                  <el-tag v-if="scope.row.userinfo.gender == 'male'">男</el-tag>
                  <el-tag v-else type="danger">女</el-tag>
                </template>
                <template #default="scope" v-else-if="item.prop == 'createdAt'">
                  <i class="el-icon-time mr-10"></i>
                  {{ format(scope.row.createdAt, "YYYY-MM-DD") }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template #default="scope">
                  <div class="btns">
                    <el-button circle size="mini" icon="el-icon-view"></el-button>
                    <el-button circle size="mini" icon="el-icon-edit"></el-button>

                    <el-popconfirm
                      title="你确定要删除此用户么？"
                      @confirm="() => deleteComment(scope.row._id)"
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
          </template>
          <template #default="scope" v-else-if="item.prop == 'createdAt'">
            <i class="el-icon-time mr-10"></i>
            {{ format(scope.row.createdAt, "YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <div class="btns">
              <el-button circle size="mini" icon="el-icon-view"></el-button>
              <el-button circle size="mini" icon="el-icon-edit"></el-button>

              <el-popconfirm
                title="你确定要删除此用户么？"
                @confirm="() => deleteComment(scope.row._id)"
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
      <el-pagination
        @size-change="sizeChange"
        class="pagination"
        :current-page="1"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { getComment } from "../api/comment";
import { format } from "../utils/day";

const state = reactive({
  tableData: [],
  tableFields: [
    {
      label: "头像",
      prop: "userinfo.avatar",
      width: "100px",
    },
    {
      label: "昵称",
      prop: "userinfo.nickname",
      width: "100px",
    },
    {
      label: "性别",
      prop: "userinfo.gender",
      width: "50px",
    },
    {
      label: "评论内容",
      prop: "content",
      width: "300px",
    },
    {
      label: "回复",
      // label: `回复(${children.length})`,
      type: "expand",
      prop: "children",
      width: "80px",
    },
    {
      label: "评论时间",
      prop: "createdAt",
      width: "200px",
    },
  ],
  queryFormVisible: true,
  queryFormValue: {
    nickname: "",
    gender: "",
  },
});

const sizeChange = (val: number) => {
  getCommData({ size: val });
};

// 查询
const search = () => {
  // const { gender, nickname } = state.queryFormValue;
  // getUserData({ gender, nickname });
};

const hideSerachBar = () => {
  state.queryFormVisible = !state.queryFormVisible;
};

const getCommData = async (query?: { page?: number; size?: number }) => {
  const comments = await getComment({ page: query?.page, size: query?.size });
  // comments.createdAt = format(comments.createdAt, "YYYY-MM-DD");
  state.tableData = comments;
};

const load = async () => {
  getCommData();
};

const deleteComment = (id: string) => {};

onMounted(() => {
  load();
});
</script>

<style lang="scss" scoped>
.comment {
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
    :deep(tbody) {
      tr {
        .el-table__expanded-cell {
          box-shadow: inset 0 0 1px black;
          padding: 0;
          border-bottom: none;
        }
      }
    }
  }

  // 滚动条的宽度
  :deep(.el-table__body-wrapper::-webkit-scrollbar) {
    width: 5px; // 横向滚动条
    height: 10px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  :deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
    background-color: #ddd;
    border-radius: 30px;
  }
}
</style>

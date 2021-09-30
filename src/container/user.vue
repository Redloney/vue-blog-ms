<template>
  <div class="user">
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
      <!-- 修改弹窗 -->
      <el-dialog
        custom-class="editor"
        v-model="dialog.edit"
        title="修改用户资料"
        width="60%"
        destroy-on-close
      >
        <el-form
          class="editor-form"
          :model="state.userinfo"
          label-width="80px"
          :inline="false"
          size="normal"
        >
          <el-form-item class="avatar">
            <el-avatar
              v-show="state.imgurl"
              icon="el-icon-user-solid"
              shape="circle"
              :src="state.imgurl"
              fit="fill"
            ></el-avatar>
            <!-- <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
            >
              <img v-if="state.imgurl" :src="state.imgurl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
          </el-form-item>
          <el-form-item label="昵称:">
            <el-input size="small" v-model="state.userinfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group v-model="state.userinfo.gender">
              <el-radio size="small" label="female">
                <el-tag type="danger" effect="plain">女</el-tag>
              </el-radio>
              <el-radio size="small" label="male">
                <el-tag effect="plain">男</el-tag>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地址:">
            <el-input size="small" v-model="state.userinfo.address"></el-input>
          </el-form-item>
          <!-- <el-button type="primary" @click="getAvatar"> 获取头像 </el-button> -->
          <el-form-item label=""> </el-form-item>
          <!-- <el-form-item size="small">
            <el-button type="primary">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item> -->
        </el-form>
        <!-- <template #footer>
              <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="centerDialogVisible = false"
                  >Confirm</el-button
                >
              </span>
              </template> 
        -->
      </el-dialog>
      <!--  -->
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
              @click="getUserData"
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
          <template #default="scope" v-if="item.prop == 'avatar'">
            <el-avatar
              icon="el-icon-user-solid"
              shape="circle"
              :src="scope.row.avatar"
              fit="fill"
            ></el-avatar>
          </template>
          <template #default="scope" v-else-if="item.prop == 'gender'">
            <el-tag v-if="scope.row.gender == 'male'">男</el-tag>
            <el-tag v-else type="danger">女</el-tag>
          </template>
          <template #default="scope" v-else-if="item.prop == 'address'">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <div class="btns">
              <el-button circle size="mini" icon="el-icon-view"></el-button>
              <el-button
                circle
                size="mini"
                icon="el-icon-edit"
                @click="showEditorDialog"
              ></el-button>

              <el-popconfirm
                title="你确定要删除此用户么？"
                @confirm="() => deleteUser(scope.row._id)"
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
      <!-- 分页 -->
      <el-pagination
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
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import { reactive, onMounted } from "vue";
import { delUser, getRandomAvatar, getUserList } from "../api/user";

onMounted(() => {
  getUserData();
  getAvatar();
});

// 查询
const search = () => {
  const { gender, nickname } = state.queryFormValue;
  getUserData({ gender, nickname });
};

const getAvatar = async () => {
  let params = {
    lx: "b1",
    format: "json",
  };
  const { imgurl } = (await getRandomAvatar(params)) as any;
  state.imgurl = imgurl;
};

const hideSerachBar = () => {
  state.queryFormVisible = !state.queryFormVisible;
};

const deleteUser = async (id: string) => {
  const ret = await delUser(id);
  if (ret.code == 1) {
    ElMessage.success(ret.message);
  }
  getUserData();
};

const getUserData = async (query?: object) => {
  const users: Array<any> = await getUserList({ ...query });
  users.map((el: any) => {
    el.createdAt = dayjs(el.createdAt).format("YYYY-MM-DD");
    // let { province, city, district } = el.address.ad_info ? el.address : null;
    // let address = ` ${province} ${city} ${district}`;
    // el.address = address;
  });
  state.tableData = users;
};

const showEditorDialog = () => {
  dialog.edit = true;
};

const dialog = reactive<any>({
  edit: false,
});

// 查询表单
const state = reactive<any>({
  imgurl: "",
  userinfo: {},
  tableData: [],
  tableFields: [
    {
      label: "头像",
      prop: "avatar",
      width: "100px",
    },
    {
      label: "昵称",
      prop: "nickname",
      width: "100px",
    },
    {
      label: "性别",
      prop: "gender",
      width: "50px",
    },
    {
      label: "地址",
      prop: "address",
      width: "200px",
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
</script>

<style lang="scss" scoped>
.user {
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
    // 修改信息弹框
    :deep(.editor) {
      .el-dialog__header {
        .el-dialog__title {
          font-size: 12px;
        }
      }
      .editor-form {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .el-form-item.avatar {
          flex: 1 1 50%;
          .el-form-item__content {
            .el-avatar {
              width: 70px;
              height: 70px;
            }
          }
        }
        .el-form-item {
          flex: 1 1 50%;
        }
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
</style>

<template>
  <div>
    <!-- 查询表单 -->
    <transition name="fade-up">
      <section class="search-bar" v-show="queryFormVisible">
        <el-form label-width="80px" ref="queryform">
          <div class="inputs">
            <el-form-item class="input" prop="author" label="作者">
              <el-input
                placeholder="请输入作者名称"
                v-model="queryFormField.author"
              ></el-input>
            </el-form-item>
            <el-form-item class="input" prop="title" label="标题">
              <el-input
                placeholder="请输入标题名称"
                v-model="queryFormField.title"
              ></el-input>
            </el-form-item>
            <el-form-item size="small" class="input" prop="classify" label="分类">
              <el-select v-model="queryFormField.classify">
                <el-option
                  v-for="item in state.category"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="small" class="input" prop="artState" label="状态">
              <el-select v-model="queryFormField.artState">
                <el-option
                  v-for="item in state.status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item class="input" prop="date" label="创建日期">
              <el-date-picker
                type="daterange"
                range-separator="至"
                start-placeholder="开始"
                end-placeholder="结束"
              >
              </el-date-picker>
            </el-form-item> -->
            <div class="btns">
              <el-form-item class="input">
                <el-button type="primary" icon="el-icon-search">查询</el-button>
                <el-button icon="el-icon-delete">清除</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </section>
    </transition>

    <!-- 弹出表单 -->
    <section clss="dialog-form">
      <el-dialog
        title="添加文章"
        top="10vh"
        lock-scroll
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        v-model="dialogFormVisable"
      >
        <el-form
          label-position="top"
          :model="state.insertFormData"
          :rules="rules"
          ref="insertFormRef"
          size="medium"
          label-width="1rem"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="标题" prop="title">
                <el-input
                  v-model.trim="state.insertFormData.title"
                  placeholder="请输入文章标题"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="作者" prop="author">
                <el-input
                  v-model.trim="state.insertFormData.author"
                  placeholder="请输入文章作者"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分类" prop="classify">
                <el-select v-model="state.insertFormData.classify">
                  <el-option
                    v-for="(cate, index) in state.category"
                    :value="cate"
                    :label="cate.label"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态" prop="artState">
                <el-select v-model="state.insertFormData.artState">
                  <el-option
                    v-for="(cate, index) in state.status"
                    :value="cate"
                    :label="cate.label"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="封面图片" prop="coverPic">
                <el-image
                  class="preview-img"
                  style="width: 300px"
                  :src="state.insertFormData.cover"
                  fit
                  lazy
                ></el-image>
                <el-upload
                  accept="image/jpeg, image/gif, image/png"
                  :before-upload="beforeUpload"
                  action
                  :limit="1"
                  ref="upload"
                  :auto-upload="true"
                  :file-list="fileList"
                  list-type="picture-card"
                  :http-request="httpRequest"
                >
                  <el-button size="small" type="primary">选取文件</el-button>
                  <template #file="{ file }">
                    <div class="preview">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span class="el-upload-list__item-delete" @click="onRemove(file)">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </template>
                  <template #tip>
                    <div class="el-upload__tip">只能上传 jpg/png 文件,最大5M</div>
                  </template>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述" prop="desc">
                <el-input
                  style="max-height: 250px; min-height: 100px; resize: none"
                  :maxlength="300"
                  type="textarea"
                  placeholder="请输入文章描述"
                  v-model.trim="state.insertFormData.desc"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="内容" prop="content">
                <TinyEditor :html="state.insertFormData.html" @getHtml="getHtml" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-button type="primary" @click="() => submitInsertForm(art_id, 'insert')"
                >确定</el-button
              >
              <el-button type="primary" @click="() => submitInsertForm(art_id, 'update')"
                >更新</el-button
              >
            </el-col>
          </el-row>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCancel">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </section>

    <!-- 预览图片 -->
    <el-dialog v-model="previewDialogVisible">
      <img width="100%" :src="previewImgUrl" />
    </el-dialog>

    <!-- 表格 -->
    <section class="table-form">
      <div class="table-toolbar">
        <div class="btns">
          <el-button
            icon="el-icon-plus"
            size="mini"
            type="primary"
            @click="showDialogForm"
            plain
            >新增</el-button
          >
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
              @click="showQueryForm"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="刷新数据" placement="top">
            <el-button
              @click="refech"
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
        fit
        :indent="60"
        :data="tableData"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          v-for="item in taballFields"
          :class="item.prop"
          :key="item.prop"
          v-bind="item"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <div class="btns">
              <el-button
                circle
                size="mini"
                icon="el-icon-view"
                @click="() => showViewForm(scope.row._id)"
              ></el-button>
              <!-- @click="() => getArtDetailSync(scope.row._id)" -->
              <el-button
                circle
                size="mini"
                icon="el-icon-edit"
                @click="() => getArtDetailSync(scope.row._id)"
              ></el-button>
              <el-button
                circle
                size="mini"
                type="danger"
                icon="el-icon-delete"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :current-page="1"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="20"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </section>

    <!-- 查看弹窗 -->
    <el-dialog
      title="查看"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      v-model="viewFormVisable"
    >
      <article class="article" v-html="viewArtInfo.html"></article>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
// import ArtEditor from "../../components/art_editor.vue";

// Data
import {
  taballFields, // 表格字段
  rules, // 表格字段
  state,
  queryFormField,
} from ".";
// Http
import { getArtList, getArtDetail, insertArt, updateArt } from "../../api/art";
import { getTags } from "../../api/tag";
import { getStatus } from "../../api/status";

// Component
import TinyEditor from "../../components/tiny.vue";
import { uploadImg } from "../../api/upload";

onMounted(() => {
  refech();
});
// 刷新表格数据
const refech = async () => {
  const { arts } = await getArtList({});
  const tags = await getTags();
  const status = await getStatus();
  tableData.value = [];
  state.category = [];
  arts.forEach((art: Article) => {
    art.createdAt = dayjs(art.createdAt).format("YYYY-MM-DD");
    art.updatedAt = dayjs(art.updatedAt).format("YYYY-MM-DD");
  });
  state.category = tags;
  state.status = status;
  tableData.value.push(...arts);
};

//  Elemeny Dom
const queryform = ref(null);
const insertFormRef = ref(null);
const upload = ref(null);

// 变量
let queryFormVisible = ref(true);
let viewArtInfo: any = ref({});
let dialogFormVisable = ref(false);
let viewFormVisable = ref(false);

// 显示添加文章弹窗
const showDialogForm = () => {
  dialogFormVisable.value = !dialogFormVisable.value;
};

// 添加文章弹窗 取消
const dialogCancel = () => {
  dialogFormVisable.value = false;
};

// 添加文章弹窗 确认
const dialogConfirm = () => {
  dialogFormVisable.value = true;
};

// 显示查询文章
const showQueryForm = () => {
  queryFormVisible.value = !queryFormVisible.value;
};

// 显示查询文章
const showViewForm = () => {
  viewFormVisable.value = !viewFormVisable.value;
  getArtDetail();
};

const handleSizeChange = () => {};
const handleCurrentChange = () => {};

// 提交添加
const submitInsertForm = (_id: string, action: string) => {
  (insertFormRef.value as any).validate((valid: boolean) => {
    if (valid) {
      switch (action) {
        case "insert":
          insertArt(state.insertFormData).then((res) => {
            if (res.code) {
              dialogCancel();
              refech();
            }
          });
          break;
        case "update":
          if (!_id) {
            console.log("目标不存在");
            return;
          }
          updateArt(_id, state.insertFormData).then((res) => {
            if (res.code) {
              dialogCancel();
              refech();
            }
          });
          break;
        default:
          break;
      }
    } else {
      return false;
    }
  });
};

const getArtDetailSync = async (_id: string) => {
  art_id.value = _id;
  const art = ((await getArtDetail(_id)) as any).art as Article;
  if (art) {
    state.insertFormData = { ...art };
    showDialogForm();
  }
};

// 上传文件
const beforeUpload = (file: File) => {
  let FileExt = file.name.replace(/.+\./, "");
  if (!["jpg", "jpge", "png", "gif"].includes(FileExt.toLowerCase())) {
    ElMessage({
      type: "warning",
      message: "请上传后缀名为jpg、png、gif的附件！",
    });
    return false;
  }
};
// 上传文件
const httpRequest = async (params: any) => {
  // 1.发起上传请求
  uploadImg(params.file).then((res) => {
    state.insertFormData.cover = res.imgUrl;
  });
};
// 删除文件
const onRemove = (file: File) => {
  (upload.value as any).clearFiles();
};

const handlePictureCardPreview = (file: any) => {
  previewImgUrl.value = file;
  previewDialogVisible.value = true;
};

const getHtml = (html: string) => {
  state.insertFormData.html = html;
};

// 文件列表
let art_id = ref("");
let insertAction = ref("");
let previewImgUrl = ref("");
let previewDialogVisible = ref(false);
let fileList: Ref<Array<any>> = ref([]);

// 表格数据
let tableData: Ref<Array<any>> = ref([]);
</script>

<style lang="scss" scoped>
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
        justify-content: flex-start;
      }
      .el-form-item {
        margin-bottom: 0;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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

:deep(.is-scrolling-left) {
}

:deep(.el-overlay) {
  &::-webkit-scrollbar {
    display: none;
  }
}

:deep(.el-dialog) {
  width: 80vw !important;
  .el-form {
    height: 500px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    // .el-form-item {
    //   .el-input {
    //   }
    // }
  }
}
.el-dialog {
  .article {
    margin: 20px;
    line-height: 1.6;
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

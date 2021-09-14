<template>
  <!-- 查询表单 -->
  <section class="query-form" v-show="queryFormVisible">
    <el-form label-width="100px" ref="queryform">
      <div class="inputs">
        <el-form-item class="input" prop="author" label="作者">
          <el-input
            placeholder="请输入作者名称"
            v-model="queryFormData.author"
          ></el-input>
        </el-form-item>
        <el-form-item class="input" prop="title" label="标题">
          <el-input placeholder="请输入标题名称" v-model="queryFormData.title"></el-input>
        </el-form-item>
        <el-form-item size="small" class="input" prop="classify" label="分类">
          <el-select v-model="queryFormData.classify">
            <el-option
              v-for="item in classify"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" class="input" prop="artState" label="状态">
          <el-select v-model="queryFormData.artState">
            <el-option
              v-for="item in artState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div class="btns">
          <el-form-item class="input">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-delete">清除</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </section>
  <!-- 查询结束 -->

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
        :model="insertFormData"
        :rules="rules"
        ref="insertFormRef"
        size="medium"
        label-width="1rem"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="insertFormData.title" placeholder="请输入文章标题" />
        </el-form-item>

        <el-form-item label="作者" prop="author">
          <el-input v-model.trim="insertFormData.author" placeholder="请输入文章作者" />
        </el-form-item>

        <el-form-item label="分类" prop="classify">
          <el-select v-model="insertFormData.classify">
            <el-option
              v-for="(cate, index) in classify"
              :value="cate.value"
              :label="cate.label"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="artState">
          <el-select v-model="insertFormData.artState">
            <el-option
              v-for="(cate, index) in artState"
              :value="cate.value"
              :label="cate.label"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面图片" prop="coverPic">
          <el-upload
            accept="image/jpeg,image/gif,image/png"
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

        <el-form-item label="描述" prop="desc">
          <el-input
            placeholder="请输入文章描述"
            v-model.trim="insertFormData.desc"
          ></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <TinyEditor @getHtml="getHtml" />
        </el-form-item>

        <el-button type="primary" @click="submitInsertForm">确 定</el-button>
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
  <!-- 预览图片 -->
  <!-- 弹出表单结束 -->

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
        <el-button icon="el-icon-edit" size="mini" type="success" plain>修改</el-button>
        <el-button icon="el-icon-delete" size="mini" type="danger" plain>删除</el-button>
        <el-button icon="el-icon-search" size="mini" type="warning" plain>导出</el-button>
        <el-button icon="el-icon-refresh" size="mini" type="primary" plain
          >刷新</el-button
        >
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
          <el-button circle size="mini" icon="el-icon-refresh"></el-button>
        </el-tooltip>
      </div>
    </div>
    <el-table
      stripe
      highlight-current-row
      style="width: 100%"
      :indent="60"
      :data="tableData"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column
        align="center"
        v-for="item in tableHeader"
        :class="item.prop"
        :key="item.prop"
        v-bind="item"
      >
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <div class="btns">
            <el-button
              circle
              size="mini"
              icon="el-icon-view"
              @click="() => getArtDetailSync(scope.row._id)"
            ></el-button>
            <el-button circle size="mini" icon="el-icon-edit"></el-button>
            <el-button circle size="mini" type="danger" icon="el-icon-delete"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </section>
  <el-dialog
    title="查看"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    v-model="viewFormVisable"
  >
    <article class="article" v-html="viewArtInfo.html"></article>
    <span slot="footer">
      <el-button @click="">取消</el-button>
      <el-button type="primary" @click="">确定</el-button>
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, Ref } from "vue";
import { ElMessage } from "element-plus";
// import ArtEditor from "../../components/art_editor.vue";
import TinyEditor from "../../components/tiny.vue";
import { uploadImg } from "../../api/upload";
import { getArtList, getArtDetail, insertArt } from "../../api/art";
import dayjs from "dayjs";

onMounted(() => {
  refech();
});

const refech = () => {
  getArtList({}).then((res) => {
    let arts = [...res.arts];
    arts.forEach((art) => {
      art["createdAt"] = dayjs(art["createdAt"]).format("YYYY-MM-DD-HH");
      art["updatedAt"] = dayjs(art["updatedAt"]).format("YYYY-MM-DD-HH");
      art["classify"] = classify[art["classify"]].label;
      art["artState"] = artState[art["artState"]].label;
    });
    tableData.push(...arts);
    // nextTick(() => {
    //   tableData = res.arts;
    // });
  });
};

// Dom Ref

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
};

const handleSizeChange = () => {};
const handleCurrentChange = () => {};

// 提交添加
const submitInsertForm = () => {
  (insertFormRef.value as any).validate((valid: boolean) => {
    if (valid) {
      insertArt(insertFormData).then((res) => {
        if (res.code) {
          dialogCancel();
          refech();
        }
      });
      // console.log(insertFormRef.value);
    } else {
      return false;
    }
  });
};

const getArtDetailSync = async (_id: string) => {
  const { art }: any = await getArtDetail(_id);
  if (art) {
    viewArtInfo.value = art;
    showViewForm();
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

const httpRequest = async (params: any) => {
  // 1.发起上传请求
  uploadImg(params.file).then((res) => {
    insertFormData.cover = res.imgUrl;
  });
};

const onRemove = (file: File) => {
  (upload.value as any).clearFiles();
  // 1.从远程删除文件
  // fileList.value.forEach((item: any, index: number, arr: any) => {
  //   if (item.name == file.name) {
  //     arr.slice(index, 1);
  //   }
  // });
};

const handlePictureCardPreview = (file: any) => {
  previewImgUrl.value = file;
  previewDialogVisible.value = true;
};

const getHtml = (html: string) => {
  insertFormData.html = html;
};

// 文件列表
let previewImgUrl = ref("");
let previewDialogVisible = ref(false);
let fileList: Ref<Array<any>> = ref([]);

// 查询表单数据
const queryFormData = reactive({
  author: "", // 分类
  title: "", // 分类
  classify: "1", // 分类
  artState: "1", // 文章状态
});

// 添加表单数据
const insertFormData = reactive({
  author: "",
  title: "",
  desc: "",
  html: "",
  cover: "",
  content: "",
  classify: "1", // 分类
  artState: "1", // 文章状态
});

// 添加表单验证
const rules = {
  // cover: [
  //   // {
  //   //   required: true,
  //   //   type: "string",
  //   //   message: "请选择上传封面图片",
  //   //   trigger: "change",
  //   // },
  //   // {
  //   //   validator: (rule, value, callback) => {
  //   //     if (value[0] === undefined) {
  //   //       callback(new Error("请选择上传封面图片"));
  //   //     } else {
  //   //       callback();
  //   //     }
  //   //   },
  //   //   trigger: "change",
  //   // },
  // ],
  title: {
    required: true,
    message: "请填写文章标题",
    trigger: ["blur", "change"],
  },
  author: {
    required: true,
    message: "请填写作者",
    trigger: ["blur", "change"],
  },
  desc: [
    {
      required: true,
      message: "请填写文章描述",
      trigger: ["blur", "change"],
    },
    {
      min: 5,
      message: "文章描述不少于5个字符",
      trigger: ["blur", "change"],
    },
  ],
  classify: {
    required: true,
    message: "请选择文章分类",
    trigger: ["blur", "change"],
  },
  artState: {
    required: true,
    message: "请选择文章状态",
    trigger: ["blur", "change"],
  },
};
// 分类下拉框数据
const classify = reactive([
  {
    value: "1",
    label: "随笔",
  },
  {
    value: "2",
    label: "前端",
  },
  {
    value: "3",
    label: "后端",
  },
  {
    value: "4",
    label: "数据库",
  },
  {
    value: "5",
    label: "生活",
  },
]);
// 文章状态数据
const artState = reactive([
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
    label: "删除",
  },
]);

// const queryModel: Array<any> = [
//   {
//     type: "input",
//     model: "title",
//     label: "文章标题",
//     placeholder: "请输入文章标题",
//   },
//   {
//     type: "input",
//     model: "author",
//     label: "作者",
//     placeholder: "请输入作者名称",
//   },
//   {
//     type: "select",
//     model: "state",
//     label: "状态",
//     placeholder: "请选择文章状态",
//     options: [
//       {
//         label: "全部",
//         value: "",
//       },
//       {
//         label: "公开",
//         value: 1,
//       },
//       {
//         label: "隐藏",
//         value: 2,
//       },
//     ],
//   },
//   {
//     type: "select",
//     model: "classify",
//     label: "文章分类",
//     placeholder: "请选择文章分类",
//     options: [
//       {
//         label: "全部",
//         value: "",
//       },
//     ],
//   },
// ];

// 表格头
const tableHeader = reactive([
  {
    label: "ID",
    prop: "_id",
  },
  {
    label: "作者",
    prop: "author",
  },
  {
    label: "标题",
    prop: "title",
  },
  {
    label: "描述",
    prop: "desc",
  },
  {
    label: "分类",
    prop: "classify",
  },
  {
    label: "状态",
    prop: "artState",
  },
  {
    label: "更新时间",
    prop: "updatedAt",
  },
  {
    label: "创建时间",
    prop: "createdAt",
  },
]);
// 表格数据
let tableData = reactive([
  {
    _id: "121321",
    title: "前端开发技巧",
    author: "王小虎",
    classify: "1",
    updatedAt: "2016-05-02",
    createdAt: "2016-05-09",
    artState: "1",
    desc: "上海市普陀区金沙江路 1518 弄",
  },
]);
</script>

<style lang="scss" scoped>
.flex-center {
  @include flex-center;
}
.query-form {
  background-color: #fff;
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .el-form {
    .inputs {
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

  // @media only screen and (max-width: 800px) {
  //   .query-form {
  //     .el-form {
  //       .input-box {
  //         .input {
  //           flex-grow: 1;
  //           max-width: 450px;
  //         }
  //       }
  //     }
  //   }
  // }
}
.table-form {
  margin-top: 20px;
  .table-toolbar {
    @include flex-center;
    padding: 10px;
    background-color: #fff;
    justify-content: flex-start;
    .right {
      width: 100px;
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

::v-deep(.el-overlay) {
  &::-webkit-scrollbar {
    display: none;
  }
}

::v-deep(.el-dialog) {
  width: 80vw !important;
  width: 50%;
  height: 80%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .el-form {
    .el-form-item {
      // width: 100%;
      .el-input {
        max-width: 50%;
      }
    }
  }
}
.el-dialog {
  .article {
    margin: 20px;
    line-height: 1.6;
  }
}
</style>

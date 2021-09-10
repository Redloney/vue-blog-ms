<template>
  <el-row :gutter="20">
    <el-col :span="24" :offset="0">
      <div ref="editor" class="editor"></div>
    </el-col>
    <el-col :span="24" :offset="0">
      <el-button @click="syncHTML">同步内容</el-button>
    </el-col>
    <el-col :span="24" :offset="0">
      <div class="html" :innerHTML="content.html"></div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import hljs from "highlight.js";
import WangEditor from "wangeditor";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
const editor = ref(null);

const content = reactive({
  html: "",
  text: "",
});
let instance: any;

onMounted(() => {
  instance = new WangEditor(editor.value);
  Object.assign(instance.config, {
    uploadImgServer: "",
    onchange() {
      console.log("change");
    },
  });
  instance.highlight = hljs;
  instance.create();
});

onBeforeUnmount(() => {
  instance.destroy();
  instance = null;
});

const syncHTML = () => {
  content.html = instance.txt.html();
};
</script>

<style lang="scss" scoped>
.html {
  /* table 样式 */
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }

  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }

  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }

  /* ul ol 样式 */
  ul,
  ol {
    margin: 10px 0 10px 20px;
  }
}
</style>

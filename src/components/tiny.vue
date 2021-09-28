<template>
  <textarea id="Tiny" hidden />
</template>

<script lang="ts" setup>
import { defineEmit, defineProps, onMounted } from "vue";
import tinymce from "tinymce";

import "tinymce/themes/silver/theme";
import "tinymce/icons/default/icons.js";

import "tinymce/plugins/anchor";
import "tinymce/plugins/advlist";
import "tinymce/plugins/image";
import "tinymce/plugins/hr";
import "tinymce/plugins/link";
import "tinymce/plugins/preview";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/codesample";

onMounted(() => {
  tinymce.init({
    selector: "#Tiny",
    language_url: "/public/zh_CN.js",
    language: "zh_CN",
    height: "600px",
    width: "100%",
    max_width: 100,
    statusbar: false,
    skin_url: "/public/skins/ui/oxide",
    emoticons_database_url: "/public/emojis.js",
    plugins:
      "link lists image code table colorpicker textcolor wordcount contextmenu preview emoticons codesample",
    toolbar:
      "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink emoticons codesample image code preview | removeformat",
    content_css: "/public/skins/content/default/content.css",
    init_instance_callback: (editor) => {
      setHtml();
      editor.on("change", () => {
        getHtml();
      });
    },
  });
});

const props = defineProps({
  html: String,
});

// 函数区

const emit = defineEmit(["getHtml"]);

const setHtml = () => {
  if (props.html) {
    tinymce.activeEditor.setContent(props.html as any);
  }
};

const getHtml = () => {
  const html = tinymce.activeEditor.getContent();
  emit("getHtml", html);
};

// 类型区
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
</style>

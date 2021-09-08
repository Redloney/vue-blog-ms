<template>
  <div ref="editor" class="editor"></div>
  <button @click="syncHTML">同步内容</button>
  <div :innerHTML="content.html"></div>
</template>

<script lang="ts" setup>
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
    onchange() {
      console.log("change");
    },
  });
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

<style lang="scss" scoped></style>

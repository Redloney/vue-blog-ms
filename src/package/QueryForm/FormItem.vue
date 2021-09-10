<template>
  <el-form-item :prop="item?.model">
    <el-input v-if="item?.type === 'input'" v-bind="$attrs" />
    <el-select v-if="item?.type === 'select'" v-bind="$attrs">
      <el-option v-for="option in item.options" :key="option.value" v-bind="option" />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";

interface Options {
  value?: String;
  label?: String;
}

interface Item {
  type?: String;
  model?: String;
  label?: String;
  placeholder?: String;
  options?: Array<Options>;
}

defineProps({
  item: Object as PropType<Item>,
  default: () => ({}),
});
</script>

<style lang="scss" scoped></style>

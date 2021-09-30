<template>
  <div class="wrapper">
    <h2 style="margin-bottom: 20px; text-align: center">双击单元格修改值</h2>
    <el-table
      stripe
      highlight-current-row
      style="width: 100%"
      :indent="60"
      :data="state.tableData"
      @cell-dblclick="rowDblclick"
    >
      <el-table-column label="编号" prop="index" align="center"> </el-table-column>
      <el-table-column label="姓名" prop="name" align="center">
        <template #default="scope">
          <span v-if="!isEdit">{{ scope.row.name }}</span>
          <el-input
            v-if="isEdit"
            v-model="scope.row.name"
            @keydown.enter="() => save(scope.row.index)"
            @blur="() => save(scope.row.index)"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";

onMounted(() => {
  console.log(navigator);
});

const state = reactive({
  tableData: [
    {
      index: 0,
      name: "张三",
    },
  ],
});
// const isEdit = reactive([false]);

// const userinfo = computed(() => {
//   return {
//     appName:navigator
//   }
// })

const isEdit = ref(false);

const save = (index: number) => {
  console.log("save");
  isEdit.value = false;
  // isEdit[index] = false;
};

const rowDblclick = (row: any, column: any, cell: any, event: any) => {
  {
    console.log(event);
    isEdit.value = true;
  }
};
</script>

<style lang="scss" scoped></style>

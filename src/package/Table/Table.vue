<template>
  <div class="table">
    <div class="table-toolbar">
      <div class="btns">
        <el-button icon="el-icon-plus" size="mini" type="primary" plain>新增</el-button>
        <el-button icon="el-icon-edit" size="mini" type="success" plain>修改</el-button>
        <el-button icon="el-icon-delete" size="mini" type="danger" plain>删除</el-button>
        <el-button icon="el-icon-search" size="mini" type="warning" plain>导出</el-button>
        <el-button icon="el-icon-refresh" size="mini" type="primary" plain>刷新</el-button>
      </div>
      <div class="right">
        <el-tooltip content="隐藏搜索栏" placement="top">
          <el-button circle size="mini" icon="el-icon-search"></el-button>
        </el-tooltip>
        <el-tooltip content="刷新数据" placement="top">
          <el-button circle size="mini" icon="el-icon-refresh"></el-button>
        </el-tooltip>
      </div>
    </div>
    <el-table stripe highlight-current-row style="width: 100%" :indent="60" :data="tableData">
      <el-table-column type="selection"></el-table-column>
      <el-table-column align="center" v-for="item in tableHeader" :key="item.prop" v-bind="item" />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <div class="btns">
            <el-button circle size="mini" icon="el-icon-edit"></el-button>
            <el-button circle size="mini" icon="el-icon-plus"></el-button>
            <el-button circle size="mini" type="danger" icon="el-icon-delete"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, reactive, ref, PropType } from 'vue'

interface tableHeaderProps {
  prop: string;
}
interface tableDataProps {
}


defineProps({
  tableData: Array as PropType<tableDataProps[]>,
  tableHeader: Array as PropType<tableHeaderProps[]>
})

// 声明区

// 函数区

const handleSizeChange = (val: any) => {
  console.log(`每页 ${val} 条`);
};

const handleCurrentChange = (val: any) => {
  console.log(`当前页: ${val}`);
};


// 类型区



</script>

<style lang="scss" scoped>
.table {
  margin-top: 20px;
  .table-toolbar {
    padding: 10px;
    background-color: #fff;
    @include flex-center;
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
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
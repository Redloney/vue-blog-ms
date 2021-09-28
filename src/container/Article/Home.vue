<template>
  <div class="home">
    <div class="data">
      <div class="el" v-for="el in state.cards" :key="el.text">
        <el-card class="card" shadow="always" :style="`background-color:${el.color};`">
          <i class="fas fa-user-alt"></i>
          <span class="text">{{ el.text }}</span>
          <!-- <CountTo
            class="num"
            :startVal="el.startVal"
            :endVal="el.endVal"
            :duration="el.duration"
          /> -->
        </el-card>
      </div>
    </div>
    <div class="charts">
      <el-card shadow="always">
        <Echarts />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CountTo from '../../components/vue-count-to/vue-countTo.vue'
import Echarts from '../../components/echarts.vue'
import { reactive } from 'vue'

const state = reactive({
  cards: [
    {
      icon: '',
      text: '访客',
      startVal: 0,
      endVal: 122,
      duration: 2000,
      color: '#fed330',
    },
    {
      icon: '',
      text: '消息',
      startVal: 0,
      endVal: 200,
      duration: 2000,
      color: '#fc5c65',
    },
    {
      icon: '',
      text: '金额',
      startVal: 0,
      endVal: 1350,
      duration: 2000,
      color: '#45aaf2',
    },
    {
      icon: '',
      text: '订单',
      startVal: 0,
      endVal: 56,
      duration: 3000,
      color: '#2bcbba',
    },
  ],
})
</script>
<style lang="scss" scoped>
.data {
  width: 100%;
  overflow: hidden;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  .el {
    flex-grow: 1;
    flex-basis: 200px;
    .el-card {
      @include flex-center;
      flex-wrap: nowrap;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 15px 0;
      width: 100%;
      overflow: hidden;
      :deep .el-card__body {
        color: #fff;
        width: 100%;
        text-align: center;
        i {
          font-size: 25px;
        }
        .text {
          font-weight: bold;
          margin: 0 15px;
        }
        .num {
          font-weight: bold;
        }
      }
    }
  }
}
.charts {
  margin-top: 20px;
}
</style>

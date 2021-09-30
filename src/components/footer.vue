<template>
  <el-row class="footer-content">
    <!-- <el-col class="part" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <h2 class="title">关于</h2>
      <p class="content">
        在你面前的是：业余发呆爱好者、柠檬吞噬者、国家一级退堂鼓鼓手、耳机依赖患者、宇宙一级潜在鸽王、退役熬夜选手、拖延俱乐部顶级VIP、资深网络表情包传播者、霍格沃茨废话大赛冠军、赖床世锦赛冠军得主！
      </p>
    </el-col>
    <el-col class="part" :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
      <h2 class="title">类目</h2>
      <p class="content">
        <a href="#">友情链接</a>
        <a href="#">关于</a>
      </p>
    </el-col>
    <el-col class="part" :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
      <h2 class="title">小伙伴</h2>
      <p class="content">
        <a href="#">绿箭侠</a>
        <a href="#">闪电侠</a>
        <a href="#">超人</a>
      </p>
    </el-col> -->
    <el-col class="part" :span="24">
      <p class="copyright">
        © RedLoney |
        <a href="https://beian.miit.gov.cn/">鄂ICP备20004008号-1</a>
      </p>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { ElRow, ElCol } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ElRow,
    ElCol,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.footer-content {
  margin-top: 20px;
  background-color: #23262e;
  padding: 30px;
  font-family: webmo;
  .part {
    color: #fff;
    padding: 15px;
    .title {
      line-height: 32px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      position: relative;
      padding-left: 15px;
      font-weight: normal;
      letter-spacing: 5px;
      margin-bottom: 15px;
      font-size: 16px;
      color: #fff;
      &::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 0;
        width: 4px;
        height: 22px;
        background-color: #fa5c7c;
        border-radius: 10px;
      }
    }
    .content {
      margin-right: 20%;
      line-height: 1.8;
      font-size: 14px;
      a {
        text-decoration: none;
        color: inherit;
        display: inline-block;
        padding: 3px 5px;
        color: #fff9;
        transition: 300ms linear;
        &:hover,
        &:focus {
          color: #fff;
          // transform: scale(1.125);
          transition: 300ms linear;
        }
      }
    }
    .copyright {
      // border-top: 2px solid rgba(255, 255, 255, 0.651);
      // padding-top: 20px;
      text-align: center;
      width: 100%;
      font-size: 14px;
      letter-spacing: 1.5px;
      font-weight: 800 !important;
      font-family: "SentyTEA";
      a {
        color: #fff;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
          text-underline-offset: 5px;
        }
      }
    }
  }
}
</style>

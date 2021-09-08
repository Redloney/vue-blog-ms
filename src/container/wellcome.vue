<template>
  <div class="wellcome">
    <div class="desc">
      <h1>欢迎你，陌生人 ~</h1>
      <h2>Redloney`s 后台管理系统</h2>
    </div>
    <div class="img" />
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.wellcome {
  width: 100%;
  height: 65%;
  box-sizing: border-box;
  background-color: #fff;
  font-family: webmo;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  overflow: hidden;
  position: relative;
  .desc {
    z-index: 1;
    h1 {
      font-size: 40px;
      margin-top: 1rem;
    }
    h2 {
      font-size: 30px;
      color: deepskyblue;
      margin-top: 50px;
    }
  }
  .img {
    width: 500px;
    height: 500px;
    z-index: 0;
    position: absolute;
    top: 0;
    right: 0;
    margin-left: 1rem;
    background: url("@/assets/image/welcome.f2330815.png");
    background-size: cover;
  }
}
</style>

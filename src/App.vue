<template>
  <router-view></router-view>
  <!-- <dateTime /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dateTime from "./components/dateTime.vue";

export default defineComponent({
  name: "App",
  components: {
    dateTime,
  },
});
</script>

<style>
/* @import url("./assets/styles/scss/mixin");
@import url("./assets/styles/scss/transition"); */
</style>

<template>
  <div class="datetime">
    <p>{{ time }}</p>
    <br />
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import "dayjs/locale/zh-cn";
dayjs.extend(isLeapYear);
dayjs.locale("zh-cn");
import { ref, defineComponent, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: "datetime",
  setup: () => {
    let time = ref();
    let timer = ref();
    onMounted(() => {
      dayjs().format();
      timer.value = setInterval(() => {
        time.value = dayjs(new Date()).format("YYYY-MM-DD:hh:mm:ss");
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(timer as any);
    });

    return { time };
  },
});
</script>

<style lang="scss" scoped>
.datetime {
  font-weight: bold;
  font-family: webmo;
  .label {
    color: #333;
  }
}
</style>

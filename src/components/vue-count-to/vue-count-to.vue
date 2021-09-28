<template>
  <span>{{ displayValue }}</span>
</template>

<script setup>
import { requestAnimationFrame, cancelAnimationFrame } from "./requestAnimationFrame.js";
import { reactive, defineProps, onMounted } from "vue";
const props = defineProps({
  startVal: {
    type: Number,
    required: false,
    default: 0,
  },
  endVal: {
    type: Number,
    required: false,
    default: 2017,
  },
  duration: {
    type: Number,
    required: false,
    default: 3000,
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: true,
  },
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value) {
      return value >= 0;
    },
  },
  decimal: {
    type: String,
    required: false,
    default: ".",
  },
  separator: {
    type: String,
    required: false,
    default: ",",
  },
  prefix: {
    type: String,
    required: false,
    default: "",
  },
  suffix: {
    type: String,
    required: false,
    default: "",
  },
  useEasing: {
    type: Boolean,
    required: false,
    default: true,
  },
  easingFn: {
    type: Function,
    default(t, b, c, d) {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    },
  },
});
const state = reactive({
  localStartVal: this.startVal,
  displayValue: this.formatNumber(this.startVal),
  printVal: null,
  paused: false,
  localDuration: this.duration,
  startTime: null,
  timestamp: null,
  remaining: null,
  rAF: null,
});

const countDown = computed(() => {
  return props.startVal > props.endVal;
});

// Hooks
onMounted(() => {
  if (props.autoplay) {
    start();
  }
});

const start = () => {};

onUnmounted(() => {
  cancelAnimationFrame(this.rAF);
});
</script>

<style lang="scss" scoped></style>

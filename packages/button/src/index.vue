<template>
  <el-button v-bind="$attrs"  @click="handleClick">
    <slot />
  </el-button>
</template>

<script setup lang="ts">
defineOptions({ name: "HlButton" })
import { throttle, debounce } from "../../utils"
import { getCurrentInstance } from "vue"
const { emit } = getCurrentInstance()

const emits = defineEmits(['click'])

const props = defineProps({
  time: { type: Number, default: 500 }, // 节流/防抖间隔
  mode: { type: String, default: "none" }, // "throttle" | "debounce" | "none"
  eventName: { type: String, default: "click" }, // 触发事件名
  leading: { type: Boolean, default: false }, // 初始
  trailing: { type: Boolean, default: true }, // 结尾
  immediate: { type: Boolean, default: false } // 是否立即执行
})

// 生成节流/防抖函数
let handler: (...args: any[]) => void

if (props.mode === "throttle") {
  handler = throttle((...args: any[]) => emit(props.eventName, ...args), props.time, {
    leading: props.leading,
    trailing: props.trailing
  })
} else if (props.mode === "debounce") {
  handler = debounce((...args: any[]) => emit(props.eventName, ...args), props.time, props.immediate)
} else {
  handler = (...args: any[]) => emit(props.eventName, ...args)
}

function handleClick(event: MouseEvent) {
  handler(event)
}
</script>

<style lang="scss" scoped>
/* 可自定义样式 */
</style>

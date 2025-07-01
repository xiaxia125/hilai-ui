<template>
  <hl-button :time="time" @clickFn="clickFn" event-name="clickFn">按钮</hl-button>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"

const time = ref(1000)
const clickFn = (e) => {
  ElMessage.success('点击了按钮')
}
</script>

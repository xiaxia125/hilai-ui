<template>
  <el-button v-bind="attrs" @click="clickFn">
    <slot>你他娘的不会自己取个名字吗？</slot>
  </el-button>
</template>

<script setup>
import { useAttrs } from 'vue';
import { balloons } from "balloons-js";

const props = defineProps({
  fuck: {
    type: Boolean,
    default: false
  }
})

const clickFn = () => {
  emit('click')
  if(props.fuck){
    balloons();
  }
}
</script>

<style scoped>
/* 自定义样式 */
</style>
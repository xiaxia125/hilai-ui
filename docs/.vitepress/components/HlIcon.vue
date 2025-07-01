<template>
  <el-icon>
    <component :is="icon"></component>
  </el-icon>
</template>
<script setup lang="tsx" name="HlIcon">
defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>

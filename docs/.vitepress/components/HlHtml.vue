<template>
  <div class="t_v_html" v-html="html"></div>
</template>

<script setup lang="ts" name="HlHtml">
defineProps({
  html: {
    type: String,
    default: ""
  }
})
</script>

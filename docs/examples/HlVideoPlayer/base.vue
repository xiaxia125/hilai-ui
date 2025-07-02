<template>
  <hl-video-player :url="VideoUrl" />
</template>

<script lang="ts" setup>

import { ref } from 'vue'
const VideoUrl = ref('')

</script>

<template>
  <hl-pagination
    :total="100"
    @pagination="paginationHandle"
    v-model:page="params.page"
    v-model:limit="params.limit"
    background
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const params = ref({
  page: 1,
  limit: 10,
})
const paginationHandle = (e) => {
  console.log(e) //{page: 2, limit: 10}
  ElMessage.success(JSON.stringify(e))
}
</script>

<template>
  <hl-file-upload
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :multiple="true"
    :drag="false"
    tip-text="支持多文件上传，单个文件不超过5MB"
    :max-size="5"
    :limit="3"
    accept=".jpg,.png,.pdf"
    @success="handleSuccess"
    @error="handleError"
    @exceed="handleExceed"
  />
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleSuccess = (data) => {
  ElMessage.success('上传成功')
  console.log('上传成功:', data)
}

const handleError = (data) => {
  ElMessage.error('上传失败')
  console.log('上传失败:', data)
}

const handleExceed = (files) => {
  ElMessage.warning(`最多只能上传3个文件，本次选择了${files.length}个文件`)
}
</script>
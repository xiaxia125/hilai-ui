<template>
  <hl-file-upload
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :multiple="true"
    :drag="true"
    tip-text="支持拖拽上传，文件大小不超过10MB"
    :max-size="10"
    :limit="5"
    accept=".jpg,.png,.pdf,.doc,.docx"
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
  ElMessage.warning(`最多只能上传5个文件，本次选择了${files.length}个文件`)
}
</script> 
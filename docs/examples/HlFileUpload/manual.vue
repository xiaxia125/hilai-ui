<template>
  <hl-file-upload
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :auto-upload="false"
    :multiple="true"
    :limit="5"
    :max-size="10"
    accept=".jpg,.png,.pdf,.doc,.docx"
    tip-text="选择文件后需要手动点击上传按钮"
    @success="handleSuccess"
    @error="handleError"
    @exceed="handleExceed"
  />
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleSuccess = (data) => {
  ElMessage.success('手动上传成功')
  console.log('上传成功:', data)
}

const handleError = (data) => {
  ElMessage.error('手动上传失败')
  console.log('上传失败:', data)
}

const handleExceed = (files) => {
  ElMessage.warning(`最多只能上传5个文件，本次选择了${files.length}个文件`)
}
</script> 
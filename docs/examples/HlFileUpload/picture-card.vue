<template>
  <hl-file-upload
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    accept="image/*"
    :multiple="true"
    :limit="9"
    :max-size="3"
    tip-text="支持jpg、png、gif等图片格式，单个文件不超过3MB"
    @success="handleSuccess"
    @error="handleError"
    @preview="handlePreview"
  />
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleSuccess = (data) => {
  ElMessage.success('图片上传成功')
  console.log('上传成功:', data)
}

const handleError = (data) => {
  ElMessage.error('图片上传失败')
  console.log('上传失败:', data)
}

const handlePreview = (file) => {
  console.log('预览图片:', file.name)
}
</script> 
<template>
  <hl-file-upload
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :auto-fetch-oss-url="true"
    :oss-signature-api="getOssSignatureUrl"
    :multiple="true"
    :limit="5"
    accept="image/*"
    tip-text="上传后自动获取OSS签名访问URL"
    @success="handleSuccess"
    @error="handleError"
    @oss-url-received="handleOssUrlReceived"
  />
</template>

<script setup>
import { ElMessage } from 'element-plus'

// 模拟OSS签名URL获取接口
const getOssSignatureUrl = async (fileUrl) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟返回OSS签名URL
  return {
    success: true,
    data: `https://oss.example.com/signed/${Date.now()}.jpg`,
    message: '获取签名URL成功'
  }
}

const handleSuccess = (data) => {
  ElMessage.success('文件上传成功，正在获取OSS签名URL...')
  console.log('上传成功:', data)
}

const handleError = (data) => {
  ElMessage.error('文件上传失败')
  console.log('上传失败:', data)
}

const handleOssUrlReceived = ({ originalUrl, ossUrl, file }) => {
  ElMessage.success('OSS签名URL获取成功')
  console.log('文件:', file.name)
  console.log('原始URL:', originalUrl)
  console.log('OSS签名URL:', ossUrl)
}
</script> 
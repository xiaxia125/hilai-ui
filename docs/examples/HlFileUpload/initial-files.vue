<template>
  <div>
    <hl-file-upload
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :initial-files="initialFiles"
      :auto-fetch-oss-url="true"
      :oss-signature-api="getOssSignatureUrl"
      :multiple="true"
      :limit="10"
      accept="image/*"
      tip-text="显示初始文件列表，支持OSS签名URL获取"
      @success="handleSuccess"
      @error="handleError"
      @oss-url-received="handleOssUrlReceived"
    />
    
    <div style="margin-top: 20px;">
      <el-button @click="addInitialFile">添加初始文件</el-button>
      <el-button @click="clearInitialFiles">清空初始文件</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 初始文件列表
const initialFiles = ref([
  {
    name: 'example1.jpg',
    url: 'https://example.com/files/example1.jpg',
    status: 'success',
    uid: '1'
  },
  {
    name: 'example2.png',
    url: 'https://example.com/files/example2.png',
    status: 'success',
    uid: '2'
  }
])

// 模拟OSS签名URL获取接口
const getOssSignatureUrl = async (fileUrl) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    success: true,
    data: `https://oss.example.com/signed/${Date.now()}.jpg`,
    message: '获取签名URL成功'
  }
}

const handleSuccess = (data) => {
  ElMessage.success('文件上传成功')
  console.log('上传成功:', data)
}

const handleError = (data) => {
  ElMessage.error('文件上传失败')
  console.log('上传失败:', data)
}

const handleOssUrlReceived = ({ originalUrl, ossUrl, file }) => {
  console.log('获取到OSS签名URL:', ossUrl)
}

// 添加初始文件
const addInitialFile = () => {
  const newFile = {
    name: `example${initialFiles.value.length + 1}.jpg`,
    url: `https://example.com/files/example${initialFiles.value.length + 1}.jpg`,
    status: 'success',
    uid: String(initialFiles.value.length + 1)
  }
  initialFiles.value.push(newFile)
  ElMessage.success('添加初始文件成功')
}

// 清空初始文件
const clearInitialFiles = () => {
  initialFiles.value = []
  ElMessage.success('清空初始文件成功')
}
</script> 
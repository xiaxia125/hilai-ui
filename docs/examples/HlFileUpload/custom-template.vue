<template>
  <hl-file-upload
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture"
    :multiple="true"
    :limit="5"
    accept="image/*"
    tip-text="自定义文件项模板显示"
    @success="handleSuccess"
    @error="handleError"
  >
    <template #file="{ file }">
      <div class="custom-file-item">
        <div class="file-preview">
          <img 
            v-if="isImageFile(file)" 
            :src="file.ossUrl || file.url" 
            :alt="file.name"
            class="file-image"
          >
          <div v-else class="file-icon">
            <el-icon><Document /></el-icon>
          </div>
        </div>
        <div class="file-info">
          <div class="file-name">{{ file.name }}</div>
          <div class="file-meta">
            <span class="file-size">{{ formatFileSize(file.size) }}</span>
            <span class="file-status" :class="file.status">
              {{ getStatusText(file.status) }}
            </span>
          </div>
        </div>
        <div class="file-actions">
          <el-button 
            v-if="isImageFile(file)" 
            size="small" 
            type="primary" 
            @click="handlePreview(file)"
          >
            预览
          </el-button>
          <el-button 
            size="small" 
            type="danger" 
            @click="handleRemove(file)"
          >
            删除
          </el-button>
        </div>
      </div>
    </template>
  </hl-file-upload>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue'

const handleSuccess = (data) => {
  ElMessage.success('文件上传成功')
  console.log('上传成功:', data)
}

const handleError = (data) => {
  ElMessage.error('文件上传失败')
  console.log('上传失败:', data)
}

// 判断是否为图片文件
const isImageFile = (file) => {
  const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']
  if (file.type && imageTypes.includes(file.type)) {
    return true
  }
  if (file.name) {
    const ext = file.name.split('.').pop()?.toLowerCase()
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext || '')
  }
  return false
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (!bytes) return '未知大小'
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    'ready': '准备中',
    'uploading': '上传中',
    'success': '上传成功',
    'fail': '上传失败'
  }
  return statusMap[status] || '未知状态'
}

// 预览文件
const handlePreview = (file) => {
  console.log('预览文件:', file.name)
  ElMessage.info(`预览文件: ${file.name}`)
}

// 删除文件
const handleRemove = (file) => {
  console.log('删除文件:', file.name)
  ElMessage.success(`删除文件: ${file.name}`)
}
</script>

<style scoped>
.custom-file-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  margin-bottom: 8px;
  background: #fff;
  transition: all 0.3s;
}

.custom-file-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
}

.file-preview {
  width: 60px;
  height: 60px;
  margin-right: 12px;
  border-radius: 4px;
  overflow: hidden;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-icon {
  font-size: 24px;
  color: #909399;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-weight: 500;
  color: #303133;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
}

.file-size {
  color: #909399;
}

.file-status {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
}

.file-status.success {
  background: #f0f9ff;
  color: #67c23a;
}

.file-status.uploading {
  background: #fff7e6;
  color: #e6a23c;
}

.file-status.fail {
  background: #fef0f0;
  color: #f56c6c;
}

.file-actions {
  display: flex;
  gap: 8px;
}
</style> 
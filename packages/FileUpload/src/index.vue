<template>
  <div class="file-upload-container">
    <el-upload
      :action="action"
      :multiple="multiple"
      :limit="limit"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-change="handleChange"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :drag="drag"
      :accept="accept"
      :disabled="disabled"
      :auto-upload="autoUpload"
      :list-type="listType"
      :show-file-list="showFileList"
      :data="data"
      :headers="headers"
      ref="uploadRef"
    >
      <template #trigger>
        <slot name="trigger">
          <el-button type="primary">选择文件</el-button>
        </slot>
      </template>
      
      <template #tip>
        <slot name="tip">
          <div class="el-upload__tip" v-if="tipText">{{ tipText }}</div>
        </slot>
      </template>
      
      <!-- 自定义文件项模板 - 与Element Plus默认样式保持一致 -->
      <template #file="{ file }">
        <slot name="file" :file="file">
          <!-- 使用自定义渲染且文件有ossUrl时 -->
          <div v-if="useCustomRender && file.ossUrl">
            <!-- 缩略图/图标区域 -->
            <template v-if="listType === 'picture' || listType === 'picture-card'">
              <div class="el-upload-list__item-thumbnail" v-if="isImageFile(file)">
                <img style="width: 148px; height: 148px;" :src="file.ossUrl" :alt="file.name">
              </div>
              <div v-else class="el-upload-list__item-thumbnail file-icon">
                <el-icon><Document /></el-icon>
              </div>
            </template>
            
            <!-- 文件名区域 -->
            <div :class="{'el-upload-list__item-info': true, 'picture': listType === 'picture'}">
              <span class="el-upload-list__item-name">
                <el-icon><Document /></el-icon>
                {{ file.name }}
              </span>
              <span v-if="listType === 'text'" class="el-upload-list__item-status-label">
                <el-icon v-if="file.status === 'success'"><CircleCheck /></el-icon>
              </span>
            </div>
            
            <!-- 操作区域 -->
            <div class="el-upload-list__item-actions">
              <!-- 预览按钮 -->
              <span 
                v-if="isImageFile(file) && !disabled" 
                class="el-upload-list__item-preview" 
                @click="handlePreview(file)"
              >
                <el-icon><ZoomIn /></el-icon>
              </span>
              
              <!-- 删除按钮 -->
              <span 
                v-if="!disabled" 
                class="el-upload-list__item-delete" 
                @click="handleRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </div>
            
            <!-- 上传进度 -->
            <el-progress 
              v-if="file.status === 'uploading'" 
              :percentage="file.percentage || 0" 
              :type="listType === 'picture-card' ? 'circle' : 'line'" 
              :stroke-width="listType === 'picture-card' ? 6 : 2"
            />
          </div>
        </slot>
      </template>
    </el-upload>
    
    <!-- 图片预览对话框 -->
    <el-dialog v-model="previewVisible" title="图片预览" width="800px" append-to-body>
      <img v-if="previewFile" :src="previewFile.ossUrl || previewFile.url" class="preview-image" alt="预览图">
    </el-dialog>
    
    <div class="upload-control" v-if="!autoUpload && fileList.length > 0">
      <el-button type="success" @click="submitUpload">开始上传</el-button>
      <el-button @click="clearFiles">清空文件列表</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, defineExpose, watch, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Document, CircleCheck, ZoomIn, Delete } from '@element-plus/icons-vue'

// 定义组件名称
defineOptions({
  name: 'HlFileUpload'
})

// 定义文件类型接口
interface FileItem {
  name: string
  url?: string
  ossUrl?: string
  status: 'ready' | 'uploading' | 'success' | 'fail'
  uid: string | number
  percentage?: number
  type?: string
  size?: number
  [key: string]: any
}

// 定义Props
const props = defineProps({
  // 上传的地址
  action: {
    type: String,
    required: true
  },
  // 是否支持多选文件
  multiple: {
    type: Boolean,
    default: false
  },
  // 最大允许上传个数
  limit: {
    type: Number,
    default: 5
  },
  // 接受上传的文件类型
  accept: {
    type: String,
    default: ''
  },
  // 提示文字
  tipText: {
    type: String,
    default: '支持jpg、png、pdf等格式文件，单个文件不超过10MB'
  },
  // 上传时附带的额外参数
  data: {
    type: Object,
    default: () => ({})
  },
  // 是否启用拖拽上传
  drag: {
    type: Boolean,
    default: false
  },
  // 设置上传的请求头部
  headers: {
    type: Object,
    default: () => ({})
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否自动上传
  autoUpload: {
    type: Boolean,
    default: true
  },
  // 文件列表的类型, text/picture/picture-card
  listType: {
    type: String,
    default: 'text'
  },
  // 是否显示已上传文件列表
  showFileList: {
    type: Boolean,
    default: true
  },
  // 最大文件大小(MB)
  maxSize: {
    type: Number,
    default: 10
  },
  // 是否自动获取OSS访问URL
  autoFetchOssUrl: {
    type: Boolean,
    default: false
  },
  // 获取OSS签名URL的接口 - Function类型的请求方法
  ossSignatureApi: {
    type: Function,
    required: false,
    default: () => Promise.resolve({})
  },
  // 上传失败时是否从列表中移除文件
  removeOnError: {
    type: Boolean,
    default: true
  },
  // 初始文件列表（用于回显）
  initialFiles: {
    type: Array,
    default: () => []
  }
})

// 定义事件
const emit = defineEmits([
  'success',
  'error',
  'progress',
  'change',
  'exceed',
  'remove',
  'ossUrlReceived',
  'preview'
])

// 计算属性：是否使用自定义渲染
const useCustomRender = computed(() => {
  return props.autoFetchOssUrl
})

// 响应式数据
const fileList = ref([])
const uploadRef = ref()
const previewVisible = ref(false)
const previewFile = ref(null)

// 处理文件预览
const handlePreview = (file) => {
  previewFile.value = file
  previewVisible.value = true
  emit('preview', file)
}

// 处理移除文件
const handleRemove = (file) => {
  emit('remove', file)
}

// 判断文件是否为图片
const isImageFile = (file) => {
  const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']
  
  // 检查文件类型
  if (file.type && imageTypes.includes(file.type)) {
    return true
  }
  
  // 通过文件名后缀判断
  if (file.name) {
    const ext = file.name.split('.').pop()?.toLowerCase()
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext || '')
  }
  
  return false
}

// 监听初始文件列表变化
watch(() => props.initialFiles, (newFiles) => {
  if (newFiles && newFiles.length > 0) {
    updateFileList(newFiles)
  }
}, { deep: true })

// 组件挂载时，如果有初始文件列表，则初始化文件列表
onMounted(() => {
  if (props.initialFiles && props.initialFiles.length > 0) {
    updateFileList(props.initialFiles)
  }
})

// 更新文件列表并自动获取OSS签名URL（如果启用）
const updateFileList = async (files) => {
  // 确保文件对象格式符合el-upload要求
  const formattedFiles = files.map(file => {
    // 如果已经是标准的文件对象格式，就直接返回
    if (file.name && file.url && file.status) {
      return {
        ...file,
        ossUrl: file.ossUrl || '' // 确保有ossUrl属性
      }
    }
    
    // 否则，创建一个符合el-upload要求的文件对象
    return {
      name: file.name || '未命名文件',
      url: file.url || '', // 设置原始URL
      ossUrl: file.ossUrl || '', // 保留OSS URL（如果有）
      status: 'success', // 默认为已上传成功状态
      uid: file.uid || Date.now() + Math.random().toString(36).substring(2, 10)
    }
  })
  
  // 更新文件列表
  fileList.value = formattedFiles
  
  // 如果启用了自动获取OSS签名URL，并且提供了ossSignatureApi
  if (props.autoFetchOssUrl && props.ossSignatureApi) {
    // 为每个文件获取OSS签名URL（如果文件有url但没有ossUrl）
    const ossPromises = formattedFiles.map(async (file) => {
      // 如果文件有url但没有ossUrl，则获取OSS签名URL
      if (file.url && !file.ossUrl) {
        try {
          await getOssSignatureUrl(file.url, file)
        } catch (error) {
          console.error(`获取文件 "${file.name}" 的OSS签名URL失败:`, error)
        }
      }
      return file
    })
    
    // 等待所有OSS签名URL获取完成
    try {
      await Promise.all(ossPromises)
    } catch (error) {
      console.error('获取初始文件的OSS签名URL时发生错误:', error)
    }
  }
}

// 文件超出个数限制时的钩子
const handleExceed = (files) => {
  ElMessage.warning(`最多只能上传 ${props.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.value.length} 个文件`)
  emit('exceed', files)
}

// 文件上传成功时的钩子
const handleSuccess = async (response, file, fileList) => {
  ElMessage.success('上传成功')
  
  // 如果配置了自动获取OSS访问URL和接口URL
  if (props.autoFetchOssUrl && props.ossSignatureApi) {
    try {
      await getOssSignatureUrl(response.url, file)
    } catch (error) {
      console.error('获取OSS签名URL失败', error)
    }
  }
  
  emit('success', { response, file, fileList })
}

// 获取OSS签名访问URL
const getOssSignatureUrl = async (fileUrl, file) => {
  try {
    console.log('开始获取OSS签名URL, 原始URL:', fileUrl)
    
    if (typeof props.ossSignatureApi !== 'function') {
      throw new Error('未提供有效的OSS签名API')
    }
    
    // 调用API获取签名URL
    const response = await props.ossSignatureApi(fileUrl)
    
    if (response && response.success) {
      const ossUrl = response.data
      
      // 设置文件的OSS访问URL
      file.ossUrl = ossUrl
      
      // 发送事件通知
      emit('ossUrlReceived', { 
        originalUrl: fileUrl,
        ossUrl: ossUrl,
        file
      })
      
      return ossUrl
    } else {
      throw new Error(response?.message || '获取OSS签名URL失败')
    }
  } catch (error) {
    ElMessage.error('获取图片访问路径失败')
    throw error
  }
}

// 文件上传失败时的钩子
const handleError = (error, file) => {
  ElMessage.error('上传失败')
  
  // 从列表中移除失败的文件
  if (props.removeOnError) {
    // 使用uploadRef直接移除文件
    uploadRef.value?.handleRemove(file)
    
    // 更新本地fileList，过滤掉失败的文件
    fileList.value = fileList.value.filter(item => item.uid !== file.uid)
  }
  
  emit('error', { error, file, fileList: fileList.value })
}

// 文件上传时的钩子
const handleProgress = (event, file, fileList) => {
  emit('progress', { event, file, fileList })
}

// 文件状态改变时的钩子
const handleChange = (file, changedFileList) => {
  // 更新本地的fileList引用
  fileList.value = changedFileList
  emit('change', { file, fileList: changedFileList })
}

// 上传文件之前的钩子
const beforeUpload = (file) => {
  const isLtMaxSize = file.size / 1024 / 1024 < props.maxSize
  if (!isLtMaxSize) {
    ElMessage.error(`上传文件大小不能超过 ${props.maxSize}MB!`)
    return false
  }
  return true
}

// 手动触发上传
const submitUpload = () => {
  uploadRef.value?.submit()
}

// 清空文件列表
const clearFiles = () => {
  uploadRef.value?.clearFiles()
  fileList.value = []
}

// 手动获取OSS签名URL的方法（暴露给父组件使用）
const fetchOssUrl = async (url, file) => {
  return await getOssSignatureUrl(url, file)
}

// 暴露方法给父组件
defineExpose({
  submitUpload,
  clearFiles,
  fetchOssUrl,
  updateFileList,
  handlePreview
})
</script>

<style scoped>
.file-upload-container {
  width: 100%;
}

.upload-control {
  margin-top: 15px;
}

.el-upload__tip {
  font-size: 12px;
  color: #606266;
  margin-top: 7px;
}

/* 预览图片样式 */
.preview-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  margin: 0 auto;
  display: block;
}

/* 文件图标样式 */
.file-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 28px;
}

/* 兼容内置样式 */
:deep(.el-upload-list__item) {
  transition: all 0.3s;
}

:deep(.el-upload-list__item-actions) {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 20px;
  padding: 0 8px;
}

:deep(.el-upload-list__item-actions span) {
  cursor: pointer;
  margin-left: 5px;
}

:deep(.el-upload-list__item-actions span i) {
  color: #fff;
  font-size: 20px;
}

:deep(.el-upload-list__item:hover .el-upload-list__item-actions) {
  opacity: 1;
}

:deep(.el-upload-list__item-preview),
:deep(.el-upload-list__item-delete),
:deep(.el-upload-list__item-download) {
  font-weight: 400;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: all 0.3s;
}

:deep(.el-upload-list__item-preview:hover),
:deep(.el-upload-list__item-delete:hover),
:deep(.el-upload-list__item-download:hover) {
  color: #409eff;
}

/* 图片列表样式 */
:deep(.el-upload-list--picture-card) {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  position: relative;
  /* margin: 0 8px 8px 0; */
  width: 148px;
  height: 148px;
  border-radius: 6px;
  overflow: hidden;
}
</style> 
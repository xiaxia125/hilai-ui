# hl-fileUpload 文件上传组件

基于 Element Plus 的 `el-upload` 组件进行二次封装，提供了更丰富的功能和更好的用户体验。支持文件上传、OSS签名URL自动获取、图片预览、文件类型限制等功能。

## 基础用法

### 基础文件上传

:::demo
HlFileUpload/base
:::

## 多种上传模式

### 拖拽上传

支持拖拽文件到指定区域进行上传。

:::demo
HlFileUpload/drag
:::

### 图片上传

支持图片预览和缩略图显示。

:::demo
HlFileUpload/picture
:::

### 图片卡片上传

卡片式布局，适合图片展示。

:::demo
HlFileUpload/picture-card
:::

### 手动上传

禁用自动上传，需要手动触发上传。

:::demo
HlFileUpload/manual
:::

### OSS签名URL自动获取

自动获取OSS签名访问URL，适用于私有存储的文件访问。

:::demo
HlFileUpload/oss
:::

### 文件回显

支持初始文件列表回显，适用于编辑场景。

:::demo
HlFileUpload/initial-files
:::

### 自定义文件项模板

自定义文件项的显示样式和操作。

:::demo
HlFileUpload/custom-template
:::

## 属性

除继承 `el-upload` 的所有属性外，新增以下属性：

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| action | 上传的地址 | string | — | — |
| multiple | 是否支持多选文件 | boolean | — | `false` |
| limit | 最大允许上传个数 | number | — | `5` |
| accept | 接受上传的文件类型 | string | — | `''` |
| tipText | 提示文字 | string | — | `'支持jpg、png、pdf等格式文件，单个文件不超过10MB'` |
| data | 上传时附带的额外参数 | object | — | `{}` |
| drag | 是否启用拖拽上传 | boolean | — | `false` |
| headers | 设置上传的请求头部 | object | — | `{}` |
| disabled | 是否禁用 | boolean | — | `false` |
| autoUpload | 是否自动上传 | boolean | — | `true` |
| listType | 文件列表的类型 | string | `text` / `picture` / `picture-card` | `text` |
| showFileList | 是否显示已上传文件列表 | boolean | — | `true` |
| maxSize | 最大文件大小(MB) | number | — | `10` |
| autoFetchOssUrl | 是否自动获取OSS访问URL | boolean | — | `false` |
| ossSignatureApi | 获取OSS签名URL的接口 | function | — | — |
| removeOnError | 上传失败时是否从列表中移除文件 | boolean | — | `true` |
| initialFiles | 初始文件列表（用于回显） | array | — | `[]` |

## 事件

| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| success | 文件上传成功时的钩子 | `{ response, file, fileList }` |
| error | 文件上传失败时的钩子 | `{ error, file, fileList }` |
| progress | 文件上传时的钩子 | `{ event, file, fileList }` |
| change | 文件状态改变时的钩子 | `{ file, fileList }` |
| exceed | 文件超出个数限制时的钩子 | `files` |
| remove | 文件列表移除文件时的钩子 | `file` |
| ossUrlReceived | 获取到OSS签名URL时的钩子 | `{ originalUrl, ossUrl, file }` |
| preview | 点击文件列表中已上传的文件时的钩子 | `file` |

## 插槽

| 插槽名 | 说明 | 作用域参数 |
| :--- | :--- | :--- |
| trigger | 触发文件选择框的内容 | — |
| tip | 提示说明文字 | — |
| file | 自定义文件项模板 | `{ file }` |

## 方法

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 |
| :--- | :--- | :--- |
| submitUpload | 手动上传文件列表 | — |
| clearFiles | 清空文件列表 | — |
| fetchOssUrl | 手动获取OSS签名URL | `(url, file)` |
| updateFileList | 更新文件列表 | `files` |
| handlePreview | 预览文件 | `file` |

## 使用示例

### 基础文件上传
```vue
<template>
  <hl-file-upload
    action="/api/upload"
    :multiple="true"
    :limit="5"
    accept=".jpg,.png,.pdf,.doc,.docx"
    tip-text="支持jpg、png、pdf、doc等格式，单个文件不超过10MB"
    @success="handleSuccess"
    @error="handleError"
  />
</template>

<script setup>
const handleSuccess = ({ response, file, fileList }) => {
  console.log('上传成功:', file.name)
}

const handleError = ({ error, file }) => {
  console.log('上传失败:', file.name, error)
}
</script>
```

### 图片上传带预览
```vue
<template>
  <hl-file-upload
    action="/api/upload"
    list-type="picture-card"
    accept="image/*"
    :multiple="true"
    :limit="9"
    :max-size="5"
    tip-text="支持jpg、png、gif等图片格式，单个文件不超过5MB"
    @preview="handlePreview"
  />
</template>

<script setup>
const handlePreview = (file) => {
  console.log('预览文件:', file.name)
}
</script>
```

### OSS签名URL集成
```vue
<template>
  <hl-file-upload
    action="/api/upload"
    :auto-fetch-oss-url="true"
    :oss-signature-api="getOssSignatureUrl"
    :multiple="true"
    accept="image/*"
    @oss-url-received="handleOssUrlReceived"
  />
</template>

<script setup>
const getOssSignatureUrl = async (fileUrl) => {
  try {
    const response = await fetch('/api/oss/signature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: fileUrl })
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error('获取OSS签名URL失败:', error)
    return { success: false, message: '获取签名URL失败' }
  }
}

const handleOssUrlReceived = ({ originalUrl, ossUrl, file }) => {
  console.log('文件:', file.name)
  console.log('原始URL:', originalUrl)
  console.log('OSS签名URL:', ossUrl)
}
</script>
```

### 自定义文件项模板
```vue
<template>
  <hl-file-upload
    action="/api/upload"
    list-type="picture"
    :multiple="true"
    accept="image/*"
  >
    <template #file="{ file }">
      <div class="custom-file-item">
        <img :src="file.ossUrl || file.url" :alt="file.name">
        <div class="file-info">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatFileSize(file.size) }}</span>
        </div>
      </div>
    </template>
  </hl-file-upload>
</template>

<script setup>
const formatFileSize = (bytes) => {
  if (!bytes) return ''
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}
</script>
```

## 注意事项

1. **文件大小限制**: 默认最大文件大小为10MB，可通过 `maxSize` 属性调整
2. **文件类型限制**: 通过 `accept` 属性限制文件类型，建议同时在前端和后端进行验证
3. **OSS签名URL**: 使用 `autoFetchOssUrl` 功能时，需要提供有效的 `ossSignatureApi` 函数
4. **文件回显**: 使用 `initialFiles` 进行文件回显时，确保文件对象包含必要的属性（name、url、status等）
5. **错误处理**: 组件会自动处理上传失败的情况，可通过 `removeOnError` 属性控制是否移除失败的文件
6. **浏览器兼容性**: 拖拽上传功能需要浏览器支持HTML5的拖拽API

## 样式定制

组件提供了丰富的样式定制选项，可以通过CSS变量或深度选择器进行样式调整：

```css
/* 自定义上传区域样式 */
:deep(.el-upload) {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/* 自定义文件列表项样式 */
:deep(.el-upload-list__item) {
  transition: all 0.3s;
}

/* 自定义操作按钮样式 */
:deep(.el-upload-list__item-actions span) {
  cursor: pointer;
  margin-left: 5px;
}
```


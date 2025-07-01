# hl-player-video 视频播放器组件

基于 H5 视频播放插件的 Vue 组件，支持多种视频格式播放，提供高性能的视频播放体验。

## 基础用法


## 普通模式

默认模式，适用于大多数视频播放场景。

```vue
<template>
  <hl-player-video 
    url="https://example.com/video.mp4"
    :mode="0"
  />
</template>
```

## 高级模式

适用于需要更高性能或特殊功能的场景。

```vue
<template>
  <hl-player-video 
    url="https://example.com/video.mp4"
    :mode="1"
  />
</template>
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| url | 视频播放地址 | string | — | `''` |
| mode | 播放模式 | number | `0` / `1` | `0` |

### mode 说明
- `0`: 普通模式 - 适用于标准视频播放
- `1`: 高级模式 - 适用于高性能播放场景

## 播放器配置

组件内部使用 H5 视频播放插件，支持以下配置：

### 基础配置
- **容器ID**: `videoFrame`
- **基础路径**: `../utils/js`
- **默认尺寸**: 456x300
- **最大分屏**: 4x4

### 样式配置
- **边框**: 透明
- **选中边框**: 透明

## 回调事件

播放器支持以下回调事件：

### 窗口选择回调
```javascript
windowEventSelect: function (index) {
  // 插件选中窗口回调
  console.log("选中的窗口索引:", index);
}
```

### 错误处理回调
```javascript
pluginErrorHandler: function (index, iErrorCode, oError) {
  // 插件错误回调
  console.log("错误信息:", index, iErrorCode, oError);
}
```

### 首帧显示回调
```javascript
firstFrameDisplay: function (index, iWidth, iHeight) {
  // 首帧显示回调
  console.log(`窗口${index}加载成功，分辨率:${iWidth}*${iHeight}`);
}
```

### 性能不足回调
```javascript
performanceLack: function () {
  // 性能不够回调
  console.log("性能不足");
}
```

## 使用示例

### 基础视频播放
```vue
<template>
  <div style="width: 600px; height: 400px;">
    <hl-player-video 
      url="https://example.com/sample.mp4"
      :mode="0"
    />
  </div>
</template>
```

### 高级模式播放
```vue
<template>
  <div style="width: 800px; height: 600px;">
    <hl-player-video 
      url="https://example.com/high-quality.mp4"
      :mode="1"
    />
  </div>
</template>
```

### 动态切换视频
```vue
<template>
  <div>
    <div style="width: 600px; height: 400px;">
      <hl-player-video 
        :url="currentVideoUrl"
        :mode="0"
      />
    </div>
    <div style="margin-top: 20px;">
      <el-button @click="switchVideo('video1')">播放视频1</el-button>
      <el-button @click="switchVideo('video2')">播放视频2</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentVideoUrl = ref('https://example.com/video1.mp4')

const switchVideo = (type) => {
  if (type === 'video1') {
    currentVideoUrl.value = 'https://example.com/video1.mp4'
  } else {
    currentVideoUrl.value = 'https://example.com/video2.mp4'
  }
}
</script>
```

## 注意事项

1. **URL 验证**: 组件会自动检查是否传递了有效的视频 URL，如果为空会显示错误提示
2. **容器尺寸**: 播放器会自动适应容器尺寸，建议为容器设置固定的宽高
3. **浏览器兼容性**: 需要浏览器支持 H5 视频播放功能
4. **插件依赖**: 组件依赖 `h5player.min.js` 插件，确保插件文件路径正确

## 错误处理

当视频播放出现错误时，组件会通过 `pluginErrorHandler` 回调提供详细的错误信息，包括：
- 错误窗口索引
- 错误代码
- 错误对象

建议在应用中实现相应的错误处理逻辑，提供用户友好的错误提示。

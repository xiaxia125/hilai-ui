# hl-player-video 视频播放器组件

基于 H5 视频播放插件的 Vue 组件，支持多种视频格式播放，提供高性能的视频播放体验。

注意：播放器组件依赖 H5 插件，请提前下载并引入。

[下载 h5player-js.zip 压缩包](/zip/h5player-js.zip)

## 安装
1. 将 `h5player-js.zip` 压缩包解压到项目的 `public` 目录下。

   ![H5Player 文件解压示例](/public/img/h5player_01.png)
2. 在 HTML 文件的 `<head>` 标签中引入 `h5player-js.min.js` 文件。

```javascript
<script src="./public/js/h5player.min.js"></script> // 依据项目路径按照实际情况引入 h5player-js.min.js
```

### 基础用法

:::demo
HlVideoPlayer/base
:::

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| url | 视频播放地址 | string | — | `''` |
| mode | 播放模式 | number | `0` / `1` | `0` |

### mode 说明
- `0`: 普通模式 - 适用于标准视频播放
- `1`: 高级模式 - 适用于高性能播放场景

### 回调事件

播放器支持以下回调事件：

#### 窗口选择回调
```javascript
windowEventSelect: function (index) {
  // 插件选中窗口回调
  console.log("选中的窗口索引:", index);
}
```

#### 错误处理回调
```javascript
pluginErrorHandler: function (index, iErrorCode, oError) {
  // 插件错误回调
  console.log("错误信息:", index, iErrorCode, oError);
}
```

#### 首帧显示回调
```javascript
firstFrameDisplay: function (index, iWidth, iHeight) {
  // 首帧显示回调
  console.log(`窗口${index}加载成功，分辨率:${iWidth}*${iHeight}`);
}
```

#### 性能不足回调
```javascript
performanceLack: function () {
  // 性能不够回调
  console.log("性能不足");
}
```

### 注意事项

1. **URL 验证**: 组件会自动检查是否传递了有效的视频 URL，如果为空会显示错误提示
2. **容器尺寸**: 播放器会自动适应容器尺寸，建议为容器设置固定的宽高
3. **浏览器兼容性**: 需要浏览器支持 H5 视频播放功能

### 错误处理

当视频播放出现错误时，组件会通过 `pluginErrorHandler` 回调提供详细的错误信息，包括：
- 错误窗口索引
- 错误代码
- 错误对象

建议在应用中实现相应的错误处理逻辑，提供用户友好的错误提示。


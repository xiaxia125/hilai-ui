<div align="center">

# 🎨 Hilai UI

**基于 Vue3 + Element Plus 的企业级业务组件库**

[![npm version](https://img.shields.io/npm/v/hilai-ui.svg)](https://www.npmjs.com/package/hilai-ui)
[![npm downloads](https://img.shields.io/npm/dm/hilai-ui.svg)](https://www.npmjs.com/package/hilai-ui)
[![Vue](https://img.shields.io/badge/Vue-3.4+-green.svg)](https://vuejs.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.9+-blue.svg)](https://element-plus.org/)


</div>

## ✨ 特性

- 🚀 **基于 Vue3 + Element Plus** - 现代化的技术栈，性能优异
- 📦 **开箱即用** - 高质量的业务组件，减少重复开发
- 🎨 **主题继承** - 完美继承 Element Plus 的主题系统
- 📱 **响应式设计** - 支持多端适配，移动端友好
- ⚡️ **高性能** - 基于 Vite 构建，支持 Tree Shaking
- 🔧 **TypeScript** - 完整的 TypeScript 支持
- 📖 **详细文档** - 完善的组件文档和使用示例

## 🎯 组件总览

| 组件 | 描述 | 状态 |
|------|------|------|
| `HlButton` | 增强版按钮组件 | ✅ |
| `HlCrossTableSelector` | 跨表格选择器 | ✅ |
| `HlFileUpload` | 文件上传组件 | ✅ |

## 📦 安装

```bash
# 使用 npm
npm install hilai-ui

# 使用 yarn
yarn add hilai-ui

# 使用 pnpm
pnpm add hilai-ui
```

## 🚀 快速开始

### 完整引入

```javascript
import { createApp } from 'vue'
import HilaiUI from 'hilai-ui'
import 'hilai-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(HilaiUI)
app.mount('#app')
```

### 按需引入

```javascript
// 引入单个组件
import { HlButton, HlFileUpload } from 'hilai-ui'

// 引入样式
import 'hilai-ui/style.css'
```

### 在组件中使用

```vue
<template>
  <div>
    <hl-button type="primary" @click="handleClick">
      点击我
    </hl-button>
    
    <hl-file-upload
      v-model:file-list="fileList"
      :action="uploadUrl"
      @success="handleUploadSuccess"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HlButton, HlFileUpload } from 'hilai-ui'

const fileList = ref([])
const uploadUrl = 'https://your-api.com/upload'

const handleClick = () => {
  console.log('按钮被点击了！')
}

const handleUploadSuccess = (response) => {
  console.log('文件上传成功：', response)
}
</script>
```

## 🛠️ 开发环境

```bash
# 克隆项目
git clone https://github.com/hilai/hilai-ui.git

# 进入项目目录
cd hilai-ui

# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev

# 构建组件库
pnpm lib

# 构建文档
pnpm docs:build
```
<!-- 
## 📚 文档

- [组件文档](https://hilai-ui.com) - 详细的组件使用说明
- [在线演示](https://hilai-ui.com/examples) - 组件在线演示
- [更新日志](https://github.com/hilai/hilai-ui/releases) - 版本更新记录 -->

## 🤝 贡献指南

我们欢迎所有形式的贡献，包括但不限于：

- 🐛 Bug 报告
- 💡 新功能建议
- 📝 文档改进
- 🔧 代码贡献

### 贡献步骤

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - 基于 Vue 3 的组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

## 📞 联系我们

- 💬 讨论：[GitHub Issues](https://github.com/xiaxia125/hilai-ui/issues)

---

<div align="center">

**如果这个项目对你有帮助，请给我们一个 ⭐️ Star！**

Made with ❤️ by [Hilai Team](https://github.com/xiaxia125)

</div>
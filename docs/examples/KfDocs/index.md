# 开发文档

## 组件开发文件结构

```
├─ packages
   ├─ name//组件名称
   │  ├─ src
   │  │  └─ index.vue//组件入口文件
   │  └─ index.ts//组件导出
   └─ components.d.ts//组件类型文件
   └─ index.ts//组件的全局注册
```

## 组件开发流程

### 创建组件入口文件

### 创建组件导出文件

这里以treeselect组件为例：

```typescript
import TreeSelect from "./src/index.vue";
import { withInstall } from "../withInstall";

const HlTreeSelect = withInstall(TreeSelect);
export default HlTreeSelect;
```

### 组件类型文件添加

```typescript
import HlTreeSelect from "./treeselect/src/index.vue"

declare module "vue" {
        export interface GlobalComponents {
            HlTreeSelect: typeof HlTreeSelect
        }
}
```

### 组件全局注册文件添加

```typescript
import { debounce, throttle, formatNumber } from "./utils"
import type { Component, App } from "vue"

import HlTreeSelect from "./treeselect"//这里填写组件名称
 // 存储组件列表
const components: {
    [propName: string]: Component
} = {

HlTreeSelect,//这里填写组件名称
}
// 插件声明：声明所有插件
// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册
const installComponents: any = (app: App) => {

for (const key in components) {
   app.component(key, components[key])
}
}
// vue插件
// - install：每个插件都有一个 install 方法
// - 参数：是通过 Vue.createApp() 创建的 app 实例
const install: any = (app: App) => {
installComponents(app)
}
// @ts-ignore
if (typeof window !== "undefined" && window.Vue) {
// @ts-ignore
window.Vue.use(install)
}

// 按需引入
export {

HlTreeSelect,//这里填写组件名称
}
/**
* @description 公共方法
*/
export { throttle, debounce, formatNumber }

export default {
 // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
install
}
```

## 组件文档开发文件结构

```
├─ docs
    ├─ .vitepress
    │  └─ config.ts//配置文件
    └─ components
    │  └─ name//组件名称
    │     └─base.md//组件组合文档
    └─ examples
       └─ name//组件名称
          └─ base.vue//组件模块文档
          └─ base.vue//组件模块文档
          └─ base.vue//组件模块文档
```

## 组件文档开发流程

### 创建组件模块文档

注意：一个文件对应一个右边的选择侧边栏

### 创建组件组合文档

将所有模块文档组合在这里

### 在文档配置文件添加

在.vitepress/config.ts文件中添加：

```typescript
sidebar: {
  "/components": [
    {
      text: "常用组件",
      items: [
        { text: "组件名称", link: "/components/组件名称/base.md" },
      ]
    },
   
  ]
}
```
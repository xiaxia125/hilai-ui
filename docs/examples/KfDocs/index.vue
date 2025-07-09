<template>
    <div>
        <h1>开发文档</h1>
    </div>
    <div class="file-tree">
        <h2>组件开发文件结构</h2>
        <pre>
├─ packages
   ├─ name//组件名称
   │  ├─ src
   │  │  └─ index.vue//组件入口文件
   │  └─ index.ts//组件导出
   └─ components.d.ts//组件类型文件
   └─ index.ts//组件的全局注册
</pre>
    </div>
    <div>
        <h2>组件开发流程</h2>
        <h3>1. 创建组件入口文件</h3>
        <h3>2. 创建组件导出文件</h3>
        <div>这里以treeselect组件为例</div>
        <div class="code-box">
            <pre ref="codeBlock1" class="highlighted-code">

    import TreeSelect from "./src/index.vue";
    import { withInstall } from "../withInstall";

    const HlTreeSelect = withInstall(TreeSelect);
    export default HlTreeSelect;
        </pre>
        </div>

        <h3>3. 组件类型文件添加</h3>
        <div class="code-box">
            <pre ref="codeBlock2" class="highlighted-code">

    import HlTreeSelect from "./treeselect/src/index.vue"

    declare module "vue" {
            export interface GlobalComponents {
                HlTreeSelect: typeof HlTreeSelect
            }
    }
    </pre>
        </div>
        <h3>4. 组件全局注册文件添加</h3>
        <div class="code-box">
            <pre ref="codeBlock3" class="highlighted-code">

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

    </pre>
        </div>
    </div>
    <div class="file-tree">
        <h2>组件文档开发文件结构</h2>
        <pre>
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
</pre>
    </div>
    <div>
        <h2>组件文档开发流程</h2>
        <h3>1. 创建组件模块文档</h3>
        <div>注意：一个文件对应一个右边的选择侧边栏</div>
        <h3>2. 创建组件组合文档</h3>
        <div>将所以模块文档组合在这里</div>
        <h3>在文档配置文件添加</h3>
        <div>在.vitepress/config.ts文件中添加</div>
        <div class="code-box">
            <pre ref="codeBlock4" class="highlighted-code">
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
            </pre>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
// import hljs from 'highlight.js'
// import 'highlight.js/styles/github.css' // 可以选择其他主题样式

const codeBlock1 = ref(null)
const codeBlock2 = ref(null)
const codeBlock3 = ref(null)
const codeBlock4 = ref(null)

onMounted(() => {
    // if (codeBlock1.value) {
    //     hljs.highlightElement(codeBlock1.value)
    // }
    // if (codeBlock2.value) {
    //     hljs.highlightElement(codeBlock2.value)
    // }
    // if (codeBlock3.value) {
    //     hljs.highlightElement(codeBlock3.value)
    // }
    // if (codeBlock4.value) {
    //     hljs.highlightElement(codeBlock4.value)
    // }


})
</script>

<style>
.code-box {
    background: #f5f5f5;
    border-radius: 4px;
    padding: 6px;
    margin: 6px 0;
}

.highlighted-code {
    margin: 0;
    white-space: pre-wrap;
}
</style>
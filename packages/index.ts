import { debounce, throttle, formatNumber } from "./utils"
import type { Component, App } from "vue"

import HlButton from "./button"
import HlCrossTableSelector from "./CrossTableSelector"
import HlFileUpload from "./FileUpload"
import HlVideoPlayer from "./VideoPlayer"
import HlPagination from "./Pagination"
// 存储组件列表
const components: {
  [propName: string]: Component
} = {
  HlButton,
  HlCrossTableSelector,
  HlFileUpload,
  HlVideoPlayer,
  HlPagination
}
// 插件声明：声明所有插件
// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册
const installComponents: any = (app: App) => {
  //   app.use(ElementPlus, {
  //     locale // 语言设置
  //   // size: Cookies.get('size') || 'medium' // 设置默认尺寸
  // })
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

const HilaiUI = {
  install
}

// 按需引入
export {
  HlCrossTableSelector,
  HlButton,
  HlFileUpload,
  HlVideoPlayer,
  HlPagination
}
/**
 * @description 公共方法
 */
export { throttle, debounce, formatNumber }

export default HilaiUI

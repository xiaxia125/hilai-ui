import DefaultTheme from "vitepress/theme"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import locale from "element-plus/es/locale/lang/zh-cn"
// 图标并进行全局注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import HlHtml from "../components/HlHtml.vue"
import HlIcon from "../components/HlIcon.vue"
import HlTip from "../components/HlTip.vue"
import { VPDemo } from "../vitepress"
// 基于element-plus二次封装基础组件
import Hlui from "../../../packages"
import "../../public/css/index.css"

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    // 全局注册基础组件
    ctx.app.use(Hlui)

    ctx.app.component("Demo", VPDemo)
    ctx.app.component("HlHtml", HlHtml)
    ctx.app.component("HlIcon", HlIcon)
    ctx.app.component("HlTip", HlTip)
  }
}

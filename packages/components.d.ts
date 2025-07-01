import HlButton from "./button/src/index.vue"
import HlCrossTableSelector from "./CrossTableSelector/src/index.vue"
import HlFileUpload from "./FileUpload/src/index.vue" 
declare module "vue" {
  export interface GlobalComponents {
    HlButton: typeof HlButton // HlButton 组件
    HlCrossTableSelector: typeof HlCrossTableSelector // HlCrossTableSelector 组件
    HlFileUpload: typeof HlFileUpload // HlFileUpload 组件
  }
}

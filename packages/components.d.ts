import HlButton from "./button/src/index.vue"
import HlCrossTableSelector from "./CrossTableSelector/src/index.vue"
import HlFileUpload from "./FileUpload/src/index.vue" 
import HlVideoPlayer from "./VideoPlayer/src/index.vue"
import HlPagination from "./Pagination/src/index.vue"

declare module "vue" {
  export interface GlobalComponents {
    HlButton: typeof HlButton // HlButton 组件
    HlCrossTableSelector: typeof HlCrossTableSelector // HlCrossTableSelector 组件
    HlFileUpload: typeof HlFileUpload // HlFileUpload 组件
    HlVideoPlayer: typeof HlVideoPlayer // HlVideoPlayer 组件
    HlPagination: typeof HlPagination // HlVideoPlayer 组件
  }
}

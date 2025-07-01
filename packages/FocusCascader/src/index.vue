<template>
  <el-cascader
    ref="cascaderRef"
    v-bind="$attrs"
    :props="mergedProps"
    @change="handleChange"
    @visible-change="handleVisibleChange"
    @expand-change="handleExpandChange"
    @focus="handleFocus"
  >
    <template v-for="(_, slot) in $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </el-cascader>
</template>

<script setup lang="ts">
import { ElCascader } from "element-plus"
import type { CascaderProps, CascaderNode, CascaderValue, CascaderInstance } from "element-plus"

interface FocusAwareCascaderProps extends /* @vue-ignore */ Partial<CascaderProps> {
  scrollRestore?: boolean
}

const props = withDefaults(defineProps<FocusAwareCascaderProps>(), {
  scrollRestore: true
})

const emit = defineEmits<{
  (e: "change", value: CascaderValue, nodes?: CascaderNode[]): void
  (e: "visible-change", visible: boolean): void
  (e: "expand-change", activePath: string[]): void
  (e: "focus", event: Event): void
}>()

const cascaderRef = ref<CascaderInstance>()
const scrollPosition = ref(0)
const cascaderRefEL = ref<any>(null)
const isVisible = ref(false)
const activePath = ref<string[]>([])
const isInitialized = ref(false)

// 合并props
const mergedProps = computed(() => ({
  expandTrigger: "hover" as const,
  checkStrictly: false,
  emitPath: true,
  ...props.props
}))

/**
 * @description: 初始化监听级联选择面板一级菜单滚动
 * @return {void}
 */
const initCascader = () => {
  if (!cascaderRef.value || isInitialized.value) return

  // 获取级联面板的滚动容器
  cascaderRefEL.value =
    cascaderRef.value.cascaderPanelRef?.$el?.children[0].querySelector(".el-scrollbar__wrap")
  console.log(cascaderRefEL.value)
  if (cascaderRefEL.value) {
    // 先移除旧的监听器避免重复添加
    cascaderRefEL.value.removeEventListener("scroll", handleScroll)

    // 恢复之前的滚动位置
    if (scrollPosition.value !== 0) {
      cascaderRefEL.value.scrollTop = scrollPosition.value
    }

    // 添加新的滚动监听
    cascaderRefEL.value.addEventListener("scroll", handleScroll)
    isInitialized.value = true
  }
}

/**
 * @description: 处理滚动事件
 * @param {Event} event
 * @return {void}
 */
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  scrollPosition.value = target.scrollTop
}

/**
 * @description: 清除滚动监听
 * @return {void}
 */
const clearCascaderListeners = () => {
  if (cascaderRefEL.value) {
    cascaderRefEL.value.removeEventListener("scroll", handleScroll)
    cascaderRefEL.value = null
  }
  isInitialized.value = false
}

// 处理focus事件
const handleFocus = (event: Event) => {
  if (props.scrollRestore) {
    // 双重nextTick确保DOM完全渲染
    nextTick(() => {
      nextTick(() => {
        initCascader()
      })
    })
  }
  emit("focus", event)
}

// 处理visible-change
const handleVisibleChange = (visible: boolean) => {
  isVisible.value = visible
  if (visible) {
    nextTick(() => {
      initCascader()
    })
  } else {
    clearCascaderListeners()
  }
  emit("visible-change", visible)
}

// 处理expand-change
const handleExpandChange = (path: string[]) => {
  activePath.value = path
  if (props.scrollRestore && isVisible.value) {
    requestAnimationFrame(() => {
      initCascader()
    })
  }
  emit("expand-change", path)
}

// 处理change
const handleChange = (value: CascaderValue, nodes?: CascaderNode[]) => {
  emit("change", value, nodes)
}

// 组件卸载时清理
onBeforeUnmount(() => {
  clearCascaderListeners()
})

// 暴露方法
defineExpose({
  getCheckedNodes: () => cascaderRef.value?.getCheckedNodes(),
  getCascaderRef: () => cascaderRef.value,
  refreshScroll: initCascader
})
</script>

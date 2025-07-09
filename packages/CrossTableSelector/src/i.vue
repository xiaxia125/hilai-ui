<template>
  <div class="w-full">
    <el-table v-bind="attrs" :data="props.data" @select="handleSelectChange" @select-all="handleSelectChange"
      ref="tableRef">
      <template #empty>
        <slot name="empty"></slot>
      </template>
      <template #append>
        <slot name="append"></slot>
      </template>
      <template v-if="slots.default">
        <slot name="default"></slot>
      </template>  
      <template v-else>
        <el-table-column v-if="showSelection" type="selection" width="55" align="center" />
        <template v-for="(column, index) in columns" :key="index">
          <el-table-column v-bind="column">
          </el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'HlCrossTableSelector'
})
import { isEqual } from 'lodash-es'
import { ref, watch, nextTick, useAttrs, useSlots } from 'vue'
import { TableProps } from 'element-plus'
const attrs = useAttrs(); // 获取所有属性
const slots = useSlots(); // 获取所有插槽

interface TableColumn {
  prop?: string;
  label?: string;
  slot?: string;
  [key: string]: any;
}

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  showSelection: {
    type: Boolean,
    default: true
  },
  columns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits([
  'select',        // 添加select事件
  'select-all'     // 添加select-all事件
])

const selected = defineModel()

const tableRef = ref()

const handleSelectChange = (selection, ...args) => {
  const otherPagesSelected = props.modelValue.filter(item => {
    return !props.data.some(currentItem => isEqual(currentItem, item))
  })
  selected.value = [...otherPagesSelected, ...selection]
  // 转发select事件
  emit('select', selection, ...args)
}

watch(() => props.data, (newVal) => {
  nextTick(() => {
    if (!tableRef.value || !props.modelValue?.length) return
    tableRef.value.clearSelection()
    props.modelValue.forEach(selectedRow => {
      const foundRow = props.data.find(row => isEqual(selectedRow, row))
      if (foundRow) {
        tableRef.value?.toggleRowSelection(foundRow, true)
      }
    })
  })
}, { deep: true, immediate: true })

</script>

<style scoped>
.basic-table {
  width: 100%;
}

.pagination-container {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
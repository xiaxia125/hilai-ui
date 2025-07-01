# HlCrossTableSelector 跨页多选表格组件

基于 Element Plus 的 `el-table` 二次封装，支持跨页勾选数据，解决分页后勾选数据丢失的问题。组件会自动记录用户勾选的数据，即使切换页码后依然保持勾选状态，方便用户进行批量操作。

## 基础用法

最简单的跨页多选表格。

:::demo
HlCrossTableSelector/base
:::

## 使用 columns 配置

通过 `columns` 属性配置表格列，更加简洁。

:::demo
HlCrossTableSelector/columns
:::

## 自定义列模板

支持通过插槽自定义列内容。

:::demo
HlCrossTableSelector/slots
:::

## 禁用选择功能

通过 `show-selection` 属性控制是否显示选择框。

:::demo
HlCrossTableSelector/disable-selection
:::

## 属性

除继承 `el-table` 的所有属性外，新增以下属性：

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 多选返回值，选中的行数据数组 | Array | [] |
| show-selection | 是否开启勾选功能 | Boolean | true |
| columns | 表格列配置，继承 Table-column 属性 | Array | [] |
| selection-key | 用于标识行的唯一键，默认为 'id' | String | 'id' |
| keep-selection | 是否保持跨页选择状态 | Boolean | true |

## 事件

继承 `el-table` 的所有事件，并新增以下事件：

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 当选择项发生变化时会触发该事件 | (selection, row) |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | (selection) |
| selection-change | 当选择项发生变化时会触发该事件 | (selection) |

## 插槽

继承 `el-table` 的所有插槽，主要包括：

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| empty | 空数据时的自定义内容 | — |
| append | 插入至表格最后一行之后的内容 | — |
| default | 自定义列的内容，会覆盖 columns 属性 | (row, column, $index) |

## 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| clearSelection | 清空选择项 | — |
| toggleRowSelection | 切换某一行的选中状态 | (row, selected) |
| toggleAllSelection | 切换全选状态 | — |
| getSelectionRows | 获取当前选中的行数据 | — |

## 完整示例

```vue
<template>
  <div>
    <hl-cross-table-selector
      v-model="selectedRows"
      :data="tableData"
      :columns="columns"
      :show-selection="true"
      selection-key="id"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <template #action="{ row }">
        <el-button size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </hl-cross-table-selector>
    
    <div style="margin-top: 20px;">
      <p>已选择 {{ selectedRows.length }} 项</p>
      <el-button type="primary" @click="handleBatchOperation">批量操作</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HlCrossTableSelector } from 'hilai-ui'

const selectedRows = ref([])

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'email', label: '邮箱' },
  { prop: 'phone', label: '电话', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'action', label: '操作', width: 150, slot: 'action' }
]

const tableData = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', phone: '13800138001', status: '正常' },
  { id: 2, name: '李四', email: 'lisi@example.com', phone: '13800138002', status: '正常' },
  { id: 3, name: '王五', email: 'wangwu@example.com', phone: '13800138003', status: '禁用' }
])

function handleSelect(selection, row) {
  console.log('选择变化:', selection, row)
}

function handleSelectAll(selection) {
  console.log('全选变化:', selection)
}

function handleEdit(row) {
  console.log('编辑:', row)
}

function handleDelete(row) {
  console.log('删除:', row)
}

function handleBatchOperation() {
  console.log('批量操作:', selectedRows.value)
}
</script>
```

## 注意事项

1. **唯一标识**：确保每行数据都有唯一的标识字段（默认为 'id'），用于跨页选择状态管理。

2. **性能优化**：当数据量很大时，建议使用虚拟滚动或分页加载来优化性能。

3. **内存管理**：组件会自动管理选择状态，但在组件销毁时会清理内存。

4. **数据格式**：确保传入的数据格式符合 Element Plus Table 的要求。

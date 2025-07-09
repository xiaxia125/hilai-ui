# hl-cross-table-selector 跨页多选表格

跨页多选表格组件，基于 Element Plus 的 `el-table` 封装。主要解决分页场景下的数据选择状态保持问题，支持列拖拽排序、显示/隐藏等配置功能。


## 功能特性

- ✨ 跨页数据选择状态保持
- 🔄 列拖拽排序
- 👁️ 列显示/隐藏配置
- 🔍 支持列搜索
- ⚡️ 列排序
- 📱 响应式布局

## 基础用法

:::demo 使用 `v-model` 进行数据双向绑定，通过 `columns` 配置表格列。支持跨页选择、列排序、搜索等功能。
HlCrossTableSelector/base
:::

## 使用场景

### 1. 批量操作

适用于需要跨页选择数据进行批量操作的场景，如：
- 批量审核
- 批量删除
- 批量状态更新
- 批量导出

### 2. 列表配置

支持个性化列表显示：
- 自定义列显示/隐藏
- 拖拽调整列顺序

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 选中的行数据数组 | `array` | `[]` |
| columns | 表格列配置，继承 el-table-column 的属性 | `array` | `[]` |
| data | 表格数据 | `array` | `[]` |
| showSelection | 是否显示选择列 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| settingBtnText | 列设置按钮文本 | `string` | `'列表配置'` |

### Column 配置项

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| prop | 对应列内容的字段名 | `string` | - |
| label | 显示的标题 | `string` | - |
| slot | 自定义列插槽名称 | `string` | - |
| sortable | 是否可排序 | `boolean` | `false` |
| searchable | 是否可搜索 | `boolean` | `false` |
| isChecked | 是否显示该列 | `boolean` | `true` |
| width | 列宽度 | `string/number` | - |
| minWidth | 最小列宽度 | `string/number` | - |
| fixed | 列是否固定 | `string/boolean` | - |
| columnProps | 透传给 el-table-column 的属性 | `object` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选中数据变化时触发 | `(selection: array)` |
| select | 手动勾选数据行时触发 | `(selection: array, row: object)` |
| select-all | 手动勾选全选时触发 | `(selection: array)` |
| pagination-change | 分页变化时触发 | `(page: number)` |
| sort-change | 排序变化时触发 | `({ prop: string, order: string })` |
| search | 搜索条件变化时触发 | `(params: object)` |
| columns-change | 列配置变化时触发 | `(columns: array)` |

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| headSearch | 表格顶部搜索区域 | - |
| [column.slot] | 自定义列内容 | `{ row, column, $index }` |

## 注意事项

1. **列配置持久化**：列的显示/隐藏、排序等配置会触发 `columns-change` 事件，可以在此事件中进行配置的持久化处理。

2. **跨页选择**：组件会自动维护跨页选择的状态，切换分页时不会丢失已选择的数据。建议在以下场景使用：
   - 大数据量分页展示
   - 需要记住用户选择的数据
   - 批量操作频繁的场景

3. **自定义列**：通过 `slot` 配置可以自定义列的渲染内容，slot 名称需要与 column 配置中的 `slot` 属性对应。常见用法：
   - 状态标签展示
   - 图片/文件预览
   - 操作按钮组
   - 自定义格式化

4. **搜索功能**：可以通过 `headSearch` 插槽自定义搜索区域，搜索条件变化时会触发 `search` 事件。支持：
   - 单字段搜索
   - 多条件组合搜索
   - 自定义搜索组件
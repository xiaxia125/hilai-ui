# hl-pagination 分页组件

基于 Element Plus 的 `el-pagination` 二次封装，支持自动滚动、响应式布局等功能，使用 v-model 进行数据双向绑定。

## 基础用法

使用 `v-model:page` 和 `v-model:limit` 进行页码和每页条数的双向绑定，通过 `total` 属性设置总条目数。

:::demo 
HlPagination/base
:::

## 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|---------|
| page | 当前页码 | number | - | 1 |
| limit | 每页显示条目个数 | number | - | 10 |
| total | 总条目数 | number | - | - |
| pageSizes | 每页显示个数选择器的选项设置 | number[] | - | [10, 20, 30, 50] |
| layout | 组件布局，子组件名用逗号分隔 | string | `sizes` `prev` `pager` `next` `jumper` `total` | 'total, sizes, prev, pager, next, jumper' |
| pagerCount | 页码按钮的数量，当总页数超过该值时会折叠 | number | 大于等于 5 且小于等于 21 的奇数 | 移动端：5，桌面端：7 |
| autoScroll | 页码切换后是否自动滚动到顶部 | boolean | - | true |
| hidden | 是否隐藏分页组件 | boolean | - | false |
| background | 是否为分页按钮添加背景色 | boolean | - | false |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| pagination | 当前页码或每页条数改变时触发 | `{ page: number, limit: number }` |
| update:page | 当前页码改变时触发 | 新的页码值 |
| update:limit | 每页条数改变时触发 | 新的每页条数值 |

## 插槽

组件支持所有 Element Plus Pagination 组件的插槽。

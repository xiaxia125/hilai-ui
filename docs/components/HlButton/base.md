# hl-button 按钮组件

基于 Element Plus 的 `el-button` 二次封装，支持节流和防抖功能，防止按钮被频繁点击。

## 基础用法

:::demo 
HlButton/base
:::

## 节流模式

防止按钮被频繁点击，在指定时间间隔内只执行一次点击事件。

```vue
<template>
  <hl-button mode="throttle" :time="1000" @click="handleClick">
    节流按钮（1秒内只能点击一次）
  </hl-button>
</template>
```

## 防抖模式

在用户停止点击后延迟执行，适合需要等待用户操作完成的场景。

```vue
<template>
  <hl-button mode="debounce" :time="500" @click="handleClick">
    防抖按钮（停止点击500ms后执行）
  </hl-button>
</template>
```

## 自定义事件名

可以通过 `event-name` 属性自定义触发的事件名。

```vue
<template>
  <hl-button event-name="submit" @submit="handleSubmit">
    提交按钮
  </hl-button>
</template>
```

## 属性

除继承 `el-button` 的所有属性外，新增以下属性：

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| mode | 点击模式 | string | `throttle` / `debounce` / `none` | `none` |
| time | 节流/防抖时间间隔（毫秒） | number | — | `500` |
| eventName | 触发的事件名 | string | — | `click` |
| leading | 节流/防抖是否在开始时立即执行 | boolean | — | `false` |
| trailing | 节流/防抖是否在结束时执行 | boolean | — | `true` |
| immediate | 防抖是否立即执行（仅防抖模式有效） | boolean | — | `false` |

## 事件

| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| click | 点击按钮时触发 | `(event: MouseEvent)` |
| [eventName] | 自定义事件名触发 | `(event: MouseEvent)` |

## 插槽

| 插槽名 | 说明 |
| :--- | :--- |
| default | 按钮内容 |

## 使用示例

### 基础节流按钮
```vue
<hl-button mode="throttle" :time="1000" type="primary" @click="handleSubmit">
  提交表单
</hl-button>
```

### 防抖搜索按钮
```vue
<hl-button mode="debounce" :time="300" type="success" @click="handleSearch">
  搜索
</hl-button>
```

### 自定义事件名
```vue
<hl-button 
  mode="throttle" 
  :time="500" 
  event-name="customClick" 
  @customClick="handleCustomClick"
  type="warning"
>
  自定义事件
</hl-button>
```

### 节流参数配置
```vue
<hl-button 
  mode="throttle" 
  :time="1000" 
  :leading="true" 
  :trailing="false"
  @click="handleClick"
>
  立即执行节流
</hl-button>
```


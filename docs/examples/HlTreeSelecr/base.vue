<template>
    <hl-tree-select v-model="selectedValue" :options="treeData" placeholder="请选择" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import HlTreeSelect from '@/packages/tree-select'

const selectedValue = ref('')
const treeData = [
  {
    id: '1',
    label: '一级节点 1',
    children: [
      {
        id: '1-1',
        label: '二级节点 1-1'
      },
      {
        id: '1-2',
        label: '二级节点 1-2'
      }
    ]
  },
  {
    id: '2',
    label: '一级节点 2',
    children: [
      {
        id: '2-1',
        label: '二级节点 2-1'
      }
    ]
  }
]
</script>
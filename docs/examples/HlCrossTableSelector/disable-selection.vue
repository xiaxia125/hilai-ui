<template>
  <div>
    <hl-cross-table-selector
      v-model="selectedRows"
      :data="tableData"
      :show-selection="false"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="department" label="部门" width="120" />
      <el-table-column prop="position" label="职位" width="120" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="handleView(row)">查看</el-button>
          <el-button size="small" type="success" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </hl-cross-table-selector>
    
    <div style="margin-top: 20px;">
      <p>此表格已禁用选择功能，仅用于数据展示和操作</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedRows = ref([])

const tableData = ref([
  { 
    id: 1, 
    name: '张三', 
    email: 'zhangsan@example.com', 
    phone: '13800138001', 
    department: '技术部',
    position: '前端工程师'
  },
  { 
    id: 2, 
    name: '李四', 
    email: 'lisi@example.com', 
    phone: '13800138002', 
    department: '产品部',
    position: '产品经理'
  },
  { 
    id: 3, 
    name: '王五', 
    email: 'wangwu@example.com', 
    phone: '13800138003', 
    department: '设计部',
    position: 'UI设计师'
  }
])

function handleView(row) {
  console.log('查看:', row)
}

function handleEdit(row) {
  console.log('编辑:', row)
}

function handleDelete(row) {
  console.log('删除:', row)
}
</script> 
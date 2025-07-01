<template>
  <div>
    <hl-cross-table-selector
      v-model="selectedRows"
      :data="tableData"
      @select="handleSelect"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="avatar" label="头像" width="80">
        <template #default="{ row }">
          <el-avatar :src="row.avatar" :size="40">
            {{ row.name.charAt(0) }}
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === '正常' ? 'success' : 'danger'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </hl-cross-table-selector>
    
    <div style="margin-top: 20px;">
      <p>已选择 {{ selectedRows.length }} 项</p>
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
    status: '正常',
    avatar: 'https://picsum.photos/40/40?random=1'
  },
  { 
    id: 2, 
    name: '李四', 
    email: 'lisi@example.com', 
    phone: '13800138002', 
    status: '正常',
    avatar: 'https://picsum.photos/40/40?random=2'
  },
  { 
    id: 3, 
    name: '王五', 
    email: 'wangwu@example.com', 
    phone: '13800138003', 
    status: '禁用',
    avatar: 'https://picsum.photos/40/40?random=3'
  }
])

function handleSelect(selection, row) {
  console.log('选择变化:', selection, row)
}

function handleEdit(row) {
  console.log('编辑:', row)
}

function handleDelete(row) {
  console.log('删除:', row)
}
</script> 
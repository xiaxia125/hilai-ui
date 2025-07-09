<template>
  <hl-cross-table-selector
    :showSelection="true"
    :columns="columns"
    :data="tableData"
    v-model="selectedData"
    @pagination-change="currentChange"
    @sort-change="handleSortChange"
    @search="handleSearch"
  >
    <template #name="{ row }">
      <el-tag size="small">{{ row.name }}</el-tag>
    </template>
  </hl-cross-table-selector>
  <div class="mt-4">
    <hl-pagination 
      v-model:page="page" 
      v-model:limit="limit" 
      :total="total" 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface TableItem {
  date: string
  name: string
  address: string
}

// 表格数据
const tableData = ref<TableItem[]>([
  {
    date: '2016-05-03',
    name: 'Tom1',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom2',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom3',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom4',
    address: 'No. 189, Grove St, Los Angeles',
  },
])

// 分页相关
const page = ref(1)
const limit = ref(10)
const total = ref(20)

// 表格列定义
const columns = ref([
  { prop: 'date', label: '日期', sortable: true },
  { prop: 'name', label: '姓名', slot: 'name', searchable: true }, 
  { prop: 'address', label: '地址', searchable: true }
])

// 选中数据
const selectedData = ref<TableItem[]>([])

// 监听选中数据变化
watch(selectedData, (newVal) => {
  console.log('selectedData', newVal)
})

// 处理分页变化
const handleCurrentChange = (val: number) => {
  page.value = val
  loadTableData()
}

const handleSizeChange = (val: number) => {
  limit.value = val
  page.value = 1
  loadTableData()
}

// 处理排序变化
const handleSortChange = ({ prop, order }: { prop: string, order: string }) => {
  console.log('Sort changed:', prop, order)
  loadTableData()
}

// 处理搜索
const handleSearch = (searchParams: Record<string, any>) => {
  console.log('Search params:', searchParams)
  page.value = 1
  loadTableData()
}

// 模拟加载表格数据
const loadTableData = () => {
  // 模拟API调用
  const mockData = {
    1: [
      {
        date: '2016-05-03',
        name: 'Tom1',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom2',
        address: 'No. 189, Grove St, Los Angeles',
      }
    ],
    2: [
      {
        date: '2016-05-03',
        name: 'Tom3',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-03',
        name: 'Tom4',
        address: 'No. 189, Grove St, Los Angeles',
      }
    ]
  }
  tableData.value = mockData[page.value] || []
}

// 初始化加载数据
loadTableData()
</script>

<style scoped>
:deep(.el-pager li) {
  margin-top: 0;
}

:deep(.el-table table) {
  margin: 0;
}

.doc-table table {
  width: 100%;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
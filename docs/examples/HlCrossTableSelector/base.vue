<template>
  <hl-cross-table-selector :data="tableData" v-model="selectedData">
    <el-table-column type="selection" />
    <el-table-column prop="date" label="Date" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="address" label="Address" />
  </hl-cross-table-selector>
  <el-pagination @current-change="currentChange" layout="prev, pager, next" :total="20" />
</template>

<script setup lang="ts">
import { ref,watch } from 'vue'

const tableData = ref([
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
])

let selectedData = ref([])
//监听选中数据
watch(selectedData, (newVal) => {
  console.log('selectedData', newVal)
})
//模拟分页切换数据
const currentChange = (val) => {
  if(val === 1){
    tableData.value = [
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
    ]
  }else{
    tableData.value = [
      {
        date: '2016-05-03',
        name: 'Tom3',
        address: 'No. 189, Grove St, Los Angeles',
      },{
        date: '2016-05-03',
        name: 'Tom4',
        address: 'No. 189, Grove St, Los Angeles',
      }
    ]
  }
}
</script>

<style scoped>
:deep(.el-pager li) {
  margin-top: 0;
}
:deep(.el-table table) {
  margin: 0;
}
.doc-table table{
  width: 100%;
}
</style>
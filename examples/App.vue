<template>
  <div class="w-1/2 m-auto">
    <select-table :data="data" border v-model="value" :columns="columns">
      
    </select-table>
    <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="20" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch,h } from 'vue'
import SelectTable from '../packages/select-table/index.vue'
import HlButton from '../packages/button/index.vue'
const value = ref([{
    date: '2016-05-03',
    name: '11',
    address: 'No. 189, Grove St, Los Angeles',
  },
        {
          date: '2016-05-03',
          name: '66',
          address: 'No. 189, Grove St, Los Angeles',
        }])

const data = ref([
  {
    date: '2016-05-03',
    name: '11',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: '22',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: '33',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: '44',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: '55',
    address: 'No. 189, Grove St, Los Angeles',
  }
])
  
  const handleCurrentChange = (page) => {
    if(page === 2){
      data.value = [
        {
          date: '2016-05-03',
          name: '66',
          address: 'No. 189, Grove St, Los Angeles',
        },{
          date: '2016-05-03',
          name: '77',
          address: 'No. 189, Grove St, Los Angeles',
        },{
          date: '2016-05-03',
          name: '88',
          address: 'No. 189, Grove St, Los Angeles',
        },{
          date: '2016-05-03',
          name: '99',
          address: 'No. 189, Grove St, Los Angeles',
        }
      ]
    }else{
      data.value = [
          {
            date: '2016-05-03',
            name: '11',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-02',
            name: '22',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-04',
            name: '33',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-01',
            name: '44',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-01',
            name: '55',
            address: 'No. 189, Grove St, Los Angeles',
          }
        ]
    }
  }
const columns = ref([
  { label: '日期', prop: 'date',formatter: (row) => h('p',{style:{color:'red'}}, row.name+'*****' ) },
  { label: '姓名', prop: 'name'},
  { label: '地址', prop: 'address'},
])
</script>


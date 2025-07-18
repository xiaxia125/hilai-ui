<template>
  <div :class="{ 'hidden': hidden }" class="pagination-container">
    <el-pagination
      v-bind="attrs"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template v-for="(_, slot) in slots" :key="slot">
        <slot :name="slot" />
      </template>
    </el-pagination>
  </div>
</template>

<script setup>
import { computed,useAttrs,useSlots, ref, onMounted } from 'vue'

const attrs = useAttrs();
const slots = useSlots();

const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50]
    }
  },
  // 移动端页码按钮的数量端默认值5
  pagerCount: {
    type: Number,
    default: 5
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits();
const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    emit('update:page', val)
  }
})
const pageSize = computed({
  get() {
    return props.limit
  },
  set(val){
    emit('update:limit', val)
  }
})
function handleSizeChange(val) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  emit('pagination', { page: currentPage.value, limit: val })
}
function handleCurrentChange(val) {
  emit('pagination', { page: val, limit: pageSize.value })
}

</script>

<style scoped>
.pagination-container {
  background: #fff;
}
.pagination-container.hidden {
  display: none;
}
</style>
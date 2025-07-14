<template>
  <div class="w-full">
    <!-- 顶部查询条件插槽 -->
    <div class="search-bar" :style="{'justify-content': slots.headSearch ? 'space-between' : 'right'}">
      <slot name="headSearch"></slot>
      <el-popover
        placement="bottom"
        :width="210"
        trigger="click"
        :teleported="false"
        popper-class="popover-custom"
      >
        <template #reference>
          <div class="setting-btn">
            <el-icon size="16" color="#0064FA"><Setting /></el-icon>
            <div class="setting-btn-text">{{ props.settingBtnText }}</div>
          </div>
        </template>
        <div class="popover-content">
          <div>
            <VueDraggable
              v-model="localColList"
              ref="el"
              @start="dragable = true"
              @end="onListChange"
              ghostClass="sortable-ghost"
            >
             <div class="draggable-item" v-for="(element, index) in localColList" :key="element.prop">
                <el-checkbox
                  v-model="element.isChecked"
                  :label="element.label"
                />
                <div class="draggable-icons">
                  <img
                    @click="goTop(element, index)"
                    class="icon-top"
                    src="../goTop.svg"
                  />
                  <img
                    class="icon-drag handle"
                    src="../drag.svg"
                  />
                </div>
              </div>
            </VueDraggable>
          </div>
        </div>
      </el-popover>
    </div>
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="props.data"
      v-bind="attrs"
      @select="handleSelectChange"
      @select-all="handleSelectChange"
      cell-class-name="line-clamp"
    >
      <el-table-column
        v-if="props.showSelection"
        type="selection"
        width="40"
      />
      <el-table-column
        v-for="item in visibleColumns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        v-bind="item.columnProps"
      >
        <!-- 只渲染自定义插槽 -->
        <template v-if="slots[item.slot]" #default="scope">
          <slot :name="item.slot" v-bind="scope" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { isEqual, cloneDeep } from "lodash-es";
import { VueDraggable } from 'vue-draggable-plus'
import { Setting } from "@element-plus/icons-vue";
import { useAttrs, useSlots, ref, computed, watch, nextTick, reactive } from "vue";
import { paginationEmits } from "element-plus";
import { ElMessage } from 'element-plus'

interface TableColumn {
  prop: string;
  label: string;
  isChecked?: boolean;
  order?: number;
  columnProps?: Record<string, any>;
  slot?: string;
  [key: string]: any;
}

const props = withDefaults(defineProps<{
  settingBtnText?: string;
  modelValue: any[];
  showSelection?: boolean;
  columns: TableColumn[];  // 必传
  data: any[];
  loading?: boolean;
}>(), {
  showSelection: false,
  settingBtnText: '列表配置'
})

const emit = defineEmits<{
  (e: "update:modelValue", val: any[]): void;
  (e: "select", selection: any[], ...args: any[]): void;
  (e: "select-all", selection: any[], ...args: any[]): void;
  (e: "columns-change", columns: TableColumn[]): void;
}>();
const attrs = useAttrs();
const slots = useSlots();
const tableRef = ref<any>();
const dragable = ref(false);

// 本地列配置，包含isChecked、顺序等
const localColList = ref<TableColumn[]>([]);

// 初始化本地列配置
watch(
  () => props.columns,
  (val: TableColumn[]) => {
    if (!val || val.length === 0) {
      ElMessage.error('CrossTableSelector 组件的 columns 属性是必传的，且不能为空数组')
      return
    }
    localColList.value = cloneDeep(val).map(
      (col: TableColumn, idx: number) => ({
        ...col,
        isChecked: col.isChecked !== false,
        order: col.order ?? idx,
      })
    );
  },
  { immediate: true }
);

// 可见列
const visibleColumns = computed<TableColumn[]>(() =>
  localColList.value
    .filter((col: TableColumn) => col.isChecked)
    .sort((a: TableColumn, b: TableColumn) => (a.order ?? 0) - (b.order ?? 0))
    .map(col => ({
      ...col,
      columnProps: {
        ...col.columnProps,
        sortable: col.sortable,
        searchable: col.searchable,
        width: col.width,
        minWidth: col.minWidth,
        fixed: col.fixed
      }
    }))
);

// 置顶
const goTop = (item: TableColumn, index: number) => {
  localColList.value.splice(index, 1);
  localColList.value.unshift(item);
  localColList.value.forEach((col: TableColumn, i: number) => (col.order = i));
};

// 配置变更
const onListChange = () => {
  localColList.value.forEach((col: TableColumn, i: number) => (col.order = i));
  emit("columns-change", cloneDeep(localColList.value));
};

// 跨页多选
const handleSelectChange = (selection: any[], ...args: any[]) => {
  const otherPagesSelected = props.modelValue.filter(
    (item: any) =>
      !props.data.some((currentItem: any) => isEqual(currentItem, item))
  );
  const newSelected = [...otherPagesSelected, ...selection];
  emit("update:modelValue", newSelected);
  emit("select", selection, ...args);
};

// 多页回显
watch(
  () => props.data,
  () => {
    nextTick(() => {
      if (!tableRef.value || !props.modelValue?.length) return;
      tableRef.value.clearSelection();
      props.modelValue.forEach((selectedRow: any) => {
        const foundRow = props.data.find((row: any) =>
          isEqual(selectedRow, row)
        );
        if (foundRow) {
          tableRef.value.toggleRowSelection(foundRow, true);
        }
      });
    });
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.setting-btn {
  font-size: 12px;
  line-height: 28px;
  color: #1d2129;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 4px;
  background: #ffffff;
  border: 1px solid #0064fa;
  cursor: pointer;
  flex-shrink: 0;
}
.setting-btn-text {
  color: #0064FA;
}
.popover-content {
  padding: 4px 8px;
}
.popover-title {
  font-size: 14px;
  color: #1D2129;
  font-weight: 600;
  margin-bottom: 8px;
}
.draggable-item {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.draggable-icons {
  display: flex;
  align-items: center;
}
.icon-top {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  cursor: pointer;
}
.icon-drag {
  width: 16px;
  height: 16px;
  cursor: move;
}
.line-clamp {
  div {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}
.popover-custom {
  .el-popper__arrow:before {
    display: none;
  }
  .el-popover.el-popper {
    border-radius: 6px;
  }
}
</style>

<template>
  <el-row class="task-row" :class="{ done: props.task.done }">
    <!-- 复选框 -->
    <el-col :span="1">
      <el-checkbox :model-value="props.task.done" @change="handleDone" />
    </el-col>

    <!-- 任务内容 + 横向滚动 -->
    <el-col :span="16">
      <el-scrollbar class="custom-scrollbar">
        <div class="scroll-content" :class="{ done: props.task.done }">
          {{ props.task.content }}
        </div>
      </el-scrollbar>
    </el-col>

    <!-- 起始时间 + 截止时间 -->
    <el-col :span="5">
      <div class="time-container">
        <span class="time start">{{ props.task.start.toLocaleDateString() }}</span>
        <span class="dash">-</span>
        <span class="time end">{{ props.task.end.toLocaleDateString() }}</span>
      </div>
    </el-col>

    <!-- 按钮组 -->
    <el-col :span="2" class="button-col">
      <el-button-group>
        <el-button type="primary" :icon="Edit" @click="dialog = true" size="small" />
        <el-button type="danger" :icon="Delete" @click="handleDelete" size="small" />
      </el-button-group>

      <!-- 编辑弹窗 -->
      <el-dialog v-model="dialog" title="编辑待办事项" width="400px">
        <el-input v-model="editContent" placeholder="请输入待办事项内容" class="mb-3" />
        <el-date-picker
          v-model="editDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="mb-3"
        />

        <template #footer>
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="handleEdit">保存</el-button>
        </template>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import { useListStore } from '@/store/list'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'

// 引入 store
const listStore = useListStore()

// 接收 props
const props = defineProps<{
  task: {
    id: string
    content: string
    start: Date
    end: Date
    done: boolean
  }
}>()

function handleDone() {
  listStore.toggle(props.task)
}

// 弹窗控制
const dialog = ref(false)
const editContent = ref(props.task.content)
const editDate = ref<[Date, Date]>([props.task.start, props.task.end])

// 编辑确认函数
function handleEdit() {
  if (!editContent.value.trim()) {
    ElMessage.error('请输入事项内容')
    return
  }
  if (!editDate.value || editDate.value.length !== 2) {
    ElMessage.error('请选择日期范围')
    return
  }

  listStore.update(props.task.id, editContent.value.trim(), editDate.value[0], editDate.value[1])
  ElMessage.success('修改成功')
  dialog.value = false
}

// 删除函数
function handleDelete() {
  ElMessageBox.confirm('确定删除该事项吗？', '警告', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      listStore.remove(props.task)
      ElMessage.success('删除成功')
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}
</script>

<style scoped>
.task-row {
  width: calc(72vw - 26px);
  background-color: #f5f7fa;
  padding: 8px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  height: 48px; /* 提高高度略好看 */
}

.task-row.done {
  color: gray;
  font-style: italic;
  text-decoration: line-through;
}

.el-col {
  display: flex;
  align-items: center;
  height: 100%;
}

/* 调整 checkbox 居中 */
.el-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 滚动区域贴边显示 */
.custom-scrollbar {
  width: 97%;
  height: 100%;
  display: flex;
  align-items: center;
}

.custom-scrollbar :deep(.el-scrollbar__wrap) {
  padding: 0 !important;
}

.scroll-content {
  white-space: nowrap;
  font-size: 15px;
  color: #606266;
  line-height: 1.5;
  padding: 4px 0;
  margin: 0;
}

/*  勾选后样式 */
.done {
  color: #999;
  font-style: italic;
  text-decoration: line-through;
}

/* 时间容器居中对齐 */
.time-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 100%;
}

.time {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
}

.time.start {
  background-color: #e6f7ff;
  color: #1890ff;
}

.time.end {
  background-color: #fff2f0;
  color: #ff4d4f;
}

.dash {
  color: #c0c4cc;
  padding: 0 4px;
}

/* 按钮列 */
.button-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 设置按钮高度与任务栏对齐 */
.el-button {
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>

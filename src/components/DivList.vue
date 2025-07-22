<template>
  <div class="todo-container">
    <!-- 顶部添加按钮 -->
    <div class="add">
      <TaskAdd />
    </div>
    <!-- 标题栏 -->
    <div class="header-row">
      <!-- 日期选择器 -->
      <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="选择日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        style="margin-right: 8px"
      />
      <el-button type="primary" plain @click="handleByDate">按日期查找</el-button>
      <el-tooltip content="请先选择日期" v-if="!selectedDate">
        <el-button type="warning" plain disabled>洗牌</el-button>
      </el-tooltip>
      <el-button v-else type="warning" plain @click="handleShuffle">洗牌</el-button>

      <div class="header-title">标题</div>
      <div class="header-actions">
        <el-button size="small" type="info" plain @click="handleByStart">按开始时间排序</el-button>
        <el-button size="small" type="info" plain @click="handleByEnd">按结束时间排序</el-button>
      </div>
    </div>
    <!-- 搜索栏 -->
    <div class="search" @click="handleSearch">
      <el-input v-model="searchText" placeholder="搜索事项..." clearable class="search-input" />
    </div>
    <!-- 事项 -->
    <div max-height="400px" class="todo-div">
      <div class="todo-div">
        <DivTask v-for="task in listStore.allTasks" :key="task.id" :task="task" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskAdd from '@/components/TaskAdd.vue'
import DivTask from '@/components/DivTask.vue'
import { useListStore } from '@/store/list'
import type { Task } from '@/store/list'
import { ref } from 'vue'

const listStore = useListStore()
const selectedDate = ref<Date | null>(null)

const searchText = ref('')
const count = ref(1)

function handleByDate() {
  if (!selectedDate.value) {
    alert('请选择日期')
    return
  }
  const date = new Date(selectedDate.value)
  const tasks = listStore.getDate(date)
  if (tasks.length === 0) {
    alert('当天没有任务')
  }
  listStore.list = tasks
}

function handleByStart() {
  listStore.byStart()
}

function handleByEnd() {
  listStore.byEnd()
}

function handleSearch() {
  if (!searchText.value.trim()) {
    // 如果搜索框为空，显示所有任务
    listStore.list = (JSON.parse(localStorage.getItem('todo-list') || '[]') as Task[]).map(
      (item) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
      }),
    )
    count.value = listStore.list.length
    return
  }
  // 根据内容模糊搜索
  const keyword = searchText.value.toLowerCase()
  const filtered = listStore.list.filter((task) => task.content.toLowerCase().includes(keyword))
  if (filtered.length === 0) {
    alert('无匹配任务')
  }
  listStore.list = filtered
  count.value = filtered.length
}

function handleShuffle() {
  if (!selectedDate.value) {
    alert('请先选择日期')
    return
  }
  const date = new Date(selectedDate.value)
  listStore.shuffle(date)
}
</script>

<style scoped>
.todo-container {
  display: flex;
  flex-direction: column;
  height: calc(75vh - 30px);
  width: calc(100vw - 40px);
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.add {
  margin-bottom: 20px;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.search {
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
}

.todo-div {
  flex-grow: 1;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 1px 3px rgb(217, 215, 215);
}

.task-item {
  margin-bottom: 10px;
}

.task-item:last-child {
  margin-bottom: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-row {
    flex-direction: column;
    gap: 10px;
  }

  .header-title {
    order: -1;
    margin-bottom: 10px;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .todo-container {
    width: calc(100vw - 20px);
    margin: 10px;
    padding: 15px;
  }
}
</style>

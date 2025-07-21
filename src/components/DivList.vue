<template>
  <div class="todo-container">
    <!-- 顶部添加按钮 -->
    <div class="add">
      <TaskAdd />
    </div>
    <!-- 标题栏 -->
    <div class="header-row">
      <el-button type="primary" plain @click="handleByDate">按日期查找</el-button>
            <el-button type="warning" plain  @click="handleShuffle">洗牌</el-button>
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
      <div v-for="item in count" :key="item" class="task-item">
        <DivTask />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import TaskAdd from '@/components/TaskAdd.vue'
import DivTask from '@/components/DivTask.vue'
import { ref } from 'vue'

const searchText = ref('')
const count = ref(3)

function handleByDate() {}

function handleByStart() {}

function handleByEnd() {}

function handleSearch() {}

function handleShuffle() {}
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

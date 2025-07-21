<template>
  <el-row class="task-row">
    <!-- 复选框 -->
    <el-col :span="1">
      <el-checkbox @click="handleDone" />
    </el-col>

    <!-- 任务内容 + 横向滚动 -->
    <el-col :span="18">
      <el-scrollbar class="custom-scrollbar">
        <div class="scroll-content">
          This is a very very very long task content that needs horizontal scrolling. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </div>
      </el-scrollbar>
    </el-col>

    <!-- 起始时间 + 截止时间 -->
    <el-col :span="3">
      <div class="time-container">
        <span class="time start">{{ '11.3' }}</span>
        <span class="dash">-</span>
        <span class="time end">{{ '11.5' }}</span>
      </div>
    </el-col>

    <!-- 按钮组 -->
    <el-col :span="2" class="button-col">
      <el-button-group>
        <el-button type="primary" :icon="Edit" @click="handleEdit" size="small" />
        <el-button type="danger" :icon="Delete" @click="handleDelete" size="small" />
      </el-button-group>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
// import { ref, watch } from 'vue'/
import { Delete, Edit } from '@element-plus/icons-vue'
// import { useListStore } from '@/store/list'

function handleDone() {}

function handleEdit() {}

function handleDelete() {}
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

</style>

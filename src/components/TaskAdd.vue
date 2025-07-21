<template>
  <div class="compact-container">
    <!-- 输入框 -->
    <div class="input-wrapper">
      <el-input placeholder="添加新的待办事项..." class="compact-input" />
    </div>

    <!-- 日期选择器 -->
    <div class="compact-date-picker">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="compact-picker"
      />
    </div>

    <!-- 按钮 -->
    <div class="button-wrapper">
      <el-button @click="handleAdd" type="primary">添加事项</el-button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
const date = ref('')

function handleAdd(){

}

</script>

<style scoped>
.compact-container {
  display: flex;
  align-items: center; /* 上下对齐 */
  gap: 12px; /* 控件之间的间距 */
}

/* 输入框容器和输入框样式 */
.input-wrapper {
  flex-shrink: 0;
}

.compact-input {
  width: 685px; /* 缩小 input 宽度 */
}

/* 日期选择器保持默认宽度，可根据需要自定义 */
.compact-date-picker {
  flex-shrink: 0;
}

.compact-picker {
  width: 280px; /* 可根据需要调整 */
}

/* 按钮容器和按钮样式 */
.button-wrapper {
  flex-shrink: 0;
}

.button-wrapper .el-button {
  width: 100px; /* 缩小按钮宽度 */
}
</style>

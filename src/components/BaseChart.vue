<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'

const props = defineProps<{
  option: EChartsOption
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }
  if (props.option) {
    chartInstance.setOption(props.option)
  }
}

// 初始化
onMounted(() => {
  initChart()
  // 窗口resize时也调整图表大小
  window.addEventListener('resize', resizeChart)
})

// 卸载时清理事件和实例
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 监听option变化，更新图表
watch(() => props.option, (newOption) => {
  if (chartInstance && newOption) {
    chartInstance.setOption(newOption)
  }
}, { deep: true })
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 320px;
  min-height: 280px;
  position: relative;
  padding: 8px;
}

/* 响应式：移动端更紧凑 */
@media (max-width: 768px) {
  .chart-container {
    height: 260px;
    padding: 4px;
  }
}
</style>


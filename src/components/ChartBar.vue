<!-- ChartBar.vue -->
<template>
  <BaseChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseChart from './BaseChart.vue'

interface DailyStats {
  date: string
  total: number
  done: number
  pending: number
}

const props = defineProps<{ data: DailyStats[] }>()

const option = computed<EChartsOption>(() => ({
  title: {
    text: '每日任务数量',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    bottom: 10,
  },
  xAxis: {
    type: 'category',
    data: props.data.map(d => d.date),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '已完成',
      type: 'bar',
      stack: '总量',
      data: props.data.map(d => d.done),
    },
    {
      name: '未完成',
      type: 'bar',
      stack: '总量',
      data: props.data.map(d => d.pending),
    },
  ],
}))
</script>

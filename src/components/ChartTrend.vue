<!-- ChartTrend.vue -->
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
}

const props = defineProps<{
  data: DailyStats[]
  granularity: 'daily' | 'weekly' | 'monthly'
}>()

const groupedData = computed(() => {
  const map = new Map<string, number>()

  props.data.forEach(d => {
    let key = d.date
    if (props.granularity === 'weekly') {
      const day = parseInt(d.date.slice(8)) || 1
      key = d.date.slice(0, 7) + ' 第' + Math.ceil(day / 7) + '周'
    } else if (props.granularity === 'monthly') {
      key = d.date.slice(0, 7)
    }
    map.set(key, (map.get(key) || 0) + d.total)
  })

  return Array.from(map.entries()).sort()
})

const option = computed<EChartsOption>(() => ({
  title: {
    text: '任务数量趋势',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: groupedData.value.map(([key]) => key),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '任务总数',
      type: 'line',
      data: groupedData.value.map(([, value]) => value),
      smooth: true,
      areaStyle: {},
    },
  ],
}))
</script>

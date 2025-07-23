<!-- ChartDuration.vue -->
<template>
  <BaseChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseChart from './BaseChart.vue'

interface Task {
  content: string
  start: Date
  end: Date
  done: boolean
}

const props = defineProps<{ tasks: Task[] }>()

const option = computed<EChartsOption>(() => {
  const categories = props.tasks.map(t => t.content)
  const seriesData = props.tasks.map((task, idx) => ({
    name: task.content,
    value: [idx, task.start.getTime(), task.end.getTime()],
    itemStyle: {
      color: task.done ? '#91cc75' : '#fac858',
    },
  }))

  return {
    title: {
      text: '任务起止时间分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        const start = new Date(params.value[1]).toLocaleString()
        const end = new Date(params.value[2]).toLocaleString()
        return `${params.name}<br/>开始：${start}<br/>结束：${end}`
      },
    },
    grid: {
      top: 50,
      left: 120,
      right: 50,
      bottom: 30,
    },
    xAxis: {
      type: 'time',
      name: '时间',
    },
    yAxis: {
      type: 'category',
      data: categories,
    },
    series: [
      {
        type: 'custom',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderItem(params: any, api: any) {
          const categoryIndex = api.value(0)
          const start = api.coord([api.value(1), categoryIndex])
          const end = api.coord([api.value(2), categoryIndex])
          const height = 20
          return {
            type: 'rect',
            shape: {
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height,
            },
            style: api.style(),
          }
        },
        encode: { x: [1, 2], y: 0 },
        data: seriesData,
      },
    ],
  }
})
</script>

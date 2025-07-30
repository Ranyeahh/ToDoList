<template>
  <BaseChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'

import BaseChart from './BaseChart.vue'

const props = defineProps<{
  completed: number,
  uncompleted: number,
}>()


const option = computed<EChartsOption>(() => ({
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: [
        { name: '已完成', value: props.completed },
        { name: '未完成', value: props.uncompleted },
      ],
    },
  ],
}))


</script>
<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>

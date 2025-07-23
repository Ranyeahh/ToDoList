<template>
  <AppHeader />
  <div class="chart-page p-4">
    <!-- 顶部：日期范围选择器 -->
    <el-card class="mb-4" shadow="hover">
      <div class="flex justify-between items-center">
        <div class="text-lg font-bold">📊 任务可视化统计</div>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
        />
      </div>
    </el-card>

    <!-- 中间：任务完成率饼图 和 每日任务柱状图 -->
    <el-row :gutter="16" class="mb-4">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="text-base font-medium mb-2">✅ 任务完成率统计（饼图）</div>
          <ChartSummary :completed="summary.done" :uncompleted="summary.pending" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="text-base font-medium mb-2">📅 每日任务数量（柱状图）</div>
          <ChartBar :data="dailyStats" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 底部：趋势折线图 和 持续时间盒须图 -->
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="flex justify-between items-center mb-2">
            <span class="text-base font-medium">📈 任务趋势变化（折线图）</span>
            <el-radio-group v-model="trendType" size="small">
              <el-radio-button label="daily">按天</el-radio-button>
              <el-radio-button label="weekly">按周</el-radio-button>
              <el-radio-button label="monthly">按月</el-radio-button>
            </el-radio-group>
          </div>
          <ChartTrend :data="dailyStats" :granularity="trendType" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="text-base font-medium mb-2">⏱ 任务持续时间分布（盒须图）</div>
          <ChartDuration :tasks="taskList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

import ChartSummary from '@/components/ChartSummary.vue'
import ChartBar from '@/components/ChartBar.vue'
import ChartTrend from '@/components/ChartTrend.vue'
import ChartDuration from '@/components/ChartDuration.vue'

import { useChartStore } from '@/stores/chart'
import { useListStore, type Task } from '@/stores/list'

// 趋势图切换粒度（天 / 周 / 月）
const trendType = ref<'daily' | 'weekly' | 'monthly'>('daily')

const chartStore = useChartStore()
const listStore = useListStore()

// 时间范围选择
const dateRange = ref<[Date, Date]>(chartStore.loadDateRange())

// 每次选择变更时保存
watch(
  dateRange,
  ([from, to]) => {
    chartStore.saveDateRange(from, to)
  },
  { deep: true },
)

// 总体完成率数据
const summary = computed(() => {
  const [from, to] = dateRange.value
  return chartStore.getTaskStats(from, to)
})

// 每日统计数据（供柱状图和折线图复用）
const dailyStats = computed(() => {
  const [from, to] = dateRange.value
  return chartStore.getDailyStats(from, to)
})

// 所有任务列表（供 Duration 图使用）
const taskList = computed<Task[]>(() => {
  const [from, to] = dateRange.value
  return listStore.allTasks.filter((task: Task) => {
    return task.end >= from && task.start <= to
  })
})
</script>

<style scoped>
.chart-page {
  padding-top: 70px;
  min-height: 100vh;
}
</style>

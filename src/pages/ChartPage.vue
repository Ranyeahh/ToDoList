<template>
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
          <ChartSummary :date-range="dateRange" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="text-base font-medium mb-2">📅 每日任务数量（柱状图）</div>
          <ChartBar :date-range="dateRange" />
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
          <ChartTrend :date-range="dateRange" :trend-type="trendType" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="text-base font-medium mb-2">⏱ 任务持续时间分布（盒须图）</div>
          <ChartDuration :date-range="dateRange" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChartSummary from '@/components/ChartSummary.vue'
import ChartBar from '@/components/ChartBar.vue'
import ChartTrend from '@/components/ChartTrend.vue'
import ChartDuration from '@/components/ChartDuration.vue'

const dateRange = ref(['2025-07-01', '2025-07-20'])
const trendType = ref('daily')
</script>

<style scoped>
.chart-page {
  background-color: #f9f9f9;
  min-height: 100vh;
}
</style>

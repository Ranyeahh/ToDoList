// stores/chart.ts
import { defineStore } from 'pinia'
import { useListStore, type Task } from './list'

export interface TaskStats {
  total: number
  done: number
  pending: number
}

const DATE_RANGE_KEY = 'chart-date-range'

export const useChartStore = defineStore('chart', {
  actions: {
    /**
     * 获取某一时间范围内的任务统计信息
     * @param from 起始日期（包含）
     * @param to 截止日期（包含）
     */
    getTaskStats(from: Date, to: Date): TaskStats {
      const listStore = useListStore()
      const fromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate())
      const toDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59, 999)

      const tasksInRange = listStore.allTasks.filter((task: Task) => {
        const start = new Date(task.start)
        const end = new Date(task.end)
        return end >= fromDate && start <= toDate
      })

      const total = tasksInRange.length
      const done = tasksInRange.filter((task) => task.done).length
      const pending = total - done

      return { total, done, pending }
    },

    /**
     * 获取一段日期内每天的任务统计（用于折线图或柱状图）
     * 返回格式：[{ date: '2025-07-21', total: 3, done: 1, pending: 2 }, ...]
     */
    getDailyStats(from: Date, to: Date): Array<{ date: string, total: number, done: number, pending: number }> {
      const result: Array<{ date: string, total: number, done: number, pending: number }> = []

      const current = new Date(from)
      while (current <= to) {
        const stats = this.getTaskStats(current, current)
        result.push({
          date: current.toISOString().split('T')[0],
          ...stats,
        })
        current.setDate(current.getDate() + 1)
      }

      return result
    },

    /**
     * 保存日期范围到 localStorage
     */
    saveDateRange(from: Date, to: Date) {
      const data = [from.toISOString(), to.toISOString()]
      localStorage.setItem(DATE_RANGE_KEY, JSON.stringify(data))
    },

    /**
     * 从 localStorage 读取日期范围，若无则返回默认值
     */
    loadDateRange(): [Date, Date] {
      const stored = localStorage.getItem(DATE_RANGE_KEY)
      if (stored) {
        try {
          const [fromStr, toStr] = JSON.parse(stored)
          return [new Date(fromStr), new Date(toStr)]
        } catch (e) {
          console.warn('日期范围格式错误，已忽略', e)
        }
      }
      // 默认返回值
      return [new Date('2025-07-01'), new Date('2025-07-10')]
    },
  },
})

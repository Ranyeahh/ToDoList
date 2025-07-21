// stores/list.ts
import { defineStore } from 'pinia'

export interface Task {
  id: string // 新增唯一 ID
  content: string
  start: Date
  end: Date
  done: boolean
}

export const useListStore = defineStore('list', {
  state: () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    list: (JSON.parse(localStorage.getItem('todo-list') || '[]') as any[]).map((item) => ({
      ...item,
      start: new Date(item.start),
      end: new Date(item.end),
      // 保持 Date 类型不受转换影响
    })) as Task[],
  }),

  getters: {
    allTasks(state): Task[] {
      return state.list
    },
    doneTasks(state): Task[] {
      return state.list.filter((t) => t.done)
    },
    pendingTasks(state): Task[] {
      return state.list.filter((t) => !t.done)
    },
  },

  actions: {
    add(content: string, start: Date, end: Date) {
      const newTask: Task = {
        id: crypto.randomUUID(), // 新增唯一 ID
        content,
        start,
        end,
        done: false,
      }
      this.list.push(newTask)
      this.save()
    },

    remove(task: Task) {
      this.list = this.list.filter((item) => item.id !== task.id)
      this.save()
    },

    update(taskId: string, content: string, start: Date, end: Date) {
      const task = this.list.find((item) => item.id === taskId)
      if (task) {
        task.content = content
        task.start = start
        task.end = end
        this.save()
      }
    },

    toggle(task: Task) {
      const found = this.list.find((item) => item.id === task.id)
      if (found) {
        found.done = !found.done
        this.save()
      }
    },

    getDate(date: Date): Task[] {
      return this.list.filter((item) => item.start <= date && item.end >= date)
    },

    shuffle(date: Date) {
      const tasks = this.getDate(date)
      if (tasks.length === 0) return // 没有当天任务，直接不处理
      const shuffled = [...tasks].sort(() => Math.random() - 0.5) // 洗牌
      const other = this.list.filter((item) => !(item.start <= date && item.end >= date))
      this.list = [...other, ...shuffled]
      this.save()
    },

    byStart() {
      this.list.sort((a, b) => a.start.getTime() - b.start.getTime())
      this.save()
    },

    byEnd() {
      this.list.sort((a, b) => a.end.getTime() - b.end.getTime())
      this.save()
    },

    reorderTasks(newOrder: Task[]) {
      this.list = newOrder
      this.save()
    },

    save() {
      localStorage.setItem('todo-list', JSON.stringify(this.list))
      // 把任务列表转换成字符串（因为 localStorage 只能存字符串）
    },
  },
})

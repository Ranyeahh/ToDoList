import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(item) {
      this.todos.push(item)
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    }
  }
})

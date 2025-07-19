import { createStore } from 'vuex'

export const vuexStore = createStore({
  state: {
    todos: [],
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo)
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1)
    },
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('addTodo', todo)
    },
    removeTodo({ commit }, index) {
      commit('removeTodo', index)
    },
  },
})

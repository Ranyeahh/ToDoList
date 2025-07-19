<template>
  <div>
    <h1>Todo List</h1>
    <input v-model="newTodo" placeholder="输入待办" />
    <button @click="add">添加</button>

    <ul>
      <li v-for="(todo, index) in todoStore.todos" :key="index">
        {{ todo }}
        <button @click="todoStore.removeTodo(index)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../store/piniaStore'

const todoStore = useTodoStore()
const newTodo = ref('')

function add() {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}
</script>


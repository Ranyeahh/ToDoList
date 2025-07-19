import { createRouter, createWebHistory } from 'vue-router'

import TodoList from '../pages/TodoList.vue'
import FormPage from '../pages/FormPage.vue'

const routes = [
  { path: '/', redirect: '/todo' },         // 默认跳转
  { path: '/todo', component: TodoList },
  { path: '/form', component: FormPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

// router.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import List from '../pages/ListPage.vue'
import Chart from '../pages/ChartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/list',
      name: 'list',
      component: List,
      // 懒加载：component: () => import('../pages/ListPage.vue'),
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart,
    },
  ],
})

export default router

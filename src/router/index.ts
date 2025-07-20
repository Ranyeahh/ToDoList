// route/index.ts
import { ElMessage } from 'element-plus'

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import List from '../pages/ListPage.vue'
import Chart from '../pages/ChartPage.vue'

import { useUserStore } from '@/store/user'

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
      meta: { requires: true }  //  需要登录才能访问
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart,
      meta: { requires: true }  //  需要登录才能访问
    },
  ],
})

router.beforeEach((to) => {
  const store = useUserStore()
  if (to.meta.requires && !store.In) {
    ElMessage.warning('请先登录')
    return '/'  // 阻止跳转，回首页
  }
})


export default router

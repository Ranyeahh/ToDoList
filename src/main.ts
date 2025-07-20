import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import { useUserStore } from '@/store/user'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

// 登录状态存在时跳转到 list（只有当前是首页时才跳）
const user = useUserStore()
if (location.pathname === '/' && user.In) {
  router.replace('/list')
}

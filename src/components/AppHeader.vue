<!-- src/components/AppHeader.vue -->
<template>
  <header class="header">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/List">List</RouterLink>
      <RouterLink to="/Chart">Chart</RouterLink>
    </nav>
    <p v-if="user && user.name" class="user">{{ user.name }} 已登录</p>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const user = useUserStore()
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* 增加高度 */
  background: rgb(255, 230, 0);
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.user {
  font-size: larger;
  font-style: italic;
  position: absolute; /* 绝对定位 */
  right: 20px; /* 距离右边20px */
  margin: 0; /* 移除默认边距 */
  color: rgb(242, 43, 242);
}
nav {
  display: flex;
  gap: 20px; /* 增加导航项之间的间距 */
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1.2rem; /* 增大字体 */
  padding: 8px 16px; /* 增加内边距 */
  border-radius: 4px; /* 圆角效果 */
  transition: background-color 0.3s; /* 悬停过渡效果 */
}

nav a:hover {
  background-color: rgba(0, 0, 0, 0.1); /* 悬停效果 */
}

nav a.router-link-exact-active {
  color: #000;
  background-color: rgba(0, 0, 0, 0.1); /* 当前活动路由样式 */
}
</style>

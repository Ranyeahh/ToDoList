<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/List">List</RouterLink>
      <RouterLink to="/Chart">Chart</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgb(255, 230, 0); /* 可选：添加背景色 */

  z-index: 1000; /* 确保导航栏在其他内容之上 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 可选：添加阴影效果 */
}

nav {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中（如果需要） */
  gap: 2rem;
  padding: 1rem;
}

/* 为了避免内容被导航栏遮挡，为 RouterView 添加上边距 */
.RouterView {
  margin-top: 60px; /* 根据导航栏高度调整 */
}
</style>

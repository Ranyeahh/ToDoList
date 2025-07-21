<script setup lang="ts">

</script>

<template>
  <RouterView />
</template>


<style scoped>


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

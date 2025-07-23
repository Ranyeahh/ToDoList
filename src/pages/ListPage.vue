<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import DivList from '@/components/DivList.vue'
import LogOut from '@/components/LogOut.vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
</script>

<template>
  <div class="container">
    <AppHeader />
    <main class="main-content">
      <h1 class="greeting">Hello, {{ user.name }}, Let's start now!</h1>
      <div class="list-container">
        <DivList />
      </div>
    </main>
    <AppFooter />
    <div class="logout-container">
      <LogOut />
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 50px; /* 根据需要调整 */
}

.greeting {
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 20px 0;
}

.logout-container {
  position: fixed;
  bottom: 80px;
  right: 300px;
}
</style>

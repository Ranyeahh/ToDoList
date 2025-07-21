<template>
  <el-button  class="logout-button" @click="handleLogout" >退出登录</el-button>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/user'

const router = useRouter()
const user = useUserStore()


function handleLogout() {
      user.logOut()
      ElMessageBox.alert('已退出，欢迎再次使用')
      router.push('/')
    }
</script>

<style scoped>
.logout-button {

  font-size: 18px;
  padding: 12px 24px;

  background-color: rgb(255, 230, 0);
  border-color: rgb(255, 230, 0);
  color: rgb(255, 255, 255);

  &:hover {
  font-size: 20px;
  padding: 18px 30px;
  }

  &:active {
    background-color: rgb(236, 229, 183);
    border-color: rgb(236, 229, 183);
  }
}
</style>

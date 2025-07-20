<template>
  <el-button @click="handleLogout">退出登录</el-button>
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

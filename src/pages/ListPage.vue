<script setup lang="ts">

import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useUserStore } from '@/store/user'

const user = useUserStore()
</script>

<template>
  <div class="container">
    <AppHeader />
    <h3>Hello ,{{ user.name }} !</h3>

    <AppFooter />
  </div>
    <el-tabs >
    <el-tab-pane label="个人信息" name="info">
      <p>这是个人信息内容</p>
    </el-tab-pane>
    <el-tab-pane label="订单记录" name="orders">
      <p>这里是订单记录</p>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
const user = useUserStore()
</script>

<template>
  <div class="container">

    <h3>Hello ,{{ user.name }} !</h3>

    <el-tabs>
      <el-tab-pane label="区域1" name="block-1">
        <p>这是区域1</p>
      </el-tab-pane>
      <el-tab-pane label="区域2" name="block-2">
        <p>这是区域2</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

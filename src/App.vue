<template>
  <div>
    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane label="Todo List" name="/todo"></el-tab-pane>
      <el-tab-pane label="Form Page" name="/form"></el-tab-pane>
    </el-tabs>

    <router-view />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeTab = ref(route.path)

// 监听当前路由变化，保持 Tab 激活状态
watch(
  () => route.path,
  (newPath) => {
    activeTab.value = newPath
  }
)

// 切换 Tab 时跳转
const handleTabClick = (tab) => {
  router.push(tab.props.name)
}
</script>

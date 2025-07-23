<!-- src/components/FormLogin.vue -->
<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="form.name" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" show-password />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { Rules } from '@/utils/valid'

const router = useRouter()
const formRef = ref<FormInstance>()
const user = useUserStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
})

const rules = Rules

function handleLogin() {
  formRef.value?.validate((valid) => {
    if (valid) {
      const token = 'mock-token-' + form.name
      user.logIn(token, form.name)
      ElMessageBox.alert(`${form.name} 登录成功`)
      router.push('/list')
    }
  })
}
</script>

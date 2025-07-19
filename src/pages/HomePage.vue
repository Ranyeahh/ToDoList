<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessageBox } from 'element-plus'

import { useUserStore } from '@/store/user'

const router = useRouter()
const formRef = ref<FormInstance>()

const user = useUserStore()

const show = ref<'login' | 'register'>('login')
const checked = ref(false)
const imgIndex = ref(1)

// 登录 & 注册 共用数据结构
const form = reactive({
  name: '',
  email: '',
  password: '',
  passAgain: '',
  code: '',
})

// 校验规则
const rules: FormRules = {
  name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: '至少8位字母数字组合',
      trigger: 'blur',
    },
  ],
  passAgain: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

// 登录逻辑
function handleLogin() {
  formRef.value?.validate((valid) => {
    if (valid) {
      user.logIn(form.name)
      ElMessageBox.alert(`${form.name} 登录成功`)
      router.push('/list')
    }
  })
}

// 注册逻辑
function handleRegister() {
  formRef.value?.validate((valid) => {
    if (valid) {
      user.register(form.name)
      ElMessageBox.alert(`${form.name} 注册成功`)
      router.push('/list')
    }
  })
}

// 验证码切换
function random(N: number, M: number): number {
  return Math.floor(Math.random() * (M - N + 1)) + N
}
function changeImg() {
  imgIndex.value = random(1, 3)
}
</script>

<template>
  <div class="container">
    <h1>Welcome ToDo List</h1>

    <div class="tab-buttons">
      <el-button :type="show === 'login' ? 'primary' : 'default'" @click="show = 'login'">
        Login
      </el-button>
      <el-button :type="show === 'register' ? 'primary' : 'default'" @click="show = 'register'">
        Register
      </el-button>
    </div>

    <div class="form-container">
      <!-- 登录表单 -->
      <el-form
        v-if="show === 'login'"
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="100px"
      >
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

      <!-- 注册表单 -->
      <el-form
        v-if="show === 'register'"
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            :type="checked ? 'text' : 'password'"
            placeholder="至少8位字母数字组合"
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="passAgain">
          <el-input
            v-model="form.passAgain"
            :type="checked ? 'text' : 'password'"
            placeholder="再次输入密码"
          />
        </el-form-item>

        <el-form-item label="验证码">
          <el-input v-model="form.code" placeholder="请输入验证码" />
          <div class="captcha-container">
            <span>点击切换验证码：</span>
            <p>{{ imgIndex }}</p>

            <img
              :src="`/img/${imgIndex}.jpg`"
              @click="changeImg"
              alt="验证码"
              class="captchaImg"
              title="点击更换验证码"
            />
          </div>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="checked">
            {{ checked ? '隐藏密码' : '显示密码' }}
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

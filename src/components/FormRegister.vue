<!-- src/components/FormRegister.vue -->
<template>
  <el-form
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
          :src="`img/${imgIndex}.jpg`"
          @click="changeImg"
          alt="验证码"
          class="captcha-img"
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
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/user'
import { Rules } from '@/utils/valid'
import { random } from '@/utils/captcha'

const router = useRouter()
const user = useUserStore()
const formRef = ref<FormInstance>()

const checked = ref(false)
const imgIndex = ref(1)

const form = reactive({
  name: '',
  email: '',
  password: '',
  passAgain: '',
  code: '',
})

const rules = Rules

function changeImg() {
  imgIndex.value = random(1, 3)
}

function handleRegister() {
  formRef.value?.validate((valid) => {
    if (valid) {
      user.register(form.name) // 注册后保存用户名到 Pinia
      ElMessageBox.alert(`${form.name} 注册成功`)
      router.push('/list')
    }
  })
}
</script>

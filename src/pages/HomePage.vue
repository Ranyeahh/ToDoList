<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import FormLogin from '@/components/FormLogin.vue'
import FormRegister from '@/components/FormRegister.vue'

import { ref } from 'vue'
const show = ref<'login' | 'register'>('login')
</script>

<template>
  <div class="container">
    <AppHeader />

    <div class="tab-buttons">
      <el-button :type="show === 'login' ? 'primary' : 'default'" @click="show = 'login'">
        登录
      </el-button>
      <el-button :type="show === 'register' ? 'primary' : 'default'" @click="show = 'register'">
        注册
      </el-button>
    </div>

    <div class="form-container">
      <FormLogin v-if="show === 'login'" />
      <FormRegister v-if="show === 'register'" />
    </div>

    <AppFooter />
  </div>
</template>

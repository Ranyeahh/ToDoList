<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import FormLogin from '@/components/FormLogin.vue'
import FormRegister from '@/components/FormRegister.vue'
</script>

<template>
  <div class="container">
    <AppHeader />
    <div class="form-container">
      <el-tabs class="tab-buttons">
        <el-tab-pane label="登录" name="login">
          <FormLogin />
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <FormRegister />
        </el-tab-pane>
      </el-tabs>
    </div>

    <AppFooter />
  </div>
</template>

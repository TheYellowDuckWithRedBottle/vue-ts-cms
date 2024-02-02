<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import localStorage from '@/utility/Cache'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      username: localStorage.getCache('username') ?? '',
      password: localStorage.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            //本地缓存
            localStorage.setCache('username', account.username)
            localStorage.setCache('password', account.password)
          } else {
            //不记住密码
            localStorage.removeCache('username')
          }
          store.dispatch('loginUser', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>

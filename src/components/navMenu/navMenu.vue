<template>
  <div class="navMenu-layout">
    <div class="nav-title">
      <img src="~@/assets/img/logo.svg" alt="" />
      <span>vue3 + ts</span>
    </div>
    <div class="nav-content">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { userStore } from '@/store/index'

export default defineComponent({
  setup() {
    const store = userStore()
    const userMenu = computed(() => store.state.login.userMenu)
    console.log(userMenu)
    return {
      userMenu
    }
  }
})
</script>

<style scoped lang="less">
.navMenu-layout {
  padding-top: 10px;
  height: calc(100% - 10px);
  .nav-title {
    height: 5%;
    display: flex;
    justify-content: center;
  }
  img {
    height: 24px;
    width: 24px;
  }
}
</style>

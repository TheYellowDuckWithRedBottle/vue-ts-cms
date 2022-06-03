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
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <div v-if="item.children">
                <template v-for="child in item.children" :key="child.id">
                  <el-menu-item index="1-1">
                    <span>{{ child.name }}</span>
                  </el-menu-item>
                </template>
              </div>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { userStore } from '@/store/index'
import Cache from '@/utility/Cache'

export default defineComponent({
  setup() {
    const store = userStore()
    const userMenu = Cache.getCache('userMenu')
    console.log(userMenu)
    const handleOpen = () => {
      console.log('open')
    }
    const handleClose = () => {
      console.log('open')
    }
    return {
      userMenu,
      handleOpen,
      handleClose
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

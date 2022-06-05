<template>
  <div class="navMenu-layout">
    <div class="nav-title">
      <img src="~@/assets/img/logo.svg" alt="" />
      <span>vue3 + ts</span>
    </div>
    <div class="nav-content">
      <el-menu
        default-active="2"
        class="el-menu-vertical"
        background-color="#0c2135"
        unique-opened="false"
        text-color="#b7bdc3"
        active-text-color="#0a60bd"
      >
        <template v-for="item in userMenu" :key="item.id">
          <!-- 二级菜单 -->
          <template v-if="item.type === 1">
            <!-- 二级菜单的可以展开的标题 -->
            <el-submenu :index="item.id + ''">
              <template #title>
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <!-- 遍历里面的item -->
              <template v-for="subitem in item.children" :key="subitem.id">
                <el-menu-item :index="subitem.id + ''">
                  <i v-if="subitem.icon" :class="subitem.icon"></i>
                  <span>{{ subitem.name }}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <!-- 一级菜单 -->
          <template v-else-if="item.type === 2">
            <el-menu-item :index="item.id + ''">
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { userStore } from '@/store/index'
import Cache from '@/utility/Cache'
import { IRootState } from '@/store/types'

export default defineComponent({
  setup() {
    // const store = userStore<IRootState>()
    // store.state.login
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

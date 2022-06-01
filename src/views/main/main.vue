<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside class="el-side">
        <nav-menu />
      </el-aside>
      <el-container class="el-right-side">
        <el-header class="el-header">Header</el-header>
        <el-main class="el-main">Main</el-main>
        <el-footer class="el-footer">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavMenu from '@/components/navMenu/navMenu.vue'

export default defineComponent({
  components: {
    NavMenu
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.common-layout {
  height: 100%;
  width: 100%;
  .layout-container {
    height: 100%;
  }
}
.el-right-side {
  height: 100%;
}
.el-side {
  width: 200px;
  height: 100%;
  background: #00a1d6;
}
.el-header {
  height: 10%;
}
.el-main {
  height: 80%;
}
</style>

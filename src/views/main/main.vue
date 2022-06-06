<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside class="el-side" :width="isCollapse ? '60px' : '200px'">
        <nav-menu />
      </el-aside>
      <el-container class="el-right-side">
        <el-header class="el-header">
          <nav-header @changeFolder="changeFolder" />
        </el-header>
        <el-main class="el-main">Main</el-main>
        <el-footer class="el-footer">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/navMenu/navMenu.vue'
import navHeader from '@/components/navHeader/navHeader.vue'

export default defineComponent({
  components: {
    NavMenu,
    navHeader
  },
  setup() {
    let isCollapse = ref(false)
    const changeFolder = (isFolder: boolean) => {
      console.log(isFolder)
      isCollapse.value = isFolder
    }
    return {
      changeFolder,
      isCollapse
    }
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
  height: 100%;
  background: #00a1d6;
}
.el-header {
  height: 6%;
  display: flex;
  align-items: center;
}
.el-main {
  height: 80%;
}
</style>

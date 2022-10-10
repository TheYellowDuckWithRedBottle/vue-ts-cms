<template>
  <div class="common-layout">
    <nav-header />
    <div class="layout-body">
      <nav-menu />
      <menuPanel />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/navMenu/navMenu.vue'
import navHeader from '@/components/navHeader/navHeader.vue'
import menuPanel from '@/components/menuPanel/menuPanel.vue'

export default defineComponent({
  components: {
    NavMenu,
    navHeader,
    menuPanel
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
.layout-body {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>

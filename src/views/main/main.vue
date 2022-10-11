<template>
  <div class="common-layout">
    <nav-header />
    <navTopTool @collapse="collapseMenu" />
    <div class="layout-body">
      <nav-menu v-if="isCollapse" />
      <menuPanel
        @collapse="collapseMenu"
        :isCollapse="isCollapse"
        v-if="isCollapse"
      />
      <mapContainer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/navMenu/navMenu.vue'
import navHeader from '@/components/navHeader/navHeader.vue'
import navTopTool from '@/components/navTopTool/navTopTool.vue'
import menuPanel from '@/components/menuPanel/menuPanel.vue'
import mapContainer from '@/components/mapContainer/mapContainer.vue'

export default defineComponent({
  components: {
    NavMenu,
    navHeader,
    navTopTool,
    menuPanel,
    mapContainer
  },
  setup() {
    let isCollapse = ref(true)
    function collapseMenu(value: boolean) {
      isCollapse.value = value
    }
    return {
      collapseMenu,
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
  height: calc(93% - 35px;);
  width: 100%;
  display: flex;
}
</style>

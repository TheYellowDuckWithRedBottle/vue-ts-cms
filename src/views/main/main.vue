<template>
  <div class="common-layout">
    <nav-header />
    <navTopTool @collapse="collapseMenu" />
    <div class="layout-body">
      <nav-menu v-if="isCollapse" @open="openMenu" :menuData="menuData" />
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
import { defineComponent, reactive, ref } from 'vue'
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
    let menuData = reactive([
      { name: 'layerlist', title: '数据', children: [] },
      { name: 'videomanager', title: '视频' },
      {
        name: 'analysis_group',
        title: '分析',
        children: [
          { name: 'sdxz', title: '三调现状' },
          { name: 'tdlyxz', title: '土地利用现状' }
        ]
      },
      { name: 'identify', title: '属性' },
      { name: 'query', title: '查询' },
      { name: 'measure', title: '量测' }
    ])
    let currentWidget = reactive(menuData[0])
    function collapseMenu(value: boolean) {
      isCollapse.value = value
    }
    function openMenu(widgetName: string) {
      console.log(widgetName)
    }
    return {
      collapseMenu,
      isCollapse,
      openMenu,
      menuData
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
  height: 93%;
  width: 100%;
  display: flex;
}
</style>

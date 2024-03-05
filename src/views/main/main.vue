<template>
  <div class="common-layout">
    <nav-header />
    <navTopTool @collapse="collapseMenu" />
    <div class="layout-body">
      <nav-menu v-if="isCollapse" @open="openMenu" ref="childRef" :menuData="menuData" />
      <menuPanel
        @collapse="collapseMenu"
        :isCollapse="isCollapse"
        :currentWidget="currentWidget"
        v-if="isCollapse"
      />
      <mapContainer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted, getCurrentInstance,computed } from 'vue'
import NavMenu from '@/components/navMenu/navMenu.vue'
import navHeader from '@/components/navHeader/navHeader.vue'
import navTopTool from '@/components/navTopTool/navTopTool.vue'
import menuPanel from '@/components/menuPanel/menuPanel.vue'
import mapContainer from '@/components/mapContainer/mapContainer.vue'
import store from '@/store'
import { getUserInfoByName } from '@/service/login/login'
type Menu = {
  name: string
  title: string
  children: Array<Menu>
}
export default defineComponent({
  components: {
    NavMenu,
    navHeader,
    navTopTool,
    menuPanel,
    mapContainer
  },
  setup() {
    const childRef = ref(null)
    const grandChildRef = ref(null)
    let instance = getCurrentInstance()
    let state = reactive({
      menuData: [
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
      { name: 'collect', title: '收藏' },
      { name: 'query', title: '查询' },
      { name: 'measure', title: '量测' },
      { name: 'import', title: '导入' }
    ],
    currentWidget: {name:'layerlist',title:'数据'},
    isCollapse:true
    })
    onMounted(() => {
      const storeUser = computed(() => store.getters.getUser)
    })
    function collapseMenu(value: boolean) {
      state.isCollapse = value
    }
    function openMenu(widgetName: string) {
      travelTree(state.menuData,widgetName)
    }
    function travelTree(tree:any, target:string):any{
      tree.forEach((element: { name: string,children:any,title:any }) => {
        if(element.name == target){
          state.currentWidget.name = element.name
          state.currentWidget.title = element.title
        }else if(element.children){
          travelTree(element.children,target)
        }
      });
    }
    return {
      collapseMenu,
      childRef,
      openMenu,
      ...toRefs(state)
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

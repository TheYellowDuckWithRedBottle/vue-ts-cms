<template>
  <div class="config-panel">
    <div class="config-header">
      <div class="config-title-container">
        <span class="config-title">管理配置</span>
        <span class="version">v1.0</span>
      </div>
      <div
        class="use-help"
        @mousemove="hoverHelp(true)"
        @mouseleave="hoverHelp(false)"
        :class="isShowHelpDoc ? 'hover-help' : ''"
      >
        <div class="use-tip-container">
          <span class="use-tip">使用帮助</span>
          <font-awesome-icon icon="fa-solid fa-circle-question" />
        </div>
        <div class="use-detail" v-show="isShowHelpDoc">
          <div>PDF文档</div>
          <div>word文档</div>
        </div>
      </div>
    </div>
    <div class="config-body">
      <div class="config-navMenu">
        <configNavMenu />
      </div>
      <div class="menu-body">
        <configPanel />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import configNavMenu from './configBody/configNavMenu.vue'
import configPanel from './configBody/configPanel.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    configNavMenu,
    configPanel
  },
  setup() {
    let isShowHelpDoc = ref(false)
    function hoverHelp(isHover: boolean) {
      isShowHelpDoc.value = isHover
    }
    return {
      hoverHelp,
      isShowHelpDoc
    }
  }
})
</script>

<style scoped>
.config-panel {
  width: 100%;
  height: 100%;
}
.config-header {
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  background: rgb(45, 109, 204);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  color: white;
}
.config-title {
  font-size: 18px;
  font-weight: bold;
}
.version {
  font-size: 12px;
}
.use-help {
  font-size: 16px;
  padding: 0 4px;
  height: 100%;
  position: relative;
}
.use-help:hover {
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
.help-title {
  position: relative;
  display: flex;
  flex-direction: column;
}
.use-tip-container {
  height: 100%;
  display: flex;
  align-items: center;
}
.use-tip {
  margin-right: 4px;
}
.use-detail {
  width: 100%;
  height: 200%;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  /* position: absolute; */
}
.use-detail:hover {
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
.use-tip,
.config-title {
  padding-right: 8px;
}
.config-body {
  height: calc(100% - 45px);
  width: 100%;
  display: flex;
  background: #efeef0;
}
.config-navMenu {
  width: 200px;
  height: 100%;
  border-right: 1px solid #e5e5e5;
}
.menu-body {
  width: calc(100% - 200px);
  height: 100%;
}
</style>

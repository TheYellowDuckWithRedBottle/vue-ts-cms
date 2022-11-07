<template>
  <div class="panel">
    <div class="tab-page-tool">
      <template v-for="(item, index) in tabPages" :key="index">
        <div
          class="tab"
          @mouseenter="hoverTab(item, index)"
          @mouseleave="leaveTab(item, index)"
          @click="clickTab(item, index)"
        >
          <span class="tab-close-title"
            >{{ item.title }}
            <div v-if="item.isHover" class="tab-close-icon">
              <font-awesome-icon icon="fa-solid fa-xmark" /></div
          ></span>

          <div class="tab-close-icon-wrap"></div>
        </div>
      </template>
    </div>
  </div>
  <div class="tab-page-Body">
    <configHeader></configHeader>
  </div>
</template>

<script lang="ts">
import configHeader from '../configPanel/ConfigHeader.vue'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  components: {
    configHeader
  },
  setup() {
    const tabPages = reactive([
      { title: '模板管理', isHover: false },
      {
        title: '视频管理'
      },
      { title: '系统管理' }
    ])
    function hoverTab(item: any, index: number) {
      tabPages[index].isHover = true
    }
    function leaveTab(item: any, index: number) {
      tabPages[index].isHover = false
    }
    function clickTab(item: any, index: number) {
      tabPages[index].isHover = true
    }
    return { tabPages, hoverTab, leaveTab, clickTab }
  }
})
</script>

<style scoped>
.panel {
  width: 100%;
  display: flex;
  align-items: center;
  color: grey;
  padding-top: 10px;
  font-size: 12px;
}
.tab-page-tool {
  width: 100%;
  display: flex;
  height: 36px;
  margin-top: 10px;
  align-items: center;
  font-size: 14px;
  justify-content: flex-start;
}
.tab-page-Body {
  height: calc(100% - 56px);
  box-sizing: border-box;
  background: white;
}
.tab {
  display: flex;
  height: 30px;
  width: 120px;
  align-items: center;
}
.tab:hover {
  cursor: pointer;
}
.tab-close-title {
  background: url('../../../../src/assets/img/acrossTab-2.png') no-repeat;
  background-position: 0 3px;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-left: 20px;
}
.tab-close-title:hover {
  background: url('../../../../src/assets/img/acrossTab-2.png') no-repeat;
  background-position: 0px -57px;
}
.tab-close-icon-wrap {
  background: url('../../../../src/assets/img/acrossTab-2.png') no-repeat;
  background-position: right -5px top -27px;
  height: 100%;
  width: 18px;
  display: flex;
  align-items: center;
}
.tab-close-icon-wrap:hover {
  background: url('../../../../src/assets/img/acrossTab-2.png') no-repeat;
  background-position: right -2px top -87px;
}
.tab-close-icon {
  padding-left: 14px;
}
</style>

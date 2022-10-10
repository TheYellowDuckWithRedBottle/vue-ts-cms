<template>
  <div class="navMenu-layout">
    <div class="nav-content">
      <div
        v-for="(item, index) in userMenu"
        :key="index"
        @click="clickMenuItem(item, index)"
        @mouseenter="hoverMenuItem(item, index)"
        @mouseleave="leaveMenuItem(item, index)"
      >
        <div class="menu-item" v-if="item.name === 'layerlist'">
          <img src="@/assets/img/widget-icons/layerlist.png" alt="" />
          <span class="menu-name">{{ item.title }}</span>
        </div>
        <div class="menu-item" v-else-if="item.name === 'videomanager'">
          <img src="@/assets/img/widget-icons/videomanager.png" alt="" />
          <span class="menu-name">{{ item.title }}</span>
        </div>
        <div class="menu-item" v-else-if="item.name === 'analysis_group'">
          <img src="@/assets/img/widget-icons/analysis_group.png" alt="" />
          <span class="menu-name">{{ item.title }}</span>
        </div>
        <div class="menu-item" v-else-if="item.name === 'identify'">
          <img src="@/assets/img/widget-icons/videomanager.png" alt="" />
          <span class="menu-name">{{ item.title }}</span>
        </div>
        <div class="menu-item" v-else-if="item.name === 'query'">
          <img src="@/assets/img/widget-icons/videomanager.png" alt="" />
          <span class="menu-name">{{ item.title }}</span>
        </div>
        <div class="menu-item" v-else>
          <img src="@/assets/img/widget-icons/default.png" alt="" />
          <span class="menu-name">{{ item.title }}</span>
        </div>
        <div v-if="item.children && item.children.length > 0 && item.showChild">
          <template
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
          >
            <span class="menu-name">{{ child.title }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { userStore } from '@/store/index'
import Cache from '@/utility/Cache'
import { IRootState } from '@/store/types'

export default defineComponent({
  props: {
    collapse: {
      default: true,
      type: Boolean
    }
  },
  setup() {
    // const store = userStore<IRootState>()
    // store.state.login
    const isCollapse = false
    let userMenu = Cache.getCache('userMenu')
    userMenu = reactive([
      { name: 'layerlist', title: '数据', children: [] },
      { name: 'videomanager', title: '视频' },
      { name: 'analysis_group', title: '分析', children: [{ name: 'sdxz' }] },
      { name: 'identify', title: '属性' },
      { name: 'query', title: '查询' },
      { name: 'measure', title: '量测' }
    ])
    console.log(userMenu)
    const handleOpen = () => {
      console.log('open')
    }
    const handleClose = () => {
      console.log('open')
    }
    const hoverMenuItem = (menuItem: any, index: number) => {
      userMenu[index]['showChild'] = true
      console.log(menuItem, index)
    }
    const leaveMenuItem = (menuItem: any, index: number) => {
      userMenu[index]['showChild'] = false
      console.log(menuItem, index)
    }
    const clickMenuItem = (menuItem: any, index: number) => {
      console.log(menuItem)
      userMenu[index]['showChild'] = true
    }
    return {
      isCollapse,
      userMenu,
      handleOpen,
      handleClose,
      hoverMenuItem,
      leaveMenuItem,
      clickMenuItem
    }
  }
})
</script>

<style scoped>
.navMenu-layout {
  height: calc(93% - 10px);
}
.nav-content {
  height: 100%;
  width: 50px;
  background: #d9e7fd;
  padding-top: 8px;
}
.menu-item {
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  padding: 2px 0px;
  border-bottom: 1px solid white;
  cursor: pointer;
}
.menu-item:hover {
  background: rgb(66, 133, 244);
  color: white;
}
img {
  width: 30px;
  display: block;
}
.divider {
  width: 100%;
  height: 1px;
  background: white;
}
</style>

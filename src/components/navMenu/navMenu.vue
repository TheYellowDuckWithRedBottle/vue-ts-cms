<template>
  <div class="navMenu-layout">
    <div class="nav-content">
      <div
        v-for="(item, index) in userMenu"
        :key="index"
        class="menu-item"
        @click="clickMenuItem(item, index)"
        @mouseenter="hoverMenuItem(item, index)"
        @mouseleave="leaveMenuItem(item, index)"
      >
        <div
          class="menu-child"
          v-if="item.children && item.children.length > 0 && item.showChild"
        >
          <div
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            class="menu-child-name"
          >
            <span>{{ child.title }}</span>
          </div>
        </div>
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
    },
    menuData: {
      default: () => [],
      type: Array
    }
  },
  setup(props, { emit }) {
    // const store = userStore<IRootState>()
    // store.state.login
    const isCollapse = false
    let userMenu = Cache.getCache('userMenu')
    userMenu = reactive(props.menuData)
    console.log(userMenu)
    const handleOpen = () => {
      console.log('open')
    }
    const handleClose = () => {
      console.log('close')
    }
    const hoverMenuItem = (menuItem: any, index: number) => {
      userMenu[index]['showChild'] = true
    }
    const leaveMenuItem = (menuItem: any, index: number) => {
      userMenu[index]['showChild'] = false
    }
    const clickMenuItem = (menuItem: any, index: number) => {
      console.log(menuItem)
      userMenu[index]['showChild'] = true
      emit('open', menuItem)
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
  height: calc(100% - 10px);
  position: relative;
  z-index: 3;
}
.nav-content {
  height: 100%;
  width: 50px;
  background: #d9e7fd;
  padding-top: 8px;
}
.menu-item {
  width: 100%;
  height: 55px;
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  border-bottom: 1px solid white;
  position: relative;
}
.menu-item:hover {
  background: rgb(66, 133, 244);
  color: white;
  cursor: pointer;
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
.menu-child {
  position: absolute;
  left: 50px;
  width: 170px;
  color: white;
  background: rgb(66, 133, 244);
}
.menu-child-name {
  padding: 10px 8px;
  font-size: 14px;
  width: 100%;
}
.menu-child-name :hover {
  padding: 10px 8px;
  font-size: 14px;
  color: rgb(66, 133, 244);
  background-color: white;
}
</style>

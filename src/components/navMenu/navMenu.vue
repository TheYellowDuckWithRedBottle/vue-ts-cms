<template>
  <div class="navMenu-layout">
    <div class="nav-content">
      <div
        v-for="(item, index) in userMenu"
        :key="index"
        class="menu-item"
        :class="{
          'menu-item-active': item.isActive,
        }"
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
            @click.stop="clickMenuItem(child, index, item)"
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

<script>
import { defineComponent, computed, reactive, toRefs } from 'vue'

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
    const userMenu = reactive(props).menuData
    userMenu.forEach((item) => {
      item.showChild = false
    })
    const handleOpen = () => {
      console.log('open')
    }
    const handleClose = () => {
      console.log('close')
    }
    function hoverMenuItem(menuItem, index) {
      if (userMenu && userMenu.length > 0) {
        userMenu[index]['showChild'] = true
      }

    }
    const leaveMenuItem = (menuItem, index) => {
      userMenu[index]['showChild'] = false
    }
    const clickMenuItem = (menuItem, index, item) => {
      // 点击菜单，如果菜单有子菜单，不做任何操作
      if(menuItem.children && menuItem.children.length > 0){
        return
      }
      // 点击没有子菜单的顶级菜单或者子菜单，关闭所有子菜单
      userMenu[index]['showChild'] = false
      userMenu.forEach((item) => {
        if(item.name === menuItem.name) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      emit('open', menuItem.name)
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
  border-bottom: 1px solid var(--backgroundColor);
  position: relative;
}
.menu-item-active,.menu-item:hover {
  background: var(--color-primary);
  color: var(--backgroundColor);
  cursor: pointer;
}
img {
  width: 30px;
  display: block;
}
.divider {
  width: 100%;
  height: 1px;
  background: var(--backgroundColor);
}
.menu-child {
  position: absolute;
  left: 50px;
  width: 170px;
  color: var(--backgroundColor);
  background: var(--color-primary);
}
.menu-child-name {
  padding: 10px 8px;
  font-size: 14px;
  width: 100%;
}
.menu-child-name :hover {
  font-size: 14px;
  color: var(--activeTextColor);
}
</style>

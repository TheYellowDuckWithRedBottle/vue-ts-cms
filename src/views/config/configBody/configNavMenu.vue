<template>
  <div class="panel">
    <template v-for="(item, index) in configMenu" :key="index">
      <div class="config-menu-item">
        <div class="config-menu-title">
          <div>
            <font-awesome-icon icon="fa-solid fa-bars" />
            <span class="config-title-icon">{{ item.title }}</span>
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-bars" />
          </div>
        </div>
        <template v-if="item.children && item.children.length > 0">
          <div
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            class="config-child"
          >
            <div>{{ child.title }}</div>
          </div>
        </template>
      </div>
    </template>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const configMenu = [
      { title: '模板管理', icon: '' },
      {
        title: '视频管理',
        children: [{ title: '视频监控' }, { title: '视频统计' }],
        icon: ''
      },
      { title: '系统管理', icon: '' }
    ]
    return { configMenu }
  }
})
</script>

<style scoped>
.panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: grey;
  padding: 10px 0;
  font-size: 12px;
}
.config-menu-item {
  width: 100%;
}
.config-menu-title {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid #e5e5e5;
}
.config-child {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
}
.config-title-icon {
  padding-left: 4px;
}
.config-title-icon:hover {
  color: #428bca;
  cursor: pointer;
}
</style>

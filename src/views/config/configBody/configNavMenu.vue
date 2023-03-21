<template>
  <div class="panel">
    <template v-for="(item, index) in configMenu" :key="index">
      <div class="config-menu-item" @click="clickFolder(item)">
        <div class="config-menu-title">
          <div>
            <font-awesome-icon icon="fa-solid fa-bars" />
            <span class="config-title-icon">{{ item.title }}</span>
          </div>
          <!-- 文件夹展开收起的图标 -->
          <div
            v-show="item.children && item.children.length > 0"
            :class="{
              'child-active': item.children && item.children.length > 0
            }"
          >
            <font-awesome-icon
              icon="fa-solid fa-folder"
              @click="clickFolder(item)"
              v-if="!item.isFolder"
            />
            <font-awesome-icon
              icon="fa-solid fa-folder-open"
              @click="clickFolder(item)"
              v-else
            />
          </div>
        </div>
        <!-- 子文件 -->
        <template
          v-if="item.children && item.children.length > 0 && item.isFolder"
        >
          <div
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            class="config-child"
          >
            <div class="config-menu-title">{{ child.title }}</div>
          </div>
        </template>
      </div>
    </template>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue'
export default defineComponent({
  setup() {
    let isFolder: Ref<boolean> = ref(true)
    const configMenu = reactive([
      { title: '模板管理', icon: '', isFolder: false },
      {
        title: '视频管理',
        children: [{ title: '视频监控' }, { title: '视频统计' }],
        icon: '',
        isFolder: false
      },
      { title: '系统管理', icon: '', isFolder: false }
    ])
    const clickFolder = function (item: any) {
      for (var configItem of configMenu) {
        if (configItem.title === item.title) {
          configItem.isFolder = !configItem.isFolder
        }
      }
    }
    return { configMenu, clickFolder, isFolder }
  }
})
</script>

<style scoped>
.panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  padding: 10px 0;
  font-size: 14px;
}
.config-menu-item {
  width: 100%;
}
.config-menu-item :hover {
  cursor: pointer;
}
.config-menu-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 10px 10px 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
}
.child-active {
  width: 30px;
}
.config-child {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  padding-left: 20px;
}
.config-title-icon {
  padding-left: 4px;
}
.config-title-icon:hover {
  color: #428bca;
  cursor: pointer;
}
</style>

<template>
  <div class="map-panel">
    <div class="search-header">
      <div class="search-panel-form">
        <el-input
          v-model="input1"
          class="w-50 m-2"
          placeholder="检索地图模板"
        />
      </div>
      <div class="new-template">
        <el-button type="primary">新建</el-button>
      </div>
    </div>
    <div class="template-body">
      <template v-for="(item, index) in mapTemplates" :key="index">
        <mapTemplate></mapTemplate>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import mapTemplate from './mapTemplate.vue'
export default defineComponent({
  components: {
    mapTemplate
  },
  setup() {
    const input1 = ''
    const mapTemplates = [1, 2, 3, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
    return { input1, mapTemplates }
  }
})
</script>

<style scoped>
.map-panel {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.search-header {
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-panel-form {
  margin-right: 20px;
}
.template-body {
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 93%;
  padding: 10px 30px;
}
</style>

<template>
  <div class="file-import-container">
      <div class="operate-buttons">
        <el-button type="primary" @click="importFile" size="small">导入</el-button>
        <el-button type="warning" @click="exportFile" size="small">导出</el-button>
        <el-button type="success" @click="clearBlocks" size="small">清空</el-button>
      </div>
      <div class="operate-divider"></div>
      <div class="block-list-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  setup() {

    function importFile(){
      console.log('导入')
    }
    function exportFile() {
      console.log('导出')
    }
    function clearBlocks() {
      console.log('清空')
    }
    return {importFile,exportFile,clearBlocks}
  }
})
</script>

<style lang="less">
.file-import-container {
  width: 100%;
  height: 100%;
  .operate-buttons {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
    box-sizing: border-box;
  }
  .operate-divider {
    width: 90%;
    height: 1px;
    padding:0 2px;
    background: var(--color-primary);
  }
  .block-list-container {
    width: 100%;
    height: calc(100% - 51px);
  }
}
</style>

<template>
  <div class="file-import-container">
      <div class="operate-buttons">
        <el-button size="small" type="primary" class="file-button" @click="uploadFile">导入</el-button>
        <el-upload
        ref = "uploadInput"
        v-show = "false"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
  >
  </el-upload>
        <el-button type="warning" @click="exportFile" size="small" class="file-button">导出</el-button>
        <el-button type="success" @click="clearBlocks" size="small" class="file-button">清空</el-button>
      </div>
      <div class="operate-divider"></div>
      <div class="block-list-container"></div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, getCurrentInstance } from 'vue'
export default defineComponent({
  setup() {
    let instance = getCurrentInstance()
    let state = reactive({
      featureList: []
    })

    function handlePreview(file) {

      console.log('导入',file)
    }
    function uploadFile() {
      if (instance && instance.ctx) {
        const inputDom = instance.ctx.$refs.uploadInput
        console.log(inputDom)

        // inputDom.dispatchEvent(new MouseEvent('click'))
      }
    }
    function exportFile() {
      console.log('导出')
    }
    function clearBlocks() {
      console.log('清空')
    }
    return {handlePreview,exportFile,clearBlocks,uploadFile}
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

    .file-button {
      margin-left: 8px;
    }
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

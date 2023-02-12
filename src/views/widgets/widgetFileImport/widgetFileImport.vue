<template>
  <div class="file-import-container">
      <div class="operate-buttons">
        <el-button size="small" type="primary" class="file-button" @click="uploadFile">导入</el-button>
        <input type="file" style="display: none;" ref="uploadInput" @change="handlePreview">
        <!-- <el-upload
        ref = "uploadInput"
        v-show = "false"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
  >
  </el-upload> -->
        <el-button type="success" @click="exportFile" size="small" class="file-button">导出</el-button>
        <el-button type="warning" @click="clearBlocks" size="small" class="file-button">清空</el-button>
      </div>
      <div class="operate-divider"></div>
      <div class="block-list-container"></div>
  </div>
  <div>
    <el-dialog
        v-model="dialogVisible"
        title="选择导出格式"
        width="300px"
        height="600px"
      >
      <div class="format-wrapper">
        <span class="select-label">选择格式：</span>
       <el-select v-model="exportFormat" @change="changeFormat"  placeholder="导出格式" size="small" class="select-container">
        <el-option
            v-for="(item, index) in exportFormats"
            :key="index"
            :label="item"
            :value="item"/>
            {{ item }}
        </el-select>
      </div>
      <div class="export-button">
        <el-button type="primary" @click = "exportConfirm" size="small">确定导出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, reactive, getCurrentInstance } from 'vue'
export default defineComponent({
  setup() {
    const exportFormats=[
        'txt',
        'shp',
        'geojson',
        'dwg'
      ]
    let instance = getCurrentInstance()
    const exportFormat = ref('')
    let state = reactive({
      featureList: [],
      dialogVisible: false
    })

    function handlePreview() {
      const file = instance.ctx.$refs.uploadInput.files
      console.log('导入',file)
    }
    function uploadFile() {
      if (instance && instance.ctx) {
        const inputDom = instance.ctx.$refs.uploadInput
        var evt = document.createEvent('MouseEvents')
        evt.initEvent('click', false, false);
        inputDom.dispatchEvent(evt)
      }
    }
    function changeFormat (format) {
      exportFormat.value = format
      debugger

    }
    function exportFile() {
      state.dialogVisible = true
    }
    function exportConfirm () {
      const data = {
        format: exportFormat.value,
        GeoJSON: ''
      }
    }
    function clearBlocks() {
      console.log('清空')
    }
    return {handlePreview,
            exportFile,
            clearBlocks,
            uploadFile,
            changeFormat,
            ...toRefs(state),
            exportFormats,
            exportConfirm
          }
  }
})
</script>

<style lang="less" scoped>
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
.format-wrapper {
  display: flex;
  align-items: center;
  .select-label {
    display: inline-block;
    width: 40%;
  }
  .select-container {

  }
}
::v-deep .el-dialog__body {
  padding: 8px;
}
::v-deep .el-dialog__header {
  font-size: 12px;
}
.export-button {
  display: flex;
  justify-content: center;
  right: 8px;
  margin-top: 8px;
}
</style>

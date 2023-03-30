<template>
  <common-analysis-header></common-analysis-header>
  <ExoportData :dialogVisible="dialogVisible" :exportData="exportData" @closeDialog="closeExportCom"/>
</template>

<script>
import ExoportData from '@/views/common/ExportData.vue'
import CommonAnalysisHeader from '@/views/common/CommonAnalysisHeader.vue'
import { defineComponent, ref, toRefs, reactive, getCurrentInstance } from 'vue'
export default defineComponent({
  components: {
    ExoportData,
    CommonAnalysisHeader
  },
  setup() {
    let instance = getCurrentInstance()
    let L = instance.appContext.config.globalProperties.$L
    let map = instance.appContext.config.globalProperties.$map
    const exportFormat = ref('')
    const style = ref({
      color: '#ff0000',
      weight: 3,
      opacity: 1,
      fillOpacity: 0.5
    })
    let state = reactive({
      exoportData:{},
      dialogVisible: false
    })
    function closeExportCom () {
      state.dialogVisible = false
    }
    return {
      ...toRefs(state),
      exportFormat,
      style
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
    height: calc(100% - 151px);
    overflow: auto;
    .geometry-item {
      width: 90%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 8px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--color-primary);
      .item-title {
        font-size: 12px;
        color: var(--color-primary);
      }
      .item-icons {
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: 20px;
          height: 20px;
          margin-left: 5px;
          cursor: pointer;
          &.icon-location {
            color: var(--color-primary);
          }
          &.icon-export {
            color: var(--color-success);
          }
          &.icon-delete {
            color: var(--color-danger);
          }
        }
      }
    }
    .geometry-item:hover {
        background: var(--color-primary);
        cursor: pointer;
        .item-title {
          color: var(--color-white);
        }
      }
  }
  .import-info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    height: 100px;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    span {
      display: inline-block;
    }
  }
  .attribute-table {
    display: flex;
    position: absolute;
    // top: 100px;
  }
}
</style>

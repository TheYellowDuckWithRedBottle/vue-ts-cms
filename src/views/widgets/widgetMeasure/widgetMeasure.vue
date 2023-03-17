<template>
  <common-analysis-header></common-analysis-header>
  <ExoportData :dialogVisible="dialogVisible" :exportData="exportData" @closeDialog="closeExportCom"/>
</template>

<script>
import { defineComponent, toRefs, getCurrentInstance, reactive } from 'vue'
import ExoportData from '@/views/common/ExportData.vue'
import CommonAnalysisHeader from '@/views/common/CommonAnalysisHeader.vue'
export default defineComponent({
  components: {
    CommonAnalysisHeader,
    ExoportData
  },
  setup() {
    let instance = getCurrentInstance()
    let L = {}
    let map = {}
    let state = {}
    if(instance !== null) {
      console.log(instance.appContext.config.globalProperties.$map)
      L = instance.appContext.config.globalProperties.$L
      map = instance.appContext.config.globalProperties.$map
    }
    return { ...toRefs(state),
            }
  }
})
</script>

<style lang="less">
.measure-container{
  width: 100%;
  height: 100%;
}
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
    .geometry-item {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 8px;
      margin: 4px 8px;
      border: 1px solid var(--color-primary);
      border-radius: 6px;
    }
  }
  .icon {
    padding-right: 4px;
  }
</style>

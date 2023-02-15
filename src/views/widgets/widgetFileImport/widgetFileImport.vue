<template>
  <div class="file-import-container">
      <div class="operate-buttons">
        <el-button size="small" type="primary" class="file-button" @click="uploadFile">导入</el-button>
        <input type="file" style="display: none;" ref="uploadInput" @change="handlePreview">
        <el-button type="success" @click="exportFile" size="small" class="file-button">导出</el-button>
        <el-button type="warning" @click="clearBlocks" size="small" class="file-button">清空</el-button>
      </div>
      <div class="operate-divider"></div>
      <div class="block-list-container">
        <div v-for="(item, index) in featureList" :key="index"
          class="geometry-item"
          @click="loacateBlock(item.geoJson)">
          <span class="item-title">{{ item.title }}</span>
          <font-awesome-icon icon="fa-solid fa-file-export" class="icon" @click="exportFile(item)"/>
        </div>
      </div>
  </div>
  <ExoportData :dialogVisible="dialogVisible" :exportData="exportData" @closeDialog="closeExportCom"/>
</template>

<script>
import shpjs from 'shpjs'
import turfCenter from '@turf/center'
import { ElMessage } from 'element-plus'
import ExoportData from '@/views/common/ExportData.vue'
import { defineComponent, ref, toRefs, reactive, getCurrentInstance } from 'vue'
export default defineComponent({
  components: {
    ExoportData
  },
  setup() {
    let instance = getCurrentInstance()
    let L = instance.appContext.config.globalProperties.$L
    let map = instance.appContext.config.globalProperties.$map
    const exportFormat = ref('')
    let state = reactive({
      featureList: [],
      dialogVisible: false,
      exportData: {}
    })
    // ======= 闪烁定位地块 =======
    function flashBlockOnce(geoJson) {
      const layer = L.geoJSON(geoJson).addTo(map);
      layer.setStyle({
        color: '#ff0000',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.5
      })
     setTimeout(() => {
        map.removeLayer(layer)
      }, 100)
    }
    function flashBlock (geoJson) {
      let intervalTag = 0
      setInterval(() => {
        if(intervalTag === 3) {
          clearInterval(intervalTag)
          return
        }
        intervalTag++
        flashBlockOnce(geoJson)
      }, 300)
    }
    function loacateBlock(geoJson) {
      flashBlock(geoJson)
      const center = turfCenter(geoJson)
      const latlng = center.geometry.coordinates.reverse()
      map.setView(latlng, 16)
    }
    // ======= 导入地块 =======
    function handlePreview() {
      const file = instance.ctx.$refs.uploadInput.files
      let reader = new FileReader()
      reader.readAsArrayBuffer(file[0])
      reader.onload  = function (e) {
        let res = e.target.result
        try {
          shpjs.parseZip(res).then((parsedResult) => {
          console.log(parsedResult)
          if(parsedResult.type === 'FeatureCollection') {
            debugger
            loacateBlock(parsedResult)
            const layers = []
            for(const index in parsedResult.features) {
              const geoJson = parsedResult.features[index]
              const resultItem = {
                title: '图斑'+index,
                type: geoJson.type,
                properties: geoJson.properties,
                geoJson: geoJson
              }
              state.featureList.push(resultItem)
              const layer = L.geoJSON(geoJson)
              layers.push(layer)
            }
            if(layers.length > 0) {
              const layerGroup = L.layerGroup(layers)
              console.log(layerGroup)
              map.addLayer(layerGroup)
            }
          }
        })
        } catch (error) {
          ElMessage({
          message: error,
          type: 'error'
        })
        }
      }
    }
    function uploadFile() {
      if (instance && instance.ctx) {
        const inputDom = instance.ctx.$refs.uploadInput
        var evt = document.createEvent('MouseEvents')
        evt.initEvent('click', false, false);
        inputDom.dispatchEvent(evt)
      }
    }
    // ======= 导出地块 =======
    function exportFile(item) {
      if (state.featureList.length === 0) {
        ElMessage({
          message: '当前没有导入的地块',
          type: 'warning'
        })
        return
      }
      if (item && item.geoJson) {
        state.exportData = item.geoJson
      } else {
        state.exportData = state.featureList
      }
      state.dialogVisible = true
    }
    // ======= 清空地块 =======
    function clearBlocks() {
      if (state.featureList.length === 0) {
        ElMessage({
          message: '当前没有导入的地块',
          type: 'warning'
        })
        return
      }
      state.featureList = []
      map.eachLayer((layer) => {
        if(layer instanceof L.LayerGroup) {
          map.removeLayer(layer)
        }
      })
    }
    function exportConfirm () {
      const data = {
        format: exportFormat.value,
        GeoJSON: ''
      }
    }
    function closeExportCom() {
      state.dialogVisible = false
    }

    return {handlePreview,
            exportFile,
            clearBlocks,
            uploadFile,
            loacateBlock,
            ...toRefs(state),
            exportConfirm,
            closeExportCom
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
    }
    .geometry-item:hover {
        background: var(--color-primary);
        cursor: pointer;
        .item-title {
          color: var(--color-white);
        }
      }
  }
}

</style>

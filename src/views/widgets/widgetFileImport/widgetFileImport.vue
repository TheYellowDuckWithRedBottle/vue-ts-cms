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
        <div v-for="(item, index) in featureList" :key="index" @click="loacateBlock(item.geoJson)">
          {{ item.title }}
        </div>
      </div>
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
import shpjs from 'shpjs'
import turfCenter from '@turf/center'
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
    let L = instance.appContext.config.globalProperties.$L
    let map = instance.appContext.config.globalProperties.$map
    const exportFormat = ref('')
    let state = reactive({
      featureList: [],
      dialogVisible: false
    })
    // 让图斑闪烁多次
    // function flashBlock(geoJson) {
    //   const layer = L.geoJSON(geoJson).addTo(map);
    //   layer.setStyle({
    //     color: '#ff0000',
    //     weight: 3,
    //     opacity: 1,
    //     fillOpacity: 0.5
    //   })
    //   setTimeout(() => {
    //     map.removeLayer(layer)
    //   }, 100)
    // }
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
    function handlePreview() {
      const file = instance.ctx.$refs.uploadInput.files
      console.log('导入',file)
      let reader = new FileReader()
      reader.readAsArrayBuffer(file[0])
      reader.onload  = function (e) {
        let res = e.target.result
        console.log(res)
        shpjs.parseZip(res).then((parsedResult) => {
          console.log(parsedResult)
          if(parsedResult.type === 'FeatureCollection') {
            debugger
            loacateBlock(parsedResult)
            for(const index in parsedResult.features) {
              const geoJson = parsedResult.features[index]
              const resultItem = {
                title: '图斑'+index,
                type: geoJson.type,
                properties: geoJson.properties,
                geoJson: geoJson
              }
              state.featureList.push(resultItem)
              L.geoJSON(geoJson).addTo(map);
            }
          }
        })
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
            loacateBlock,
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
    overflow: auto;
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

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
          <div class="item-icons">
            <font-awesome-icon icon="fa-solid fa-circle-info" class="icon" @click.stop="viewAttribtues(item)"/>
            <font-awesome-icon icon="fa-solid fa-file-export" class="icon" @click="exportFile(item)"/>
          </div>
        </div>
      </div>
      <!-- 地块信息 -->
      <div class="import-info-container">
        <span>地块面积：{{ statisticInfo.area }} 平方米</span>
        <span>地块个数：{{ statisticInfo.amount }} 个</span>
      </div>
      <!-- 弹出的属性表信息 -->
      <div class="attribute-table" v-show="false" ref="attributeTable">
        <el-table
          :data="tableData"
          border
          size="mini"
          style="width: 100%;height: 300px; overflow:auto;">
          <el-table-column prop="field" label="属性名" width="120" />
          <el-table-column prop="value" label="属性值" width="200" />
        </el-table>
      </div>
  </div>
  <ExoportData :dialogVisible="dialogVisible" :exportData="exportData" @closeDialog="closeExportCom"/>
</template>

<script>
import shpjs from 'shpjs'
import turfCenter from '@turf/center'
import turfArea from '@turf/area'
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
    const style = ref({
      color: '#ff0000',
      weight: 3,
      opacity: 1,
      fillOpacity: 0.5
    })
    let state = reactive({
      featureList: [],
      dialogVisible: false, // 导出数据弹窗
      showAttributes: false, // 是否展示属性
      locatedBlock: null, // 定位的地块
      tableData: [], // 属性表数据
      exportData: {}, // 导出的数据
      tableLayer: null, // 属性表图层
      statisticInfo: {
        area: 0,
        amount: 0
      }
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
      // 1.闪烁
      flashBlock(geoJson)
      // 2.变颜色
      if(state.locatedBlock) {
            map.removeLayer(state.locatedBlock)
          }
      state.locatedBlock = L.geoJSON(geoJson).addTo(map)
      state.locatedBlock.setStyle(style.value)
      // 3.定位到中心点
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
          state.statisticInfo.area += turfArea(parsedResult)
          state.statisticInfo.area =  state.statisticInfo.area.toFixed(2)
          state.statisticInfo.amount += parsedResult.features.length
          if(parsedResult.type === 'FeatureCollection') {
            loacateBlock(parsedResult)
            // 合成图层组
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
    // ======= 查看属性 =======
    function viewAttribtues(item) {
      // 填充属性表
      state.showAttributes = true
      if(item.properties){
        state.tableData = []
        for(const key in item.properties) {
          state.tableData.push({
            field: key,
            value: item.properties[key]
          })
        }
      }
      loacateBlock(item.geoJson)
      //获取弹出位置
      const center = turfCenter(item.geoJson)
      const latlng = center.geometry.coordinates.reverse()
      // 获取属性表dom
      const dom = instance.ctx.$refs.attributeTable
      state.tableLayer = L.popup().setLatLng(latlng).setContent(dom).openOn(map)
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
      // 如果导出数据弹窗打开，就关闭
      state.dialogVisible = false
      // 如果属性表弹窗打开，就关闭
      if(state.tableLayer) {
        map.removeLayer(state.tableLayer)
      }
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
            viewAttribtues,
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

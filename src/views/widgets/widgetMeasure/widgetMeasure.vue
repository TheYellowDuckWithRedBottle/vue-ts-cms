<template>
  <div class="measure-container">
    <!-- 上方操作按钮 -->
    <div class="operate-buttons">
        <el-button type="primary" @click="measuerLength" size="small">长度</el-button>
        <el-button type="primary" @click="measureArea" size="small">面积</el-button>
        <el-button type="warning" @click="clearResultList" size="small">清除</el-button>
      </div>
      <!-- 分割线 -->
      <div class="operate-divider"></div>
      <!-- 地块列表 -->
      <div class="block-list-container">
        <div v-for="(item, index) in resultList" :key = "index" class="geometry-item">
          <div>
            <font-awesome-icon icon="fa-solid fa-draw-polygon" class="icon" v-if="item.type === 'polygon'" />
            <font-awesome-icon icon="fa-solid fa-grip-lines" class="icon"  v-else/>
            <span>{{  item.info }}</span>
          </div>
          <div>
              <font-awesome-icon icon="fa-solid fa-file-export" class="icon" @click="exportBlock(item)"/>
              <font-awesome-icon icon="fa-solid fa-trash" class="icon" @click="clearBlock(item)"/>
          </div>
        </div>
      </div>
  </div>
  <ExoportData :dialogVisible="dialogVisible" :exportData="exportData" @closeDialog="closeExportCom"/>
</template>

<script>
import { defineComponent, toRefs, getCurrentInstance, reactive } from 'vue'
import turfArea from '@turf/area'
import turfCenter from '@turf/center'
import {point} from '@turf/helpers'
import { ElMessage } from 'element-plus'
import ExoportData from '@/views/common/ExportData.vue'
export default defineComponent({
  components: {
    ExoportData
  },
  setup() {
    let instance = getCurrentInstance()
    let L = {}
    let map = {}
    let style = {color: '#fc6a00', fillColor: '#fc6a00', fillOpacity: 0.2}
    let state = reactive({
      dialogVisible: false,
      exportData: {},

      points: [],
      lines: {},
      tempLines: {},
      geometry: [],
      distance: 0,

      faceTempPolygons: {},
      polygonList: {},

      resultList: []
    })

    if(instance !== null) {
      console.log(instance.appContext.config.globalProperties.$map)
      L = instance.appContext.config.globalProperties.$L
      map = instance.appContext.config.globalProperties.$map
      state.lines = new L.polyline(state.points)
      state.tempLines = new L.polyline([])
    }
    function closeExportCom () {
      state.dialogVisible = false
    }

    // ===== 测量长度 =========
    function measuerLength () {
      changeMouseStyle("crosshair")
      state.lines = new L.polyline(state.points)
      map.on('click', onClickLength)
      map.on('dblclick',onDoubleClick)
    }
    function onClickLength (e) {
      const newPoint = [e.latlng.lat, e.latlng.lng]
      state.points.push(newPoint)
      if (state.points.length > 1) {
        const currentDistance = map.distance(state.points[state.points.length -2], newPoint)
        state.distance += currentDistance
        console.log(state.distance)
      }
      state.lines.addLatLng(e.latlng)
      map.addLayer(state.lines)
      map.on('mousemove', onMove)
    }
    function onMove (e) {
      if(state.points.length > 0) {
        const lastPoint = state.points[state.points.length -1]
        const newPoint = [e.latlng.lat, e.latlng.lng]
        let ls = [lastPoint,newPoint]
        state.tempLines.setLatLngs(ls)
        map.addLayer(state.tempLines)
      }
    }
    function onDoubleClick (e) {
      const tempGeometry = L.polyline(state.points).addTo(map)
      state.resultList.push({
        type: 'polyline',
        geometry: tempGeometry,
        info: (state.distance).toFixed(2) + '米'
      })
      state.distance = 0
      state.points = []
      state.lines.remove()
      map.off('click', onClickLength)
      map.off('mousemove', onMove)
      map.off('dblclick',onDoubleClick)
      changeMouseStyle("pointer")
      state.tempLines.remove()
    }
    function exportAllBlocks () {
      debugger
    }
    // 导出单个地块
    function exportBlock (resultItem) {
      state.dialogVisible = true
      console.log(resultItem.geometry.toGeoJSON())
      state.exportData = resultItem.geometry.toGeoJSON()
    }
    // 改变鼠标样式
    function changeMouseStyle (style) {
      const mapContainer = document.getElementById('map')
      mapContainer.style.cursor = style
    }
    // 清除单个地块
    function clearBlock (block) {
      const index = state.resultList.findIndex(item => {
        return item === block
      })
      if (index > -1) {
        map.removeLayer(state.resultList[index].geometry)
        state.resultList.splice(index, 1)
      }
    }
    // 清除所有地块
    function clearResultList () {
      if(state.resultList.length === 0) {
        ElMessage({
          message: '当前没有可以清楚的图形',
          type: 'warning'
        })
      }
      for (const item of state.resultList) {
        if (item.geometry) {
          map.removeLayer(item.geometry)
        }
      }
      state.resultList = []
    }
    // ====== 测量面积 ==========
    function calcArea (polygon) {
      return turfArea(polygon.toGeoJSON()).toFixed(2)
    }
    // ====== 计算中心点 =====
    function calcCenter (polygon) {
      return turfCenter(polygon.toGeoJSON())
    }
    /**
     *
     * @param {*} point geojson格式或者Point
     * @param {*} text 添加的注记
     */
    function addMarker (pointParams, text) {
      if(pointParams instanceof L.LatLng) {
        pointParams = point([pointParams.lng,pointParams.lat]);
      }
      L.geoJSON(pointParams, {
        pointToLayer: function (geojsonPoint, latlng) {
          // return L.marker(latlng).addTo(map)
          map.openPopup(text, latlng)
          // return L.popup().setLatLng(latlng).setContent(area).openOn(map)
        }
      })
    }
    function measureArea () {
      changeMouseStyle('crosshair')
      map.on('click', e => {
        state.points.push([e.latlng.lat, e.latlng.lng])
      })
      map.on('mousemove', e => {
        if (state.points.length > 0) {
          if (state.faceTempPolygons != null || state.faceTempPolygons != undefined) {
            map.removeLayer(state.faceTempPolygons)
          }
          const tempPoints = state.points.concat(e.latlng)
          state.faceTempPolygons = new L.polygon(tempPoints,style)
          map.addLayer(state.faceTempPolygons)
        }
      })
      map.on('dblclick', e => {
        if (state.faceTempPolygons != null || state.faceTempPolygons != undefined) {
          map.removeLayer(state.faceTempPolygons)
        }
        state.polygonList = L.polygon([state.points], style).addTo(map)
        const area = calcArea(state.polygonList)
        const center = calcCenter(state.polygonList)
        addMarker(center,area)
        state.resultList.push (
          {
            type: 'polygon',
            geometry: state.polygonList,
            info: area + '平方米'
          }
        )
        map.addLayer(state.polygonList)
        state.points = []
        map.off('click')
        map.off('mousemove')
        map.off('dblclick')
        changeMouseStyle('pointer')
      })
    }
    return { ...toRefs(state),
            closeExportCom,
            measuerLength,
            measureArea,
            exportBlock,
            exportAllBlocks,
            clearBlock,
            clearResultList}
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

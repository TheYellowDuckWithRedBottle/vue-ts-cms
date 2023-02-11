<template>
  <div class="measure-container">
    <div class="operate-buttons">
        <el-button type="primary" @click="measuerLength" size="small">长度</el-button>
        <el-button type="primary" @click="measureArea" size="small">面积</el-button>
        <el-button type="primary" @click="clearResultList" size="small">清除</el-button>
      </div>
      <div class="operate-divider"></div>
      <div class="block-list-container">
        <div v-for="(item, index) in resultList" :key = index @click = 'exportData(item)' class="geometry-item">
          <font-awesome-icon icon="fa-solid fa-draw-polygon" v-if="item.type === 'polygon'" />
          <font-awesome-icon icon="fa-solid fa-grip-lines"  v-else/>
            <span>{{  item.info }}</span>
          <font-awesome-icon icon="fa-solid fa-file-export" />
        </div>
      </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, getCurrentInstance, reactive } from 'vue'
export default defineComponent({
  setup() {
    let instance = getCurrentInstance()
    let L = {}
    let map = {}
    let style = {color: '#fc6a00', fillColor: '#fc6a00', fillOpacity: 0.2}
    let state = reactive({
      points: [],
      lines: {},
      lineArray: [],
      tempLines: {},
      geometry: [],
      distance: 0,

      facePolygonList: [],
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
    function onClickLength (e) {
      const newPoint = [e.latlng.lat, e.latlng.lng]
      debugger
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
      console.log(e)
      const tempGeometry = L.polyline(state.points).addTo(map)
      state.geometry.push(tempGeometry)
      state.resultList.push({
        type: 'polyline',
        geometry: tempGeometry,
        info: (state.distance).toFixed(2)
      })
      state.distance = 0
      state.points = []
      state.lines.remove()
      map.off('click', onClickLength)
      map.off('mousermove', onMove)
      map.off('dblclick')
      changeMouseStyle("pointer")
      state.tempLines.remove()
      console.log(state.geometry)
    }

    function exportData (resultItem) {
      console.log(resultItem.geometry.toGeoJSON())
    }
    function measuerLength () {
      changeMouseStyle("crosshair")
      state.lines = new L.polyline(state.points)
      map.on('click', onClickLength)
      map.on('dblclick',onDoubleClick)
    }
    function changeMouseStyle (style) {
      const mapContainer = document.getElementById('map')
      mapContainer.style.cursor = style
    }
    function clearResultList () {
      state.resultList = []
    }
    function measureArea () {
      changeMouseStyle('crosshair')
      state.lines = L.polyline([], style)
      state.tempLines = L.polyline([], style)
      map.addLayer(state.lines)
      map.addLayer(state.tempLines)
      map.on('click', e => {
        state.points.push([e.latlng.lat, e.latlng.lng])
        state.lines.addLatLng(e.latlng)
        map.addLayer(state.lines)
      })
      map.on('mousemove', e => {
        if (state.points.length > 0) {
          state.tempLines.setLatLngs([state.points[state.points.length -1],[e.latlng.lat, e.latlng.lng]])
          // map.addLayer(state.tempLines)
          if (state.faceTempPolygons != null || state.faceTempPolygons != undefined) {
            map.removeLayer(state.faceTempPolygons)
          }
          const tempPoints = state.points.concat(e.latlng)
          state.faceTempPolygons = new L.polygon(tempPoints,style)
          map.addLayer(state.faceTempPolygons)
        }
      })
      map.on('dblclick', e => {
        state.polygonList = L.polygon([state.points], style).addTo(map)
        if (state.faceTempPolygons != null || state.faceTempPolygons != undefined) {
          map.removeLayer(state.faceTempPolygons)
        }
        state.resultList.push (
          {
            type: 'polygon',
            geometry: state.polygonList,
            info: 0
          }
        )
        map.addLayer(state.polygonList)
        state.facePolygonList.push(state.polygonList)
        state.points = []
        map.off('click')
        map.off('dblclick')
        map.off('move')
        changeMouseStyle('pointer')
      })
    }
    return {measuerLength, measureArea, ...toRefs(state),exportData,clearResultList}
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
      width: 100%;
      height: 30px;
      display: flex;
    }
  }
</style>

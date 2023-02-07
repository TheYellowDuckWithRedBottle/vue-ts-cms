<template>
  <div class="measure-container">
    <div class="operate-buttons">
        <el-button type="primary" @click="measuerLength" size="small">长度</el-button>
        <el-button type="primary" @click="measureArea" size="small">面积</el-button>
      </div>
      <div class="operate-divider"></div>
      <div class="block-list-container">
        <div v-for="(item, index) in resultList" :key = index>
           地块信息{{ item.info }}
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
    let state = reactive({
      points: [],
      lines: {},
      lineArray: [],
      tempLines: {},
      geometry: [],
      distance: 0,
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
    function onDoubleClick (e) {
      console.log(e)
      const tempGeometry = L.polyline(state.points).addTo(map)
      state.geometry.push(tempGeometry)
      state.resultList.push({
        geometry: tempGeometry,
        info: (state.distance).toFixed(2)
      })
      state.distance = 0
      state.points = []
      state.lines.remove()
      map.off('mousemove')
      map.off('click', onClickLength)
      map.off('mousermove', onMove)
      changeMouseStyle("pointer")
      state.tempLines.remove()
      console.log(state.geometry)
    }
    function onMove (e) {
      if(state.points.length > 0) {
        const lastPoint = state.points[state.points.length -1]
        const newPoint = [e.latlng.lat, e.latlng.lng]
        let ls = [lastPoint,newPoint]
        state.tempLines.setLatLngs(ls)
        // const distance =  map.distance(lastPoint,newPoint)
        // console.log(distance)
        map.addLayer(state.tempLines)
      }
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
    function onClickArea (e) {
      console.log(e)
      const newPoint = [e.latlng.lat, e.latlng.lng]
      state.points.push(newPoint)
      state.lines.addLatLng(e.latlng)
      map.addLayer(state.lines)
      map.on('mousemove', onMove)
    }
    function measureArea () {
      console.log('测量面积')
      const mapContainer = document.getElementById('map')
      mapContainer.style.cursor = "crosshair"
      const body = document.querySelector('body')
      body.style.cursor = 'crosshair'
      map.on('click', onClickArea)
      map.on('dblclick',onDoubleClick)
    }
    return {measuerLength, measureArea, ...toRefs(state)}
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
  }
</style>

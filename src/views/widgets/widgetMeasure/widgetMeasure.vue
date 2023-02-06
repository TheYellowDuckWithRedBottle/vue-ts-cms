<template>
  <div class="measure-container">
    <div class="operate-buttons">
        <el-button type="primary" @click="measuerLength" size="small">长度</el-button>
        <el-button type="primary" @click="measureArea" size="small">面积</el-button>
      </div>
      <div class="operate-divider"></div>
      <div class="block-list-container"></div>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, reactive } from 'vue'
export default defineComponent({
  setup() {
    let instance = getCurrentInstance()
    let L = {}
    let map = {}
    let state = reactive({
      points: [],
      lines: {},
      tempLines: {},
      geometry: []
    })

    if(instance !== null) {
      console.log(instance.appContext.config.globalProperties.$map)
      L = instance.appContext.config.globalProperties.$L
      map = instance.appContext.config.globalProperties.$map
      console.log(L,map)
      state.lines = new L.polyline(state.points)
      state.tempLines = new L.polyline([])

    }
    function onClickLength (e) {
      const newPoint = [e.latlng.lat, e.latlng.lng]
      debugger
      state.points.push(newPoint)
      state.lines.addLatLng(e.latlng)
      map.addLayer(state.lines)
      map.on('mousemove', onMove)
    }
    function onDoubleClick (e) {
      console.log(e)
      state.geometry.push(L.polyline(state.points).addTo(map))
      state.points = []
      state.lines.remove()
      map.off('mousemove')
      map.off('click', onClickLength)
      map.off('mousermove', onMove)
      const body = document.querySelector('body')
      body.style.cursor = 'pointer'
      const mapContainer = document.getElementById('map')
      mapContainer.style.cursor = "pointer"
      state.tempLines.remove()
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

    function measuerLength () {
      console.log('测量长度')
      const mapContainer = document.getElementById('map')
      mapContainer.style.cursor = "crosshair"
      const body = document.querySelector('body')
      body.style.cursor = 'crosshair'
      map.on('click', onClickLength)
      map.on('dblclick',onDoubleClick)
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
    return {measuerLength, measureArea}
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

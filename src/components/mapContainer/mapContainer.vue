<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, provide, ref, getCurrentInstance } from 'vue'
import L from 'leaflet'
import proj4 from 'proj4'
import 'proj4leaflet'
import {crs} from '@/global/crsDefine'
import {tranfrom,getScaleByResolution, getResolutionByScale} from '@/global/crsTransform'
import dynamicMapLayer from 'esri-leaflet/src/Layers/DynamicMapLayer'
import 'leaflet/dist/leaflet.css'


export default defineComponent({
  props: {
    collapse: {
      default: true,
      type: Boolean
    }
  },
  setup() {
    onMounted(() => {
      const scale = getScaleByResolution(305.40584370960335)
      const resolution = getResolutionByScale(50000)
      const instance = getCurrentInstance()
      positionControl()
      var map = L.map('map', {
        crs: crs.EPSG4528,
        attributionControl: false,
        zoomControl: false
      }).setView([32, 120.84], 16)
      var zoomControl = L.control.zoom({ position: 'bottomright' })
      var scaleControl = L.control.scale({ metric: true, imperial: false })
      var pos = L.control.pos({ position: 'bottomleft' })
      instance.appContext.config.globalProperties.$map =  map
      instance.appContext.config.globalProperties.$L =  L

      // 添加位置控件,添加放大缩小控件,添加比例尺控件
      pos.addTo(map)
      map.addControl(zoomControl)
      map.addControl(scaleControl)
      // var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      // var osm = new L.TileLayer(osmUrl, {minZoom: 4, maxZoom: 18});
      // map.addLayer(osm);
      let dynamicLayer = dynamicMapLayer({
        url: 'http://localhost:6080/arcgis/rest/services/NT/LBHB/MapServer',
        opacity: 0.5
      })
      console.log(dynamicLayer)
      map.addLayer(dynamicLayer)
      // map.on('mouseover', onMapMove)
    })
    function onMapMove(e) {
      console.log(e.latlng)
    }
    // 构造显示位置的控件
    function positionControl() {
      L.Control.Pos = L.Control.extend({
        option: {
          position: 'bottomleft'
        },
        initlize: function (options) {
          L.Util.extend(this.options, options)
        },
        onAdd: function (map) {
          console.log(map)
          var className = 'leaflet-control-pos'
          this._container = L.DomUtil.create('div', className)
          map.on('mousemove', this._updatePos, this)
          return this._container
        },
        _updatePos: function (position) {
          if (position && position.latlng) {
            this._container.innerHTML =
              'X:' +
              this._numberFix(position.latlng.lat) +
              '  ' +
              'Y:' +
              this._numberFix(position.latlng.lng)
          } else {
            this._container.innerHTML = '未监听到'
          }
        },
        _numberFix: function (number) {
          return number.toFixed(4)
        }
      })
      L.control.pos = function (options) {
        return new L.Control.Pos(options)
      }
    }
    return {
      onMapMove
    }
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  z-index: 1;
}
#map {
  width: 100%;
  height: 100%;
}
.leaflet-control-pos {
  background: blue;
}
</style>

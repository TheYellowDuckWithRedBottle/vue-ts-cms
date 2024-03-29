<template>
  <div class="top-tool">
    <div class="collapse-wrap" @click="collapseMenuPanel">
      <font-awesome-icon icon="fa-solid fa-bars" />
      <!-- 靠右 -->
    </div>
    <!-- 从右往左排列工具条 -->
    <div class="tool-panel">
      <!-- 粘贴geojson -->
      <div class="copy-coord-panel" :class="{'active': showEditor}">
        <font-awesome-icon icon="fa-solid fa-copy" @click="switchPanel"  />
        <div class="editor-panel" v-if="showEditor">
          <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tabs">
          <el-tab-pane label="GeoJSON" name="geojson">
            <JsonEdit class="json-editor" v-model="geojsonData" @change ="changeGeojson"/>
          </el-tab-pane>
          <el-tab-pane label="属性表" name="attribute-table">
            <ElTable :data="geojsonProperties" border v-if="geojsonPropertiesColumns.length > 0">
              <el-table-column v-for="(item, index) in geojsonPropertiesColumns"
                :prop="item.prop"
                :label="item.label"
                :key="index"
              ></el-table-column>
            </ElTable>
            <div v-else> 无属性 </div>
          </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 城市定位 -->
      <div class="city-location-panel" :class="{'active': showCityLocation}">
        <font-awesome-icon icon="fa-solid fa-marker" @click="switchCityPanel" />
        <div class="city-locationPanel" v-if="showCityLocation">
          <div v-for="(cityItem, index) in cityList" :key="index">
            {{cityItem.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted } from 'vue'
import { reactive, ref, computed } from 'vue'
import JsonEdit from 'json-editor-vue3'
import {turfCenter, bboxPolygon} from '@turf/center'
import { ElTable } from 'element-plus'
import { GeoJSONUnionType, GeoJSONFeatureCollection } from '../../utility/geojsonFile'

export default defineComponent({
  props: {
    collapse: {
      default: true,
      type: Boolean
    }
  },
  components: {
    JsonEdit,
    ElTable
  },
  setup(props, { emit }) {
    onMounted(() => {
      // 获取cityList
      // getCityList()
    })
    let instance = getCurrentInstance()
    let L = null, map = null
    if (instance) {
      L = instance.appContext.config.globalProperties.$L
      map = instance.appContext.config.globalProperties.$map
    }

    let state = reactive({
      activeName: 'geojson'
    })
    let geojsonProperties= ref([])
    let geojsonPropertiesColumns = ref([])
    let cityList = ref([
      {
        name: '北京',
        lat: 39.9042,
        lng: 116.4074
      },
      {
        name: '上海',
        lat: 31.2304,
        lng: 121.4737
      },
      {
        name: '天津',
        lat: 39.1397,
        lng: 117.2097
      },
      {
        name: '重庆',
        lat: 29.5596,
        lng: 106.5507
      },
      {
        name: '深圳',
        lat: 22.5431,
        lng: 114.0574
      },
      {
        name: '广州',
        lat: 23.1291,
        lng: 113.2643
    },
      {
        name: '杭州',
        lat: 30.2675,
        lng: 120.1972
      },
      {
        name: '南京',
        lat: 31.8909,
        lng: 118.7861
      },
      {
        name: '苏州',
        lat: 31.3204,
        lng: 120.6179
      },
      {
        name: '成都',
        lat: 30.6596,
        lng: 104.0649
      },
      {
        name: '西安',
        lat: 34.2649,
        lng: 108.9481
    }
    ])
    let showEditor = ref(false)
    let showCityLocation = ref(false)
    function getCityList () {
      let url = '/api/city'
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          cityList.value = data
        })
    }
    function getJsonProperties (geojsonData) {
      if (geojsonData && geojsonData.features && geojsonData.features.length > 0) {
        return geojsonData.features.map((feature) => {
          return feature.properties
        })
      } else if (geojsonData && geojsonData.properties){
        return [geojsonData.properties]
      } else
        return []
    }
    function getJsonPropertiesColumn (properties) {
      if (properties && properties.length > 0) {
         let keys = Object.keys(properties[0])
         let columns = keys.map((key) => {
           return {
             prop: key,
             label: key
           }
         })
         return columns
      } else {
        return []
      }
    }
    function collapseMenuPanel() {
      emit('collapse', true)
    }
    function switchPanel () {
      showEditor.value = !showEditor.value
    }
    function switchCityPanel () {
      showCityLocation.value = !showCityLocation.value
    }
    function handleClick (tab) {
      state.activeName = tab.props.name
    }
    function changeGeojson (data) {
      if (Object.keys(L).length === 0) {
          L = instance.appContext.config.globalProperties.$L
        }
      if (Object.keys(map).length === 0) {
          map = instance.appContext.config.globalProperties.$map
      }
      if (Object.keys(data).length > 0) {
        L.geoJSON(data).addTo(map)
        const center = turfCenter(data)
        const latlng = center.geometry.coordinates.reverse()
        map.setView(latlng, 10)
      } else {
        if (Object.keys(map).length > 0) {
          map.eachLayer((layer) => {
          if (layer instanceof L.GeoJSON) {
            map.removeLayer(layer)
          }
        })
        }
      }
      geojsonProperties.value = getJsonProperties(data)
      geojsonPropertiesColumns.value = getJsonPropertiesColumn(state.geojsonProperties)
    }
    return {
      collapseMenuPanel,
      switchPanel,
      switchCityPanel,
      handleClick,
      changeGeojson,
      ...state,
      cityList,
      geojsonProperties,
      geojsonPropertiesColumns,
      showEditor,
      showCityLocation
    }
  }
})
</script>

<style scoped lang="less">
.top-tool {
  position: absolute;
  z-index: 2;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  background: #d9e7fd;
  display: flex;
  align-items: center;
  padding: 0 8px;

}
.active {
  color: #428bca;
  background-color: var(--secondary-color);
}
  .tool-panel {
    height: 100%;
    width: calc(100% - 25px);
    // 从右往左
    margin-left: auto;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    font-size: 14px;
    color: #428bca;
    font-weight: 600;
    position:relative;
    .copy-coord-panel,.city-location-panel {
      cursor: pointer;
      margin: 0 4px;
    }
    .editor-panel,.city-locationPanel {
      position: fixed;
      width: 500px;
      height: 90%;
      z-index: 2;
      right: 0px;
      top: calc(7% + 35px);
      background-color: #fff;
      .el-tabs {
        padding: 4px;
        height: 100%;
        width: 100%;
      }
    }
    .city-locationPanel {
      height: 300px;
      width: 20%;
    // 半透明
      background: rgba(255,255,255,0.8);
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
      gap: 10px;
      counter-reset: num;
      div:before {
        border: 1px solid;
        content: counter(num);
        counter-increment: num;
      }
    }
  }
  .collapse-wrap {
  color: #428bca;
  font-size: 20px;
  width: 25px;
}
#pane-geojson {
  width: 100%;
  height: 100%;
}
.json-editor {
  height: 100%;
  width: 100%;
}
::v-deep .el-tabs__header {
          height: 40px;
          margin: 0px;
        }
::v-deep .el-tabs__content {
          height: calc(100% - 48px);
        }
.collapse-wrap:hover {
  cursor: pointer;
}
</style>

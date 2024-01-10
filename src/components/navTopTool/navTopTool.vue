<template>
  <div class="top-tool">
    <div class="collapse-wrap" @click="collapseMenuPanel">
      <font-awesome-icon icon="fa-solid fa-bars" />
      <!-- 靠右 -->
    </div>
    <!-- 从右往左 -->
    <div class="tool-panel">
      <div class="copy-coord-panel">
        <font-awesome-icon icon="fa-solid fa-copy" @click="switchPanel" />
      </div>
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
      <div class="city-location">
        <font-awesome-icon icon="fa-solid fa-marker" @click="switchPanel" />
      </div>
      <div class="city-locationPanel" v-if="showCityLocation">
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue'
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
    let instance = getCurrentInstance()
    let L = null, map = null
    if (instance) {
      L = instance.appContext.config.globalProperties.$L
      map = instance.appContext.config.globalProperties.$map
    }

    let state = reactive({
      activeName: 'geojson',
    })
    let geojsonProperties= ref([])
    let geojsonPropertiesColumns = ref([])
    let showEditor = ref(false)
    let showCityLocation = ref(true)
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
      console.log(showEditor.value)
    }
    function handleClick (tab) {
      console.log(tab)
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
      handleClick,
      changeGeojson,
      ...state,
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
  .tool-panel {
    height: 100%;
    width: calc(100% - 25px);
    // 从右往左
    margin-left: auto;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #428bca;
    font-weight: 600;
    position:relative;
    .copy-coord-panel,.city-location {
      cursor: pointer;
      position: absolute;
      right: 4px;
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

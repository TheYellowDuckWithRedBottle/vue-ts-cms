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
            <ElTable/>
          </el-tab-pane>
      </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { reactive, ref, computed } from 'vue'
import JsonEdit from 'json-editor-vue3'
import turfCenter from '@turf/center'
import { ElTable } from 'element-plus'

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
    let L:any = null, map:any = null
    if (instance) {
      L = instance.appContext.config.globalProperties.$L
      map = instance.appContext.config.globalProperties.$map
    }

    let state = reactive({
      activeName: 'geojson',
      geojsonData: {
        type: 'Feature',
        geometry: {},
        properties: {}
      },
    })
    let showEditor = ref(false)
    // eslint-disable-next-line vue/return-in-computed-property
    let computedProperties = computed(() => {
      if (state.geojsonData) {
        if (state.geojsonData.type === 'Feature') {
          return state.geojsonData.properties
        } else if (state.geojsonData.type === 'FeatureCollection') {
          return state.geojsonData.features.map((feature: any) => {
            return feature.properties
          })
        }
      } else {
        return []
      }
    })
    function collapseMenuPanel() {
      emit('collapse', true)
    }
    function switchPanel () {
      showEditor.value = !showEditor.value
      console.log(showEditor.value)
    }
    function handleClick (tab: any) {
      state.activeName = tab.name
      if (tab.name === '属性表') {
        console.log('属性表')
      }
    }
    function changeGeojson (data: any) {
      console.log(data)
      debugger
      if (Object.keys(data).length > 0) {
        L.geoJSON(data).addTo(map)
        const center = turfCenter(data)
        const latlng = center.geometry.coordinates.reverse()
        map.setView(latlng, 10)
      } else {
        map.eachLayer((layer: any) => {
          if (layer instanceof L.GeoJSON) {
            map.removeLayer(layer)
          }
        })
      }
    }
    return {
      collapseMenuPanel,
      switchPanel,
      handleClick,
      changeGeojson,
      ...state,
      showEditor,
      computedProperties
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
    .copy-coord-panel {
      cursor: pointer;
      position: absolute;
      right: 4px;
    }
    .editor-panel {
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

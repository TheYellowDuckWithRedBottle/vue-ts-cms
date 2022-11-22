<template>
  <div>
    <el-tree
      :data="treeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span class="tree-item-title">{{ node.label }}</span>
          <div class="tree-operate-wrap">
            <el-checkbox
              v-model="node.isCheck"
              size="large"
              @change="openService(data, node)"
            />
          </div>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script>
import Test from './test.vue'
import { defineComponent, ref, getCurrentInstance } from 'vue'
import L from 'leaflet'
import dynamicMapLayer from 'esri-leaflet/src/Layers/DynamicMapLayer'
// interface Tree {
//   alias?: string
//   alpha?: string
//   category?: string
//   group?: string
//   id?: string
//   index?: string
//   name?: string
//   type?: string
//   isCheck?: boolean
//   url?: string
//   visiable?: string
//   xMaxExtent?: number
//   xMinExtent?: number
//   xzdm?: string
//   yMaxExtent?: number
//   yMinExtent?: number
//   year?: string
//   label?: string
//   children?: Tree[]
// }
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    let instance
    const treeData = ref([
      {
        alias: '土地利用现状',
        isCheck: false,
        children: [
          {
            alias: 'Level two 1-1',
            isCheck: false,
            children: [
              {
                alias: '崇川地类图斑',
                isCheck: false,
                alpha: '1',
                category: '土地利用现状',
                group: '015644b88106402896c8564443a4044e',
                id: '01817583a1984028845481751ce80044',
                index: '1',
                name: 'DLTB_320600',
                type: 'dynamic',
                url: 'http://127.0.0.1:8008/oms/arcgisrest/土地利用现状/DLTB_320600/MapServer',
                visiable: 'true',
                xMaxExtent: 40591284.7803,
                xMinExtent: 40569320.9189,
                xzdm: '320000',
                yMaxExtent: 3558237.2593,
                yMinExtent: 3530790.963,
                year: '2020'
              },
              {
                alias: 'Level three 1-1-2',
                isCheck: false
              }
            ]
          }
        ]
      },
      {
        alias: 'Level one 2',
        isCheck: false,
        children: [
          {
            alias: 'Level two 2-1',
            isCheck: false
          },
          {
            alias: 'Level two 2-2',
            isCheck: false
          }
        ]
      }
    ])

    const handleNodeClick = (e) => {
      console.log(e)
    }
    setTimeout(() => {
      instance = getCurrentInstance()
      console.log(instance)
    }, 2000)
    const openService = (data, node) => {
      debugger
      console.log(instance)
      console.log(data.value)
      console.log(node.value)
      let one = dynamicMapLayer({
        url: 'http://localhost:6080/arcgis/rest/services/SampleWorldCities/MapServer',
        opacity: 0.8,
        f: 'json'
      })
    }
    const defaultProps = {
      children: 'children',
      label: 'alias'
    }
    return {
      treeData,
      defaultProps,
      handleNodeClick,
      openService
    }
  }
})
</script>

<style lang="less">
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 100%;
}
.tree-item-title {
  display: block;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tree-operate-wrap {
  width: 7%;
  height: 100%;
}
</style>

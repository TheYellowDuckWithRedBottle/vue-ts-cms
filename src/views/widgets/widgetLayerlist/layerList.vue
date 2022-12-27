<template>
  <div>
    <el-tree
      :data="dataSource"
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

<script lang="ts">
import Test from './test.vue'
import L from 'leaflet'
import { defineComponent, ref, inject } from 'vue'
interface Tree {
  label: string
  service?: string
  children?: Tree[]
}
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    let map = inject('map')
    debugger
    console.log(map)
    const dataSource = ref<Tree[]>([
      {
        label: '服务一',
        children: [
          {
            label: 'Level two 1-1',
            children: [
              {
                label: 'wms服务',
                service: 'http://localhost:8090/geoserver/WMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=WMS:SHP_1636427035338&bbox=4.0615005015008755E7,3532560.982614258,4.061549804877387E7,3532911.3776800316&width=768&height=545&srs=EPSG:4528&styles=&format=application/openlayers'
              },
              {
                label: 'Level three 1-1-2'
              }
            ]
          }
        ]
      },
      {
        label: 'Level one 2',
        children: [
          {
            label: 'Level two 2-1'
          },
          {
            label: 'Level two 2-2'
          }
        ]
      }
    ])

    const handleNodeClick = (e: any) => {
      console.log(e)
    }
    const openService = (data: any, node: any) => {
      console.log(data)
      console.log(node)
      //加载wms服务的图层
      var wmsLayer = L.tileLayer.wms(
          data.service, {
                layers: 'nyc_roads',
            }
        );
        //添加图层到地图
        console.log(wmsLayer)
        wmsLayer.addTo(window.map);
    }
    const defaultProps = {
      children: 'children',
      label: 'label'
    }
    return {
      dataSource,
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

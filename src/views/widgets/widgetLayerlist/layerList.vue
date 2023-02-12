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
import { defineComponent, ref, getCurrentInstance, onMounted, watch } from 'vue'
// interface Tree {
//   label: string
//   service?: string
//   children?: Tree[]
// }
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    let instance = getCurrentInstance()
    let L = {}
    let map = {}
    // watch (L,(newValue, oldValue) => {
    //   console.log(newValue, oldValue)
    // })
    onMounted(() => {
      if(instance !== null) {
      L = instance.appContext.config.globalProperties.$L
      map = instance.appContext.config.globalProperties.$map
      console.log(L,map)
      }
    })

    const treeData =([
      {
        alias: '土地利用现状',
        isCheck: false,
        children: [
          {
            alias: '荥阳地类图斑',
            isCheck: false,
            children: [
              {
                alias: 'wms服务',
                service: 'http://localhost:8090/geoserver/WMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=WMS:SHP_1636427035338&bbox=4.0615005015008755E7,3532560.982614258,4.061549804877387E7,3532911.3776800316&width=768&height=545&srs=EPSG:4528&styles=&format=application/openlayers'
              },
              {
                alias: '荥阳点服务',
                isCheck: false
              }
            ]
          }
        ]
      },
      {
        alias: '基础数据',
        isCheck: false,
        children: [
          {
            alias: '基础地理',
            isCheck: false
          },
          {
            alias: '遥感影像',
            isCheck: false
          }
        ]
      }
    ])

   function handleNodeClick(e) {
      console.log(e)
    }
    const openService = (data, node) => {
      console.log(data)
      console.log(node)
      console.log(L)
      console.log(map)

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

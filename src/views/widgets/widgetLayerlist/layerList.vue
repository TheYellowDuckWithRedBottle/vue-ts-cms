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
                url: 'http://webgis.cn/cgi-bin/mapserv?map=/owg/mfb3.map&',
                service: 'http://webgis.cn/cgi-bin/mapserv?map=/owg/mfb3.map&'
              },
              {
                alias: '荥阳点服务',
                isCheck: false,
                url: 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer'
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
    function openService (data, node)  {
      debugger
      if(instance !== null) {
        if(Object.keys(L).length == 0) {
          L = instance.appContext.config.globalProperties.$L
        }
        if(Object.keys(map.length == 0)) {
          map = instance.appContext.config.globalProperties.$map
        }
      }
      if(node.isCheck) {
        var wmsLayer = L.tileLayer.wms(
          data.url, {
                layers: data.alias,
                format: 'imgage/png',
                transparent: true
            }
        );
        //添加图层到地图
        wmsLayer.addTo(map);
        wmsLayer.bringToFront();
      } else {
        map.eachLayer(function(layer) {
          console.log(layer)
          if(layer.options && layer.options.layers === data.alias) {
            map.removeLayer(layer)
          }
        })
      }

      if(!data.service) return

      //加载wms服务的图层

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

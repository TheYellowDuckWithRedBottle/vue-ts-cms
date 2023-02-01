<template>
  <div class="config-service-panel">
    <div class="add-service">
      <el-button type="success" size="small" @click="addService">添加</el-button>
    </div>
    <div v-if="showAddServiceDialog">
      <el-dialog
        v-model="showAddServiceDialog"
        title="添加地图服务"
        width="60%"
        :center="true"
      >
        <div class="map-service-dialog">
          <div class="map-service-category">
            <el-tree
            :props="defaultProps"
            :data="serviceCategory">
      <template #default="{ node }">
        <span class="custom-tree-node">
          <span class="tree-item-title">{{ node.label }}</span>
          <div class="tree-operate-wrap">
          </div>
        </span>
      </template>
    </el-tree>


          </div>
          <div class="map-service-list"></div>
        </div>
      </el-dialog>
    </div>
    <div class="service-list">
     <el-table :data="tableData" border>
        <el-table-column fixed prop="order" label="序号" width="50" />
        <el-table-column prop="serviceName" label="服务名称" width="120" />
        <el-table-column prop="serviceAlias" label="服务别名" width="200" />
        <el-table-column prop="serviceType" label="服务类型" width="150" />
        <el-table-column prop="year" label="年份" width="60" />
        <el-table-column prop="serviceUrl" label="服务地址" width="500" />
        <el-table-column prop="zip" label="默认可见" width="50" />
        <el-table-column prop="opacity" label="透明度" width="50" />
        <el-table-column prop="modifyInfo" label="修改信息" width="100" />
        <el-table-column prop="delete" label="删除" width="50" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup() {
    let state = reactive({
      tableData:[{
        order: '1',
        serviceName: 'DLTB_232',
        serviceAlias: '地类图斑数据',
        serviceType: 'arcgis动态服务',
        year: '2021',
        serviceUrl: '',
        opacity: '',
        modifyInfo:'',
        delete: ''
      }],
      showAddServiceDialog: false,
      serviceCategory: [
        {categoryName:'基础数据',children:[{categoryName:'基础地理'},{categoryName:'遥感影像'}]},
        {categoryName:'专业数据'},
        {categoryName:'管理数据'},
      ],
      defaultProps: {
      children: 'children',
      label: 'categoryName'
    }
    })
    function addService () {
      state.showAddServiceDialog = true
    }
    return {...toRefs(state), addService}
  }
})
</script>

<style scoped lang="less">
.config-service-panel {
  width: 100%;
  height: 100%;
}
.add-service {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
}
.service-list {
  width: 100%;
  height: 90%;
}
.map-service-dialog{
  width: 100%;
  height: 100%;
  display: flex;
  .map-service-category{
    width:30%;
    height: 70%;
  }
  .map-service-list {
    width: 70%;
    height: 500px;
  }
}

</style>

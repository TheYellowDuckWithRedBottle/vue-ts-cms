<template>
  <div class="config-service-panel">
    <div class="add-service">
      <el-button type="success" size="small">添加</el-button>
    </div>
    <div class="service-list">
      <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column fixed prop="order" label="序号" width="50" />
        <el-table-column prop="serviceName" label="服务名称" width="120" />
        <el-table-column prop="serviceAlias" label="服务别名" width="150" />
        <el-table-column prop="serviceType" label="服务类型" width="150" />
        <el-table-column prop="year" label="年份" width="60" />
        <el-table-column prop="serviceUrl" label="服务地址" width="300" />
        <el-table-column prop="zip" label="默认可见" width="50" />
        <el-table-column prop="opacity" label="透明度" width="50" />
        <el-table-column prop="modifyInfo" label="修改信息" width="50" />
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
        serviceName: 'Tom',
        serviceAlias: 'No. 189, Grove St, Los Angeles',
        serviceType: 'arcgis',
        year: '2021',
        serviceUrl: '',
        opacity: '',
        modifyInfo:'',
        delete: ''
      }]
    })
    return {...toRefs(state)}
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
</style>

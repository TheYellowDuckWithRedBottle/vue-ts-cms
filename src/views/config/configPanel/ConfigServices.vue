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
    <!-- 服务列表 -->
    <div class="service-list">
     <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="order" label="序号" width="50" />
        <el-table-column prop="serviceName" label="服务名称" width="120" />
        <el-table-column prop="serviceAlias" label="服务别名" width="200" />
        <el-table-column prop="serviceType" label="服务类型" width="150" />
        <el-table-column prop="year" label="年份" width="60" />
        <el-table-column prop="serviceUrl" label="服务地址" />
        <el-table-column prop="visiable" label="默认可见" width="80" >
          <template #default="scope">
            <el-switch v-model="scope.row.visiable"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="opacity" label="透明度" width="150">
          <template #default="scope">
            <el-slider v-model="scope.row.opacity" :min="0" :max="100"></el-slider>
          </template>
        </el-table-column>
        <el-table-column prop="delete" label="删除" width="150" >
          <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
        </el-table-column>
      </el-table>
      <Dialog :dialogVisible="showDeleteServiceDialog" :dialogWidth="300" :dialogHeight="150" @closeDialog="closDeleteServiceDialog"
      @confirm="confirmDelete">
        <template v-slot:title>
          <span>信息</span>
        </template>
        <template v-slot:close>
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </template>
        <template v-slot:body>
            <span>确定删除该服务？</span>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Dialog from '@/views/common/Dialog.vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default defineComponent({
  components: {
    Dialog
  },
  setup() {
    let state = reactive({
      tableData:[{
        order: '1',
        serviceName: 'DLTB_232',
        serviceAlias: '地类图斑数据',
        serviceType: 'arcgis动态服务',
        year: '2021',
        serviceUrl: '',
        visiable: true,
        opacity: '',
        delete: ''
      }],
      showAddServiceDialog: false,
      showDeleteServiceDialog: false,
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
    // 删除服务
    function handleDelete (index: Int8Array, data:any) {
      state.showDeleteServiceDialog = true
    }
    function confirmDelete (serviceId: string) {
      state.showDeleteServiceDialog = false
      const url = 'http://localhost:8080'
      let data = {
        serviceId: serviceId
      }
      axios.post(url, data).then(res => {
        state.showDeleteServiceDialog = false
        console.log(res)
      }).catch(err => {
        state.showDeleteServiceDialog = false
      })
    }
    function closDeleteServiceDialog () {
      state.showDeleteServiceDialog = false
    }
    // 添加服务
    function addService () {
      state.showAddServiceDialog = true
    }


    return {...toRefs(state), addService, handleDelete, closDeleteServiceDialog, confirmDelete}
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
th {
  background-color: aliceblue;
}
</style>

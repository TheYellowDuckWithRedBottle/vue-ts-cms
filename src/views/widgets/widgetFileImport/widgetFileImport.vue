<template>
  <div class="file-import-container">
      <div class="operate-buttons">
        <el-button size="small" type="primary" class="file-button" @click="uploadFile">导入</el-button>
        <input type="file" style="display: none;" ref="uploadInput" @change="handlePreview">
        <el-button type="success" @click="exportFile" size="small" class="file-button">导出</el-button>
        <el-button type="warning" @click="clearBlocks" size="small" class="file-button">清空</el-button>
      </div>
      <div class="operate-divider"></div>
      <div class="block-list-container">
        <div v-for="(item, index) in featureList" :key="index"
          class="geometry-item"
          @click="loacateBlock(item.geoJson)">
          <span class="item-title">{{ item.title }}</span>
          <div class="item-icons">
            <font-awesome-icon icon="fa-solid fa-circle-info" class="icon" @click.stop="viewAttribtues(item)"/>
            <font-awesome-icon icon="fa-solid fa-file-export" class="icon" @click="exportFile(item)"/>
          </div>
        </div>
      </div>
      <!-- 地块信息 -->
      <div class="import-info-container">
        <span>地块面积：{{ statisticInfo.area }} 平方米</span>
        <span>地块个数：{{ statisticInfo.amount }} 个</span>
      </div>
      <!-- 弹出的属性表信息 -->
      <div class="attribute-table" v-show="false" ref="attributeTable">
        <el-table
          :data="tableData"
          border
          size="mini"
          style="width: 100%;height: 300px; overflow:auto;">
          <el-table-column prop="field" label="属性名" width="120" />
          <el-table-column prop="value" label="属性值" width="200" />
        </el-table>
      </div>
  </div>
  <ExoportData :dialogVisible="dialogVisible" :exportData="exportData" @closeDialog="closeExportCom"/>
</template>

<script>
import ExoportData from '@/views/common/ExportData.vue'
import { defineComponent, ref, toRefs, reactive, getCurrentInstance } from 'vue'
export default defineComponent({
  components: {
    ExoportData
  },
  setup() {
    let instance = getCurrentInstance()
    let L = instance.appContext.config.globalProperties.$L
    let map = instance.appContext.config.globalProperties.$map
    const exportFormat = ref('')
    const style = ref({
      color: '#ff0000',
      weight: 3,
      opacity: 1,
      fillOpacity: 0.5
    })
    let state = reactive({
    })

})
</script>

<style lang="less" scoped>
.file-import-container {
  width: 100%;
  height: 100%;
  .operate-buttons {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
    box-sizing: border-box;

    .file-button {
      margin-left: 8px;
    }
  }
  .operate-divider {
    width: 90%;
    height: 1px;
    padding:0 2px;
    background: var(--color-primary);
  }
  .block-list-container {
    width: 100%;
    height: calc(100% - 151px);
    overflow: auto;
    .geometry-item {
      width: 90%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 8px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--color-primary);
      .item-title {
        font-size: 12px;
        color: var(--color-primary);
      }
      .item-icons {
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: 20px;
          height: 20px;
          margin-left: 5px;
          cursor: pointer;
          &.icon-location {
            color: var(--color-primary);
          }
          &.icon-export {
            color: var(--color-success);
          }
          &.icon-delete {
            color: var(--color-danger);
          }
        }
      }
    }
    .geometry-item:hover {
        background: var(--color-primary);
        cursor: pointer;
        .item-title {
          color: var(--color-white);
        }
      }
  }
  .import-info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    height: 100px;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    span {
      display: inline-block;
    }
  }
  .attribute-table {
    display: flex;
    position: absolute;
    // top: 100px;
  }
}
</style>

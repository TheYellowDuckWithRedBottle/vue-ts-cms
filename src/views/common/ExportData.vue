<template>
  <div class="export-data-container" v-if="dialogVisible">
    <div class="export-header">
      <div class="export-title">导出数据</div>
      <div class="export-close">
        <el-button type="text" icon="el-icon-close" size="small" @click="closeDialog"></el-button>
      </div>
    </div>
    <div class="export-body">
      <div class="format-wrapper">
        <span class="select-label">选择格式：</span>
       <el-select v-model="exportFormat" @change="changeFormat"  placeholder="导出格式" size="small" class="select-container">
        <el-option
            v-for="(item, index) in exportFormats"
            :key="index"
            :label="item"
            :value="item"/>
            {{ item }}
        </el-select>
      </div>
      <div class="export-button">
        <el-button type="primary" @click = "exportConfirm" size="small">确定导出</el-button>
      </div>
    </div>
    <div class="export-footer"></div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from 'vue'
import axios from 'axios'
export default defineComponent({
  props: {
    exportData: Object,
    dialogVisible: Boolean,
  },
  setup(props, {emit}) {
    const { dialogVisible } = toRefs(props)
    let state = reactive({
      exportFormat: '',
      exportFormats: [
        'txt',
        'shp',
        'geojson',
        'dwg'
      ]
    })
    function closeDialog() {
      emit('closeDialog')
    }
    function exportConfirm () {
      console.log('exportConfirm')
      console.log(state.exportFormat)
      console.log(props.exportData)
    }
    function changeFormat (item: string) {
      console.log(item)
    }
    return {
      closeDialog,
      changeFormat,
      exportConfirm,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="less">
.export-data-container{
  position: fixed;
  width: 300px;
  height: 200px;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  .export-header {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .export-title {
      font-size: 16px;
      font-weight: bold;
    }
    .export-close {
      font-size: 12px;
      display: flex;
      align-items: center;
    }

  }
  .export-body {
    display: flex;
    flex-direction: column;
    justify-content:  space-around;
    height: 70%;
    margin: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    .format-wrapper {
  display: flex;
  align-items: center;
  .select-label {
    display: inline-block;
    width: 40%;
  }
  .select-container {

  }
}
  }
}
.export-button {
  display: flex;
  justify-content: center;
  right: 8px;
  margin-top: 8px;
}
</style>

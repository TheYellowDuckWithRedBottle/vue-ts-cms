<template>
  <div class="measure-container">
    <div class="operate-buttons">
        <el-button type="primary" @click="measuerLength" size="small">长度</el-button>
        <el-button type="primary" @click="measureArea" size="small">面积</el-button>
      </div>
      <div class="operate-divider"></div>
      <div class="block-list-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    function measuerLength () {
      console.log('测量长度')
    }
    function measureArea () {
      console.log('测量面积')
    }
    return {measuerLength, measureArea}
  }
})
</script>

<style lang="less">
.measure-container{
  width: 100%;
  height: 100%;
}
.operate-buttons {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
    box-sizing: border-box;
  }
  .operate-divider {
    width: 90%;
    height: 1px;
    padding:0 2px;
    background: var(--color-primary);
  }
  .block-list-container {
    width: 100%;
    height: calc(100% - 51px);
  }
</style>

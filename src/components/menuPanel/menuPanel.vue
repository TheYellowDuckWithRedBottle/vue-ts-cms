<template>
  <div class="operate-panel">
    <div class="panel-header">
      <div class="title-header">
        <slot name="panel-title"></slot>
      </div>
      <div class="collapse-wrap">
        <i></i>
      </div>
    </div>
    <div class="divider-wrapper">
      <div class="divider"></div>
    </div>
    <div class="panel-body"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scope>
.operate-panel {
  border-right: 1px solid #dcdcdc;
  height: 100%;
  width: 400px;
}
.panel-header {
  width: 100%;
  height: 40px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 8px;
}
.divider-wrapper {
  width: 100%;
  height: 1px;
  display: flex;
  justify-content: center;
}
.divider {
  width: 96%;
  height: 100%;
  background-color: rgb(119, 162, 233);
}
</style>

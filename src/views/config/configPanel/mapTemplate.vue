<template>
  <div class="template-item">
    <div class="item-panel">
      <div class="map-cover"></div>
      <div class="divider"></div>
      <div class="map-desc">
        <div class="map-name"></div>
        <div class="map-template-name"></div>
        <div class="map-template-desc"></div>
      </div>
      <div class="map-operation"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped>
.template-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: center;
}
.item-panel {
  display: flex;
  width: 20%;
  height: 30%;
  border: 1px solid grey;
}
.map-cover {
  width: 100%;
  height: 50%;
  background: white;
}
.divider {
  height: 1px;
  width: 100%;
  background: rgb();
}
.map-desc {
  width: 100%;
  height: calc(35% - 1px);
}
.map-operation {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
}
</style>

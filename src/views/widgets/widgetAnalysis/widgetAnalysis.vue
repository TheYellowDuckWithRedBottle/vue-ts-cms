<template>
  <div class="analysis-panel">
    <SDXZ></SDXZ>
    <Tdlyxz></Tdlyxz>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SDXZ from './analysisSDXZ.vue'
import Tdlyxz from './analysisTdlyxz.vue'
export default defineComponent({
  components:{
    SDXZ,
    Tdlyxz
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less">
.analysis-panel{
  width: 100%;
  height: 100%;
}
</style>

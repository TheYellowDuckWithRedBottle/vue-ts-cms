<template>
  <div class="SDXZ">
    <commonAnalysisHeader :showDrawButton="true"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import commonAnalysisHeader from '@/views/common/CommonAnalysisHeader.vue'
export default defineComponent({
  components: {
    commonAnalysisHeader
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less">
.SDXZ {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>

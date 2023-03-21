<template>
  <div class="SDXZ">
    <commonAnalysisHeader :showDrawButton="true" :showAnalysisBtn="true" ref="commonAnalysis">
    </commonAnalysisHeader>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import commonAnalysisHeader from '@/views/common/CommonAnalysisHeader.vue'
export default defineComponent({
  components: {
    commonAnalysisHeader
  },
  setup() {
    const commonAnalysis = ref(null)
    let state = reactive({
      analysisBtnAble: true
    })
    onMounted(() => {
      debugger
      const commAnlaysisHeader = commonAnalysis.value
      if(commAnlaysisHeader && commAnlaysisHeader.featureList && commAnlaysisHeader.featureList.length > 0) {
        state.analysisBtnAble = false
      }
    })
    function analysis() {
      console.log(commonAnalysis.value)
      console.log('analysis')
    }
    return {
      commonAnalysis,
      ...toRefs(state),
      analysis
    }
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
